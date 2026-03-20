const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Submission = require("../models/Submission");
const shuffle = require("../utils/shuffle");
const PDFDocument = require("pdfkit");


const User = require("../models/User");

/* GET QUESTIONS */

const getQuestions = async (req, res) => {

  try {

    const quiz = await Quiz.findOne({ status: "active" });

    if (!quiz) {
      return res.status(400).json({ message: "Quiz not started" });
    }

   let questions = await Question.find({ quizId: quiz._id }).lean(); 

    questions = shuffle(questions);

    res.json({
      quizId: quiz._id,
      duration: quiz.duration,
      questions
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



/* AUTO SAVE ANSWER */

const saveAnswer = async (req, res) => {

  try {

    const { quizId, questionId, selectedOptionId } = req.body;

   let submission = await Submission.findOne({
  userId: req.user.id,
  quizId
});

    if(submission && submission.submittedAt){
  return res.json({ message: "Already submitted" });
}

    if (!submission) {

      submission = new Submission({
        userId: req.user.id,
        quizId,
        answers: [],
        startedAt: new Date()
      });

    }

    const existing = submission.answers.find(
      a => a.questionId === questionId
    );

    if (existing) {

      existing.selectedOptionId = selectedOptionId;

    } else {

      submission.answers.push({
        questionId,
        selectedOptionId
      });

    }

    await submission.save();

    

    res.json({ message: "Answer saved" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



/* SUBMIT QUIZ */

const submitQuiz = async (req, res) => {

  try {

   let quizId = req.body.quizId;

if (!quizId && typeof req.body === "string") {
  try {
    quizId = JSON.parse(req.body).quizId;
  } catch (e) {}
}

    const submission = await Submission.findOne({
      userId: req.user.id,
      quizId
    });

    if(submission && submission.submittedAt){
  return res.json({
    message: "Already submitted",
    score: submission.score
  });
}

    if (!submission) {
      return res.status(400).json({ message: "No answers submitted" });
    }

    const questions = await Question.find({ quizId }).select("correctOptionId").lean();

   const answerMap = Object.create(null);

submission.answers.forEach(a => {
  answerMap[a.questionId] = a.selectedOptionId;
});

let score = 0;

questions.forEach(q => {
  if (answerMap[q._id.toString()] === q.correctOptionId) {
    score++;
  }
});

    submission.score = score;

// ✅ FIX: set actual submission time
submission.submittedAt = new Date();

await submission.save();

    // ✅ UPDATE USER ATTEMPT STATE
await User.findByIdAndUpdate(req.user.id,{
  hasAttempted:true,
  submittedAt:new Date()
});
    
    res.json({
      message: "Quiz submitted successfully",
      score
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



/* CHECK IF USER ALREADY ATTEMPTED */

const checkAttempt = async (req, res) => {

  try {

    const quiz = await Quiz.findOne({ status: "active" });

    if (!quiz) {
      return res.json({ attempted: false });
    }

    const submission = await Submission.findOne({
      userId: req.user.id,
      quizId: quiz._id
    });

    // FIX: if submission exists → user already attempted
    if (submission) {
      return res.json({ attempted: true, quizId: quiz._id });
    }

    res.json({ attempted: false, quizId: quiz._id });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



/* RESULT */

const getResult = async (req, res) => {

  try {

    const { quizId } = req.params;

    const submission = await Submission.findOne({
      userId: req.user.id,
      quizId
    });

    if (!submission) {
      return res.status(404).json({ message: "Result not found" });
    }

    const questions = await Question.find({ quizId }).lean();

    let correct = 0;
    let incorrect = 0;

    questions.forEach((question) => {

      const answer = submission.answers.find(
        a => a.questionId === question._id.toString()
      );

      if (!answer) return;

      if (answer.selectedOptionId === question.correctOptionId) {
        correct++;
      } else {
        incorrect++;
      }

    });

    const attempted = correct + incorrect;
    const unattempted = questions.length - attempted;

    res.json({
      score: submission.score,
      totalQuestions: questions.length,
      attempted,
      unattempted,
      correct,
      incorrect
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



/* LEADERBOARD */

const getLeaderboard = async (req, res) => {

  try {

    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if(!quiz){
  return res.status(404).json({ message: "Quiz not found" });
}

// ✅ auto reset if quiz not active
if(quiz && quiz.status !== "active"){
  return res.json({
    leaderboard: [],
    yourRank: null,
    totalUsers: 0
  });
}

  const [users, submissions] = await Promise.all([
  User.find().select("name rollNumber").lean(),
  Submission.find({ quizId }).lean()
]);

// 3. map submissions
const submissionMap = {};
submissions.forEach(sub => {
  if(sub.userId){
  submissionMap[sub.userId.toString()] = sub;
}
});

// 4. merge users + submissions
const leaderboard = users.map(user => {

  const sub = submissionMap[user._id.toString()];

  let score = 0;
  let timeTaken = 99999999;

  if(sub){
    score = sub.score;

    if(sub.startedAt && sub.submittedAt){
      timeTaken = Math.floor(
        (sub.submittedAt - sub.startedAt) / 1000
      );
    }
  }

  return {
    userId: user,
    score,
    timeTaken
  };

});

// 5. sort
leaderboard.sort((a,b)=>{
  if(b.score !== a.score){
    return b.score - a.score;
  }
  return a.timeTaken - b.timeTaken;
});

// 6. add rank
const finalLeaderboard = leaderboard.map((item,index)=>({
  ...item,
  rank: index + 1
}));

   // ✅ find current user rank
const userIndex = finalLeaderboard.findIndex(
  item => item.userId._id.toString() === req.user.id
);

const yourRank = userIndex !== -1 ? userIndex + 1 : null;

return res.json({
  leaderboard : finalLeaderboard,
  yourRank,
  totalUsers: finalLeaderboard.length
});

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


/* DOWNLOAD RESPONSE SHEET (PDF WITH OPTION TEXT) */

const downloadResponseSheet = async (req,res)=>{

  try{

    const {quizId} = req.params;

    const submission = await Submission.findOne({
      userId:req.user.id,
      quizId
    }).populate("userId","name rollNumber");

    if(!submission){
      return res.status(404).json({message:"Submission not found"});
    }

    const questions = await Question.find({quizId}).lean();

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=response-sheet.pdf"
    );

    res.setHeader("Content-Type","application/pdf");

    doc.pipe(res);

    /* TITLE */

    doc.fontSize(20).text("QUIZ RESPONSE SHEET",{align:"center"});
    doc.moveDown();

    doc.fontSize(12).text(`Name: ${submission.userId.name}`);
    doc.text(`Roll Number: ${submission.userId.rollNumber}`);
    doc.moveDown();

    doc.text("----------------------------------------");
    doc.moveDown();

    questions.forEach((question,index)=>{

      const answer = submission.answers.find(
        a => a.questionId === question._id.toString()
      );

      let selectedText = "Not Attempted";
      let correctText = "";
      let status = "Not Attempted";

      /* find correct option text */

      const correctOption = question.options.find(
        opt => opt.id === question.correctOptionId
      );

      if(correctOption){
        correctText = correctOption.text;
      }

      /* find selected option text */

      if(answer){

        const selectedOption = question.options.find(
          opt => opt.id === answer.selectedOptionId
        );

        if(selectedOption){
          selectedText = selectedOption.text;
        }

        if(answer.selectedOptionId === question.correctOptionId){
          status = "Correct";
        }else{
          status = "Incorrect";
        }

      }

      doc.fontSize(12).text(`Q${index+1}: ${question.question}`);
      doc.moveDown(0.5);

      doc.text(`Correct Option: ${correctText}`);
      doc.text(`Selected Option: ${selectedText}`);
      doc.text(`Status: ${status}`);

      doc.moveDown();
      doc.text("----------------------------------------");
      doc.moveDown();

    });

    doc.end();

  }catch(error){

    res.status(500).json({message:error.message});

  }

};


module.exports = {
  getQuestions,
  saveAnswer,
  submitQuiz,
  getResult,
  getLeaderboard,
  checkAttempt,
  downloadResponseSheet
};