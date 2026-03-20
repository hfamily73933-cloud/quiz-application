import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Timer from "../components/Timer";

export default function Exam(){
  

  const [questions,setQuestions] = useState([]);
  const [index,setIndex] = useState(0);
  const [quizId,setQuizId] = useState("");
  const [duration,setDuration] = useState(600);
  const [selected,setSelected] = useState({});
  const [roll,setRoll] = useState("");
  const [submitting,setSubmitting] = useState(false);
  const [showConfirm,setShowConfirm] = useState(false);

  const saveTimeout = useRef(null);

  const navigate = useNavigate();


  /* GET USER PROFILE */

  useEffect(()=>{

    const loadProfile = async()=>{

      const res = await api.get("/auth/profile");

      const rollNumber = res.data.rollNumber;

      setRoll(rollNumber);

      

    };

    loadProfile();

  },[]);



  /* LOAD QUESTIONS */

  useEffect(()=>{

    const cached = sessionStorage.getItem("quizData");

    if(cached){

      const data = JSON.parse(cached);

      setQuestions(data.questions);
      setQuizId(data.quizId);
      setDuration(data.duration * 60);

    }else{

      const loadQuestions = async()=>{

        const res = await api.get("/quiz/questions");

        setQuestions(res.data.questions);
        setQuizId(res.data.quizId);
        setDuration(res.data.duration * 60);

      };

      loadQuestions();

    }

  },[]);



  /* HANDLE BACK BUTTON */

  useEffect(()=>{

    window.history.pushState(null,null,window.location.href);

    const handleBack = async()=>{

      if(quizId){

        

        await api.post("/quiz/submit",{quizId});

        navigate("/home");

      }

    };

    window.addEventListener("popstate",handleBack);

    return ()=>window.removeEventListener("popstate",handleBack);

  },[quizId,roll]);



  /* TAB SWITCH DETECTION */

  useEffect(()=>{

    const handler = async()=>{
  if(document.hidden && quizId){

    try{
      await api.post("/quiz/submit",{quizId});
    }catch(err){
      // ✅ ignore (already submitted OR no answers)
    }

    navigate("/home");
  }
};

    document.addEventListener("visibilitychange",handler);

    return ()=>document.removeEventListener("visibilitychange",handler);

  },[quizId,roll]);



  /* SAVE ANSWER */
  
  const selectOption = (optionId)=>{
    if (!quizId) return;

    const question = questions[index];

    setSelected(prev => ({
  ...prev,
  [question._id]:optionId
}));

    if(saveTimeout.current) clearTimeout(saveTimeout.current);

saveTimeout.current = setTimeout(async()=>{
  try{
    await api.post("/quiz/save-answer",{
      quizId,
      questionId:question._id,
      selectedOptionId:optionId
    });
  }catch(err){
    console.log("Save failed");
  }
}, 400);

  };



  const nextQuestion = ()=>{
    if(index < questions.length-1){
      setIndex(index+1);
    }
  };

  const prevQuestion = ()=>{
    if(index > 0){
      setIndex(index-1);
    }
  };



  /* FINAL SUBMIT */

  const submitQuiz = async()=>{
  if(submitting) return; // ✅ check first

  setSubmitting(true);

  try{
    await api.post("/quiz/submit",{quizId});
    navigate(`/result/${quizId}`);
  }catch(err){
    console.log("Submit failed");
  }
};

/* CLEANUP TIMER */
useEffect(() => {
  return () => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
  };
}, []);


// ✅ ADD THIS EXACTLY HERE (NEW BLOCK)
useEffect(() => {
  const handleUnload = () => {
    if (!quizId) return;

    navigator.sendBeacon(
      `${import.meta.env.VITE_API_URL}/quiz/submit`,
      JSON.stringify({ quizId })
    );
  };

  window.addEventListener("beforeunload", handleUnload);

  return () => {
    window.removeEventListener("beforeunload", handleUnload);
  };
}, [quizId]);

  if(questions.length===0){
    return <p className="text-center mt-10">Loading Questions...</p>
  }

  const question = questions[index];


  return(

    <div className="max-w-md mx-auto p-4">

      <Timer duration={duration} onTimeUp={submitQuiz}/>

      <div className="bg-white shadow p-4 rounded">

        <h2 className="font-semibold mb-4">
          {index+1}. {question.question}
        </h2>

        {question.options.map(opt => {

          const isSelected = selected[question._id] === opt.id;

          return(

            <button
              key={opt.id}
              onClick={()=>selectOption(opt.id)}
              className={`block w-full p-2 rounded mb-2 ${
                isSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
              }`}
            >
              {opt.text}
            </button>

          );

        })}

      </div>


      <div className="flex gap-3 mt-4">

        <button
          disabled={index===0}
          onClick={prevQuestion}
          className={`w-full p-2 rounded ${
            index===0
            ? "bg-gray-400 text-white"
            : "bg-yellow-500 text-white"
          }`}
        >
          Prev
        </button>

        {index === questions.length-1 ? (

          <button
            disabled={submitting}
            onClick={()=>setShowConfirm(true)}
            className="bg-red-500 text-white w-full p-2 rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

        ) : (

          <button
            onClick={nextQuestion}
            className="bg-green-500 text-white w-full p-2 rounded"
          >
            Next
          </button>

        )}

      </div>


      {/* CONFIRMATION MODAL */}

      {showConfirm && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              Submit Quiz?
            </h3>

            <p className="text-sm mb-6">
              Are you sure you want to submit your answers?
            </p>

            <div className="flex gap-3">

              <button
                onClick={()=>setShowConfirm(false)}
                className="bg-gray-400 text-white w-full p-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitQuiz}
                className="bg-red-500 text-white w-full p-2 rounded"
              >
                Yes Submit
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}