import { useState } from "react";
import api from "../api/axios";

export default function Login() {

  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      let res;

      if (role === "student") {
        res = await api.post("/auth/login", {
          rollNumber,
          password
        });

        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";

      } else {
        res = await api.post("/admin/login", {
          email: rollNumber,
          password
        });

        localStorage.setItem("adminToken", res.data.token);
        window.location.href = "/admin/home";
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-cyan-200 to-indigo-400">

      {/* Glass Card */}
      <div className="w-full max-w-sm p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Quiz Portal
        </h2>

        {/* Sliding Role Toggle */}
        <div className="relative flex bg-gray-100 rounded-full p-1 mb-6 overflow-hidden">

          {/* Sliding Background */}
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-full 
            bg-gradient-to-r from-sky-400 to-blue-500 shadow-md
            transition-all duration-300 ease-in-out
            ${role === "student" ? "left-1" : "left-1/2"}`}
          />

          {/* Student */}
          <button
            onClick={() => setRole("student")}
            className={`relative z-10 flex-1 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
              role === "student" ? "text-white" : "text-gray-600"
            }`}
          >
            Student
          </button>

          {/* Admin */}
          <button
            onClick={() => setRole("admin")}
            className={`relative z-10 flex-1 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
              role === "admin" ? "text-white" : "text-gray-600"
            }`}
          >
            Admin
          </button>

        </div>

        {/* Roll / Email */}
        <div className="relative mb-4">
          <input
            placeholder={role === "admin" ? "Email" : "Sigmoid ID"}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 bg-white/80 outline-none transition-all duration-200 hover:border-sky-400 hover:shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:shadow-md focus:scale-[1.01]"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-gray-400">👤</span>
        </div>

        {/* Password */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pl-10 pr-12 rounded-lg border border-gray-300 bg-white/80 outline-none transition-all duration-200 hover:border-sky-400 hover:shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:shadow-md focus:scale-[1.01]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="absolute left-3 top-3 text-gray-400">🔒</span>

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm cursor-pointer text-gray-500 transition hover:text-sky-600 hover:scale-110"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={login}
          disabled={loading || !rollNumber || !password}
          className={
            loading || !rollNumber || !password
              ? "w-full py-3 rounded-lg font-medium text-white bg-sky-300 cursor-not-allowed"
              : "w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          }
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}
