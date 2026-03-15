import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Timer from "../components/Timer";

export default function Exam(){

  const [questions,setQuestions] = useState([]);
  const [index,setIndex] = useState(0);
  const [quizId,setQuizId] = useState("");
  const [duration,setDuration] = useState(600);
  const [selected,setSelected] = useState({});

  const navigate = useNavigate();

  /* LOAD QUESTIONS */

  useEffect(()=>{

    const loadQuestions = async()=>{

      const res = await api.get("/quiz/questions");

      setQuestions(res.data.questions);
      setQuizId(res.data.quizId);
      setDuration(res.data.duration * 60);

    };

    loadQuestions();

  },[]);


  /* HANDLE BACK BUTTON DURING EXAM */

  useEffect(()=>{

    window.history.pushState(null,null,window.location.href);

    const handleBack = async () => {

      if(quizId){

        await api.post("/quiz/submit",{quizId});

        navigate("/home");

      }

    };

    window.addEventListener("popstate",handleBack);

    return ()=>window.removeEventListener("popstate",handleBack);

  },[quizId]);


  /* TAB SWITCH DETECTION */

  useEffect(()=>{

    const handler = async()=>{

      if(document.hidden){

        await api.post("/quiz/submit",{quizId});

        navigate("/home");

      }

    };

    document.addEventListener("visibilitychange",handler);

    return ()=>document.removeEventListener("visibilitychange",handler);

  },[quizId]);


  /* SAVE ANSWER */

  const selectOption = async(optionId)=>{

    const question = questions[index];

    setSelected({
      ...selected,
      [question._id]:optionId
    });

    await api.post("/quiz/save-answer",{

      quizId,
      questionId:question._id,
      selectedOptionId:optionId

    });

  };


  /* NAVIGATION */

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


  /* SUBMIT QUIZ */

  const submitQuiz = async()=>{

    await api.post("/quiz/submit",{quizId});

    navigate(`/result/${quizId}`);

  };


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
            onClick={submitQuiz}
            className="bg-red-500 text-white w-full p-2 rounded"
          >
            Submit
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

    </div>

  );

}