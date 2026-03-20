import axios from "axios";

export default function UserTable({users,refresh}){

  const token = localStorage.getItem("adminToken");

  const callApi = async(url,method="patch",body={})=>{
    await axios({
      url:`${import.meta.env.VITE_API_URL}${url}`,
      method,
      data:body,
      headers:{ Authorization:`Bearer ${token}` }
    });
    refresh();
  };

  const deleteUser = async(id)=>{
    if(confirm("Delete user?")){
      await callApi(`/admin/user/${id}`,"delete");
    }
  };

  return(

    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Roll</th>
            <th>Dept</th>
            <th>Login</th>
            <th>Attempt</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map(u=>(
            <tr key={u._id} className="border-b">

              <td className="p-2">{u.name}</td>
              <td>{u.rollNumber}</td>
              <td>{u.department}</td>

              <td>
                {u.isLoggedIn
                  ? <span className="text-green-600">Online</span>
                  : <span className="text-red-500">Offline</span>}
              </td>

              <td>
                {u.attempted
                  ? <span className="text-green-600">Done</span>
                  : <span className="text-gray-500">No</span>}
              </td>

              <td>
                {u.submittedAt
                  ? new Date(u.submittedAt).toLocaleString()
                  : "-"}
              </td>

              <td className="flex flex-col gap-1">

                <button
                  onClick={()=>callApi(`/admin/reset-login/${u._id}`)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Reset Login
                </button>

                <button
  onClick={async()=>{
    await callApi(`/admin/reset-attempt/${u._id}`);
    alert("User can login again to reattempt quiz");
  }}
  className="bg-blue-500 text-white px-2 py-1 rounded"
>
  Reset Attempt
</button>

                <button
                  onClick={()=>deleteUser(u._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}