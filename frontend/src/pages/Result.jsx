import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Result(){

  const {quizId} = useParams();

  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const downloadSheet = async()=>{

    try{

      const res = await api.get(
        `/quiz/response-sheet/${quizId}`,
        { responseType:"blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download","response-sheet.pdf");

      document.body.appendChild(link);

      link.click();

      link.remove();

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{

    const loadResult = async()=>{
      try{
        const res = await api.get(`/quiz/result/${quizId}`);
        setResult(res.data);
      }catch(err){
        if(err.response?.status === 404){
          setError("Please attempt the test");
        }else{
          setError("Something went wrong");
        }
      }
    };

    loadResult();

  },[]);

  useEffect(()=>{

    window.history.pushState(null,null,window.location.href);

    const handleBack = ()=>{
      navigate("/home");
    };

    window.addEventListener("popstate",handleBack);

    return ()=>window.removeEventListener("popstate",handleBack);

  },[]);

  if(error){
    return (
      <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200">
        
        <div className="text-center p-6 rounded-xl shadow-lg
        bg-gradient-to-br from-slate-700 to-slate-900 text-white">

          <p className="mb-4">{error}</p>

          <button
            onClick={()=>navigate("/home")}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded
            hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            Go to Home
          </button>
        </div>

      </div>
    );
  }

  if(!result){
  return <Loader text="Loading result..." />;
}

  return(

    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200 p-4">

      {/* CENTER CARD */}
      <div className="p-6 rounded-2xl text-center w-full max-w-md
      bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900
      text-white shadow-xl transition-all duration-300
      hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">

        <h2 className="text-2xl font-bold mb-4">
          Quiz Result
        </h2>

        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{result.score}</span>
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm mb-5">

          <div className="bg-white/10 p-3 rounded-lg">
            Attempted
            <div className="font-bold">{result.attempted}</div>
          </div>

          <div className="bg-white/10 p-3 rounded-lg">
            Unattempted
            <div className="font-bold">{result.unattempted}</div>
          </div>

          <div className="bg-green-400/20 p-3 rounded-lg">
            Correct
            <div className="font-bold">{result.correct}</div>
          </div>

          <div className="bg-red-400/20 p-3 rounded-lg">
            Incorrect
            <div className="font-bold">{result.incorrect}</div>
          </div>

        </div>

        {/* Buttons */}

        <button
          onClick={downloadSheet}
          className="mt-2 w-full py-2 rounded-lg font-medium text-white
          bg-gradient-to-r from-purple-400 to-indigo-500
          hover:from-purple-500 hover:to-indigo-600
          transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        >
          Download Response Sheet
        </button>

        <button
          onClick={()=>{
            setLoading(true)
            navigate("/home")
          }}
          className="mt-3 w-full py-2 rounded-lg font-medium text-white
          bg-gradient-to-r from-green-400 to-emerald-500
          hover:from-green-500 hover:to-emerald-600
          transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        >
          {loading ? "Loading..." : "Back to Home"}
        </button>

        <button
          onClick={()=>{
            setLoading(true)
            navigate(`/leaderboard/${quizId}`)
          }}
          className="mt-3 w-full py-2 rounded-lg font-medium text-white
          bg-gradient-to-r from-blue-400 to-indigo-500
          hover:from-blue-500 hover:to-indigo-600
          transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        >
          {loading ? "Loading..." : "View Leaderboard"}
        </button>

      </div>

    </div>

  );

}
