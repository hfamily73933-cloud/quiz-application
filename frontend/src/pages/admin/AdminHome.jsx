import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function AdminHome(){

  const navigate = useNavigate();

  useEffect(()=>{
  const token = localStorage.getItem("adminToken");

  if(!token){
    navigate("/");
  }
},[]);

  

  const logout = ()=>{
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return(

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">

        <h1 className="text-xl font-bold mb-4">
          Admin Panel
        </h1>

        <button
  onClick={()=>navigate("/admin/add-user")}
  className="bg-green-500 text-white w-full p-2 rounded mb-3"
>
  Add User
</button>

        <button
          onClick={()=>navigate("/admin/dashboard")}
          className="bg-blue-500 text-white w-full p-2 rounded mb-3"
        >
          Go to Dashboard
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white w-full p-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  );
}