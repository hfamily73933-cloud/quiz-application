import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/exam" element={<Exam />} />

        <Route path="/result/:quizId" element={<Result />} />

        <Route path="/leaderboard/:quizId" element={<Leaderboard />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;