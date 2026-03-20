import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUser(){

  const [form,setForm] = useState({
    name:"",
    rollNumber:"",
    department:""
  });

  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
       setSuccess(""); // ✅ clear message when typing
  };

  const createUser = async()=>{

    try{
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/user`,
        {
          ...form,
          password:"123456" // ✅ default password
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setSuccess("User created successfully");

      setForm({
  name:"",
  rollNumber:"",
  department:""
});

    }catch(err){
      alert(err.response?.data?.message || "Error");
    }finally{
      setLoading(false);
    }

  };

  return(

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-center">
          Add User
        </h2>

        {success && (
  <p className="text-green-600 text-center mb-3">
    {success}
  </p>
)}

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="rollNumber"
          placeholder="Roll Number"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button
          onClick={createUser}
          disabled={loading}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          {loading ? "Creating..." : "Create User"}
        </button>

        <button
          onClick={()=>navigate("/admin/home")}
          className="mt-3 text-sm text-gray-500 w-full"
        >
          Back
        </button>

      </div>

    </div>

  );
}