import { useState } from "react";
import api from "../api/axios";

export default function Login(){

  const [rollNumber,setRollNumber] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const [role,setRole] = useState("student");

  const login = async ()=>{

  try{

    setLoading(true);

    let res;

    if(role === "student"){

      res = await api.post("/auth/login",{
        rollNumber,
        password
      });

      localStorage.setItem("token",res.data.token);
      window.location.href="/home";

    }else{

      res = await api.post("/admin/login",{
        email: rollNumber,
        password
      });

      localStorage.setItem("adminToken",res.data.token);
      window.location.href="/admin/home";

    }

  }catch(err){

    alert(err.response?.data?.message || "Login Failed");

  }finally{

    setLoading(false);

  }

};

  return(

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white shadow-lg p-6 rounded w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-center">
          Quiz Login
        </h2>

        <input
          placeholder={role === "admin" ? "Email" : "Roll Number"}
          className="border p-2 w-full mb-3"
          onChange={(e)=>setRollNumber(e.target.value)}
        />

        <select
  className="border p-2 w-full mb-3"
  value={role}
  onChange={(e)=>setRole(e.target.value)}
>
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>

  );

}