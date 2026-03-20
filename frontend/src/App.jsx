import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";


import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddUser from "./pages/admin/AddUser";



function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/exam" element={<Exam />} />

        <Route path="/result/:quizId" element={<Result />} />

        <Route path="/leaderboard/:quizId" element={<Leaderboard />} />

        <Route path="/admin/home" element={<AdminHome />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/add-user" element={<AddUser />} />
        
      </Routes>

    </BrowserRouter>

  );

}

export default App;