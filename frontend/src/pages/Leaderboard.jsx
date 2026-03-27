import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

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
        setLoading(false);
      }
    };

    loadData();

  },[]);

  const formatTime = (seconds)=>{
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  useEffect(()=>{

    window.history.pushState(null,null,window.location.href);

    const handleBack = ()=>{
      navigate("/home");
    };

    window.addEventListener("popstate",handleBack);

    return ()=>window.removeEventListener("popstate",handleBack);

  },[]);

 if(loading){
  return <Loader text="Loading leaderboard..." />;
}

  return(

    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200 p-4">

      {/* TOP BAR */}
      <div className="flex items-center mb-6">

        <button
          onClick={()=>{
            setLoading(true);
            navigate("/home");
          }}
          className="bg-white/70 px-3 py-1 rounded-full text-sm shadow
          hover:bg-white transition"
        >
          ← Home
        </button>

        <h2 className="text-2xl font-bold text-center flex-1 text-gray-800">
          Leaderboard
        </h2>

        <div className="w-16"></div>
      </div>

      {/* YOUR RANK */}
      {yourRank !== null && (
        <div className="text-center mb-6 text-lg font-semibold text-indigo-700">
          You are ranked #{yourRank} out of {total}
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4 max-w-md mx-auto">

        {leaders.map((user,index)=>{

          const isYou = user.userId?._id === currentUserId;

          const bgColors = [
            "from-orange-300 to-red-300",
            "from-yellow-300 to-orange-300",
            "from-lime-300 to-yellow-300",
            "from-pink-300 to-purple-300",
            "from-indigo-300 to-blue-300"
          ];

          const gradient = bgColors[index] || "from-gray-200 to-gray-300";

          return(

            <div
              key={user.userId?._id || user.rank}
              className={`flex items-center justify-between p-4 rounded-full
              bg-gradient-to-r ${gradient}
              shadow-md transition-all duration-300
              hover:scale-[1.02]
              ${isYou ? "ring-2 ring-indigo-400" : ""}`}
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
                  👤
                </div>

                {/* Name + Details */}
                <div>
                  <div className="font-semibold text-gray-900">
                    {user.userId?.name || "Unknown"}
                    {isYou && (
                      <span className="ml-2 text-xs text-indigo-700">(You)</span>
                    )}
                  </div>

                  {/* Score + Time */}
                  <div className="text-sm font-medium text-gray-800">
                    Score: {user.score} •{" "}
                    {user.timeTaken === 99999999
                      ? "-"
                      : formatTime(user.timeTaken)}
                  </div>
                </div>

              </div>

              {/* RIGHT (Rank) */}
              <div className="text-xl font-bold text-gray-800">
                {String(user.rank).padStart(2,"0")}
              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}
