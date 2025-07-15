import axios from "axios";

const API = axios.create({
  baseURL: "https://newpro-omega.vercel.app/api/v1",
  withCredentials: true, 
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});
console.log("Axios Base URL →", "https://newpro-omega.vercel.app/api/v1");

export default API;
