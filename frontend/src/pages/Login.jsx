import { useState } from "react";
import api from "../api/axios";

export default function Login(){

  const [rollNumber,setRollNumber] = useState("");
  const [password,setPassword] = useState("");

  const login = async ()=>{

    try{

      const res = await api.post("/auth/login",{
        rollNumber,
        password
      });

      localStorage.setItem("token",res.data.token);

      window.location.href="/home";

    }catch(err){

      alert(err.response?.data?.message || "Login Failed");

    }

  };

  return(

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white shadow-lg p-6 rounded w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-center">
          Quiz Login
        </h2>

        <input
          placeholder="Roll Number"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setRollNumber(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>

  );

}