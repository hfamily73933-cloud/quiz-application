import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Leaderboard(){

  const {quizId} = useParams();

  const [leaders,setLeaders] = useState([]);
  const [currentUserId,setCurrentUserId] = useState(null);
  const [loading,setLoading] = useState(true);
  const [yourRank,setYourRank] = useState(null);
  const [total,setTotal] = useState(0);

  const navigate = useNavigate();

 useEffect(()=>{

  const loadData = async()=>{
    try{
      const [leaderRes, profileRes] = await Promise.all([
        api.get(`/quiz/leaderboard/${quizId}`),
        api.get("/auth/profile")
      ]);

      setLeaders(leaderRes.data.leaderboard);
      setYourRank(leaderRes.data.yourRank);
      setTotal(leaderRes.data.totalUsers);

      setCurrentUserId(profileRes.data._id);

    }catch(err){
      console.log(err);
    }finally{
      setLoading(false); // ✅ VERY IMPORTANT
    }
  };

  loadData();

},[]);


  const formatTime = (seconds)=>{
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};


  /* PREVENT BACK TO EXAM */

  useEffect(()=>{

    window.history.pushState(null,null,window.location.href);

    const handleBack = ()=>{
      navigate("/home");
    };

    window.addEventListener("popstate",handleBack);

    return ()=>window.removeEventListener("popstate",handleBack);

  },[]);

  if(loading){
  return (
    <p className="text-center mt-10">
      Loading leaderboard...
    </p>
  );
}

  return(

    <div className="max-w-md mx-auto p-4">

      <div className="bg-white shadow rounded p-4">

  {/* TOP BAR */}
  <div className="flex justify-between items-center mb-4">
    
    <button
      onClick={()=>{
        setLoading(true)
        navigate("/home")
      }}
      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
    >
      ← Home
    </button>

    <h2 className="text-xl font-bold text-center flex-1">
      Leaderboard
    </h2>

    {/* empty space for alignment */}
    <div className="w-16"></div>

  </div>

        {yourRank !== null && (
  <div className="text-center mb-3 font-semibold text-blue-600">
    You are ranked #{yourRank} out of {total}
  </div>
)}

        {leaders.map((user,index)=>(

          <div
            key={user.userId?._id || user.rank}
            className={`flex justify-between border-b py-2 ${
  user.userId?._id === currentUserId
    ? "bg-blue-100 border-l-4 border-blue-500"
    : ""
} ${
  index === 0 ? "text-yellow-500 font-bold" :
  index === 1 ? "text-gray-500 font-semibold" :
  index === 2 ? "text-orange-500 font-semibold" : ""
}`}
          >

            <span className="font-medium">
  #{user.rank} {user.userId?.name || "Unknown User"}
{user.userId?._id === currentUserId && (
  <span className="ml-2 text-blue-600 text-sm">(You)</span>
)}
</span>

            <span className="text-right">
  <div>{user.score}</div>
  <div className="text-xs text-gray-500">
    {user.timeTaken === 99999999
  ? "-"
  : formatTime(user.timeTaken)}
  </div>
</span>

          </div>

        ))}

      </div>

    </div>

  );

}