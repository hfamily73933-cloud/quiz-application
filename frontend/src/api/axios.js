import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

api.interceptors.request.use((config)=>{

  const token = localStorage.getItem("token");

  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

     if (!config) return Promise.reject(err);

    if (!err.response && !config._retry) {
      config._retry = true; // ✅ prevent infinite retry
      return api(config);
    }

    return Promise.reject(err);
  }
);

export default api;