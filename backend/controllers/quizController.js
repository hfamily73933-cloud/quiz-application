const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Submission = require("../models/Submission");
const shuffle = require("../utils/shuffle");
const PDFDocument = require("pdfkit");


/* GET QUESTIONS */

const getQuestions = async (req, res) => {

  try {

    const quiz = await Quiz.findOne({ status: "active" });

    if (!quiz) {
      return res.status(400).json({ message: "Quiz not started" });
    }

    let questions = await Question.find({ quizId: quiz._id });

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

    if (!submission) {

      submission = new Submission({
        userId: req.user.id,
        quizId,
        answers: []
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

    const { quizId } = req.body;

    const submission = await Submission.findOne({
      userId: req.user.id,
      quizId
    });

    if (!submission) {
      return res.status(400).json({ message: "No answers submitted" });
    }

    const questions = await Question.find({ quizId });

    let score = 0;

    questions.forEach((question) => {

      const answer = submission.answers.find(
        a => a.questionId === question._id.toString()
      );

      if (!answer) return;

      if (answer.selectedOptionId === question.correctOptionId) {
        score += 4;
      }

    });

    submission.score = score;

    await submission.save();

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

    const questions = await Question.find({ quizId });

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

    const leaderboard = await Submission.find({ quizId })
      .populate("userId", "name rollNumber")
      .sort({ score: -1 })
      .limit(10);

    res.json(leaderboard);

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

    const questions = await Question.find({quizId});

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