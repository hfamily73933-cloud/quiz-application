import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Leaderboard(){

  const {quizId} = useParams();

  const [leaders,setLeaders] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{

    const loadLeaderboard = async()=>{

      const res = await api.get(`/quiz/leaderboard/${quizId}`);

      setLeaders(res.data);

    };

    loadLeaderboard();

  },[]);


  /* PREVENT BACK TO EXAM */

  useEffect(()=>{

    window.history.pushState(null,null,window.location.href);

    const handleBack = ()=>{
      navigate("/home");
    };

    window.addEventListener("popstate",handleBack);

    return ()=>window.removeEventListener("popstate",handleBack);

  },[]);


  return(

    <div className="max-w-md mx-auto p-4">

      <div className="bg-white shadow rounded p-4">

        <h2 className="text-xl font-bold mb-4 text-center">
          Leaderboard
        </h2>

        {leaders.map((user,index)=>(

          <div
            key={index}
            className="flex justify-between border-b py-2"
          >

            <span>
              {index+1}. {user.userId.name}
            </span>

            <span>
              {user.score}
            </span>

          </div>

        ))}

        <button
          onClick={()=>navigate("/home")}
          className="mt-4 bg-green-500 text-white w-full p-2 rounded"
        >
          Back to Home
        </button>

      </div>

    </div>

  );

}