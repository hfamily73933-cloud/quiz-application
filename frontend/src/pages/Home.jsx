import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProfileCard from "../components/ProfileCard";

export default function Home(){

  const [profile,setProfile] = useState(null);
  const [quizId,setQuizId] = useState(null);
  const [attempted,setAttempted] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{

    const loadData = async()=>{

      try{

        /* NEW DASHBOARD API (REPLACES 2 CALLS) */

        const dash = await api.get("/dashboard");

        const roll = dash.data.profile.rollNumber;

        setProfile(dash.data.profile);

        const submitted = localStorage.getItem(`quizSubmitted_${roll}`);

        if(submitted === "true"){
          setAttempted(true);
        }else{
          setAttempted(dash.data.attempted);
        }

        setQuizId(dash.data.quizId);

        /* PRELOAD QUIZ QUESTIONS */

        if(!dash.data.attempted){

          const quizRes = await api.get("/quiz/questions");

          sessionStorage.setItem(
            "quizData",
            JSON.stringify(quizRes.data)
          );

        }

      }catch(err){
        console.log(err);
      }

    };

    loadData();

  },[]);


  if(!profile){
    return <p className="text-center mt-10">Loading...</p>
  }

  return(

    <div className="max-w-md mx-auto p-4">

      <ProfileCard profile={profile}/>

      <button
        disabled={attempted}
        onClick={()=>navigate("/exam")}
        className={`mt-4 w-full p-3 rounded ${
          attempted
          ? "bg-gray-400 text-white"
          : "bg-green-500 text-white"
        }`}
      >
        {attempted ? "Quiz Already Submitted" : "Start Quiz"}
      </button>

      <div className="grid grid-cols-2 gap-3 mt-4">

        <button
          onClick={()=>navigate(`/result/${quizId}`)}
          className="bg-blue-500 text-white p-3 rounded"
        >
          View Result
        </button>

        <button
          onClick={()=>navigate(`/leaderboard/${quizId}`)}
          className="bg-purple-500 text-white p-3 rounded"
        >
          Leaderboard
        </button>

      </div>

    </div>

  );

}