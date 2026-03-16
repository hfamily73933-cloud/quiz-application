import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Result(){

  const {quizId} = useParams();

  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);

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

      const res = await api.get(`/quiz/result/${quizId}`);

      setResult(res.data);

    };

    loadResult();

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


  if(!result){
    return <p className="text-center mt-10">Loading result...</p>
  }

  return(

    <div className="max-w-md mx-auto p-4">

      <div className="bg-white shadow p-6 rounded text-center">

        <h2 className="text-2xl font-bold mb-4">
          Quiz Result
        </h2>

        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{result.score}</span>
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">

          <div className="bg-gray-100 p-3 rounded">
            Attempted
            <div className="font-bold">{result.attempted}</div>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            Unattempted
            <div className="font-bold">{result.unattempted}</div>
          </div>

          <div className="bg-green-100 p-3 rounded">
            Correct
            <div className="font-bold">{result.correct}</div>
          </div>

          <div className="bg-red-100 p-3 rounded">
            Incorrect
            <div className="font-bold">{result.incorrect}</div>
          </div>

        </div>

        <button
  onClick={downloadSheet}
  className="mt-2 bg-purple-500 text-white p-2 rounded w-full"
>
  Download Response Sheet
</button>

        <button
          onClick={()=>{
            setLoading(true)
            navigate("/home")
          }}
          className="mt-2 bg-green-500 text-white p-2 rounded w-full"
        >
          {loading ? "Loading..." : "Back to Home"}
        </button>

        <button
          onClick={()=>{
            setLoading(true)
            navigate(`/leaderboard/${quizId}`)
          }}
          className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? "Loading..." : "View Leaderboard"}
        </button>

      </div>

    </div>

  );

}