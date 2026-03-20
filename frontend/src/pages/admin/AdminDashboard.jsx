import { useEffect,useState } from "react";
import axios from "axios";
import UserTable from "../../components/admin/UserTable";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("all");

  const navigate = useNavigate();
  

 const fetchUsers = async()=>{

  try{

    const token = localStorage.getItem("adminToken");

    if(!token){
      navigate("/");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/users`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setUsers(res.data);
    setLoading(false);

  }catch(err){
    console.log(err);
    setLoading(false);
  }

};

  useEffect(()=>{
    fetchUsers();
  },[]);

  if(loading){
  return <p className="text-center mt-10">Loading...</p>;
}

const filteredUsers = users.filter(u => {

  const matchesSearch =
  (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
  (u.rollNumber || "").toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "all" ||
    (filter === "attempted" && u.attempted) ||
    (filter === "notAttempted" && !u.attempted);

  return matchesSearch && matchesFilter;
});


const totalUsers = users.length;
const attemptedUsers = users.filter(u => u.attempted).length;
const notAttemptedUsers = totalUsers - attemptedUsers;

  return(

    <div className="p-4 max-w-4xl mx-auto">

      {/* TOP HEADER */}
<div className="flex items-center mb-4">

  {/* LEFT: BACK BUTTON */}
  <button
    onClick={() => navigate("/admin/home")}
    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
  >
    ← Home
  </button>

  {/* CENTER: TITLE */}
  <h1 className="text-2xl font-bold text-center flex-1">
    Admin Dashboard
  </h1>

  {/* RIGHT: EMPTY SPACE (for alignment) */}
  <div className="w-16"></div>

</div>

    <div className="grid grid-cols-3 gap-4 mb-4 text-center">

  <div className="bg-blue-100 p-3 rounded">
    <p className="text-lg font-bold">{totalUsers}</p>
    <p>Total</p>
  </div>

  <div className="bg-green-100 p-3 rounded">
    <p className="text-lg font-bold">{attemptedUsers}</p>
    <p>Attempted</p>
  </div>

  <div className="bg-red-100 p-3 rounded">
    <p className="text-lg font-bold">{notAttemptedUsers}</p>
    <p>Not Attempted</p>
  </div>

</div>


      <div className="flex gap-3 mb-4">

  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search by name or roll..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="border p-2 flex-1 rounded"
  />

  {/* FILTER */}
  <select
    value={filter}
    onChange={(e)=>{
  setFilter(e.target.value);
  setSearch(""); // reset search
}}
    className="border p-2 rounded"
  >
    <option value="all">All</option>
    <option value="attempted">Attempted</option>
    <option value="notAttempted">Not Attempted</option>
  </select>

</div>

{filteredUsers.length === 0 && (
  <p className="text-center text-gray-500 mb-3">
    No users found
  </p>
)}

      <UserTable users={filteredUsers} refresh={fetchUsers}/>

    </div>

  );
}