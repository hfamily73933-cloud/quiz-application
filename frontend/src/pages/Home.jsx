import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";

export default function Home(){

  const [profile,setProfile] = useState(null);
  const [quizId,setQuizId] = useState(null);
  const [attempted,setAttempted] = useState(false);

  const navigate = useNavigate();

  // ⭐ Generate stars only once
  const [stars] = useState(() =>
    Array.from({ length: 40 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.4 + Math.random() * 0.4,
      color: ["white", "#facc15", "#f472b6", "#f87171"][
        Math.floor(Math.random() * 4)
      ]
    }))
  );

  useEffect(()=>{

    const loadData = async()=>{

      try{

        const dash = await api.get("/dashboard");

        setProfile(dash.data.profile);
        setAttempted(dash.data.attempted);
        setQuizId(dash.data.quizId);

        if(!dash.data.attempted){
          const quizRes = await api.get("/quiz/questions");
          sessionStorage.setItem("quizData", JSON.stringify(quizRes.data));
        }

      }catch(err){
        console.log(err);
      }

    };

    loadData();

  },[]);

  const logout = async()=>{

    try{
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/");
    }catch(err){
      console.log(err);
    }

  };

  if(!profile){
  return <Loader text="Loading dashboard..." />;
}

  return(

    <div
      className="relative min-h-screen flex items-center justify-center
      bg-no-repeat bg-center bg-contain bg-black p-4 overflow-hidden"
      style={{ backgroundImage: "url('/bg-card.jpeg')" }}
    >

      {/* ⭐ STAR LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {stars.map((star,i)=>(
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full animate-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              backgroundColor: star.color,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}

      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md px-4">

        <div className="mb-6">
          <ProfileCard profile={profile}/>
        </div>

        <button
          disabled={attempted}
          onClick={()=>navigate("/exam")}
          className={
            attempted
              ? "w-full py-3 rounded-lg font-medium text-white bg-gray-500/70 cursor-not-allowed"
              : "w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-300/80 to-blue-400/80 backdrop-blur-sm border border-white/20 hover:from-cyan-300 hover:to-blue-500 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          }
        >
          {attempted ? "Quiz Already Submitted" : "Start Quiz"}
        </button>

        <div className="grid grid-cols-2 gap-3 mt-4">

          <button
            onClick={()=>navigate(`/result/${quizId}`)}
            className="py-3 rounded-lg font-medium text-white
bg-gradient-to-r from-teal-300/80 to-sky-400/80 backdrop-blur-sm border border-white/20
hover:from-teal-400 hover:to-sky-500
transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            View Result
          </button>

          <button
            onClick={()=>navigate(`/leaderboard/${quizId}`)}
            className="py-3 rounded-lg font-medium text-white
            bg-gradient-to-r from-indigo-300/80 to-purple-400/80 backdrop-blur-sm border border-white/20
            hover:from-indigo-400 hover:to-purple-500
            transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            Leaderboard
          </button>

        </div>

        // ONLY THIS BUTTON UPDATED

<button
  onClick={logout}
  className="mt-6 w-full py-3 rounded-lg font-medium text-white
  bg-gradient-to-r from-indigo-400/80 to-blue-500/80 backdrop-blur-sm border border-white/20
  hover:from-indigo-500 hover:to-blue-600 hover:shadow-md
  transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
>
  Logout
</button>

      </div>

    </div>

  );

}
