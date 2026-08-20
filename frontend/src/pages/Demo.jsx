import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Demo(){

  const navigate = useNavigate();

  const [selected,setSelected] = useState("");
  const [showResult,setShowResult] = useState(false);

  const question = {
    question: "Which database is used in the MERN stack?",
    options: [
      {
        id: "A",
        text: "MongoDB"
      },
      {
        id: "B",
        text: "MySQL"
      },
      {
        id: "C",
        text: "PostgreSQL"
      },
      {
        id: "D",
        text: "SQLite"
      }
    ],
    correctOptionId: "A"
  };


  const selectOption = (optionId) => {

    if(showResult){
      return;
    }

    setSelected(optionId);

  };


  const submitDemo = () => {

    if(!selected){
      return;
    }

    setShowResult(true);

  };


  const resetDemo = () => {

    setSelected("");
    setShowResult(false);

  };


  return(

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 p-4">

      <div className="max-w-md mx-auto">


        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">

          <div>

            <h1 className="text-xl font-bold text-gray-800">
              Quiz Portal
            </h1>

            <p className="text-sm text-blue-600">
              Live Demo
            </p>

          </div>


          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Exit
          </button>

        </div>


        {/* DEMO NOTICE */}

        <div className="bg-blue-100 border border-blue-200 rounded-xl p-3 mb-4">

          <p className="text-sm text-blue-800">
            This is a demo environment. No real student account,
            exam submission, or database data is affected.
          </p>

        </div>


        {/* DEMO PROFILE */}

        <div className="bg-white rounded-xl shadow p-4 mb-4">

          <p className="text-xs text-gray-500 mb-1">
            DEMO STUDENT
          </p>

          <h2 className="font-bold text-gray-800">
            Demo Student
          </h2>

          <p className="text-sm text-gray-500">
            Sigmoid ID: DEMO001
          </p>

        </div>


        {!showResult ? (

          /* DEMO EXAM */

          <div className="bg-white rounded-xl shadow p-4">


            {/* QUIZ HEADER */}

            <div className="flex justify-between items-center mb-5">

              <span className="text-sm font-semibold text-gray-700">
                Question 1 / 30
              </span>

              <span className="text-sm font-bold text-red-500">
                39:45
              </span>

            </div>


            {/* QUESTION */}

            <h2 className="font-semibold text-gray-800 mb-4">
              1. {question.question}
            </h2>


            {/* OPTIONS */}

            {question.options.map((option) => {

              const isSelected = selected === option.id;

              return(

                <button
                  key={option.id}
                  onClick={() => selectOption(option.id)}
                  className={`w-full text-left p-3 rounded-lg mb-2 border transition ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-blue-50"
                  }`}
                >

                  <span className="font-semibold mr-2">
                    {option.id}.
                  </span>

                  {option.text}

                </button>

              );

            })}


            {/* NAVIGATION */}

            <div className="flex gap-3 mt-5">

              <button
                disabled
                className="w-full p-2.5 rounded-lg bg-gray-200 text-gray-400"
              >
                Prev
              </button>

              <button
                onClick={submitDemo}
                disabled={!selected}
                className={`w-full p-2.5 rounded-lg text-white ${
                  selected
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>

            </div>

          </div>

        ) : (

          /* DEMO RESULT */

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quiz Result
            </h2>


            <p className="text-lg mb-5">

              Your Score:{" "}

              <span className="font-bold text-blue-600">
                {selected === question.correctOptionId ? "4" : "0"}
              </span>

            </p>


            <div className="grid grid-cols-2 gap-3 mb-5">


              <div className="bg-gray-100 p-3 rounded-lg">

                <p className="text-sm text-gray-500">
                  Attempted
                </p>

                <p className="font-bold">
                  1
                </p>

              </div>


              <div className="bg-gray-100 p-3 rounded-lg">

                <p className="text-sm text-gray-500">
                  Unattempted
                </p>

                <p className="font-bold">
                  29
                </p>

              </div>


              <div className="bg-green-100 p-3 rounded-lg">

                <p className="text-sm text-green-700">
                  Correct
                </p>

                <p className="font-bold">
                  {selected === question.correctOptionId ? "1" : "0"}
                </p>

              </div>


              <div className="bg-red-100 p-3 rounded-lg">

                <p className="text-sm text-red-700">
                  Incorrect
                </p>

                <p className="font-bold">
                  {selected !== question.correctOptionId ? "1" : "0"}
                </p>

              </div>

            </div>


            <button
              onClick={resetDemo}
              className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white mb-2"
            >
              Try Demo Again
            </button>


            <button
              onClick={() => navigate("/")}
              className="w-full p-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Back to Login
            </button>

          </div>

        )}


        {/* FEATURES */}

        <div className="bg-white rounded-xl shadow p-4 mt-4">

          <h2 className="font-semibold text-gray-800 mb-3">
            Application Features
          </h2>


          <div className="space-y-2 text-sm text-gray-600">

            <p>✓ Secure Student & Admin Login</p>
            <p>✓ Timed Online Examination</p>
            <p>✓ Automatic Answer Saving</p>
            <p>✓ Automatic Submission</p>
            <p>✓ Result Analytics</p>
            <p>✓ Live Leaderboard</p>
            <p>✓ Response Sheet PDF</p>
            <p>✓ Mobile-Friendly Design</p>

          </div>

        </div>


        {/* FOOTER */}

        <p className="text-center text-xs text-gray-400 mt-5">
          Live Demo • No real data is affected
        </p>

      </div>

    </div>

  );

}
