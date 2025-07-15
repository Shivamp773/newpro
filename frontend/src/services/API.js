import axios from "axios";

const API = axios.create({
  baseURL: "https://newpro-green.vercel.app/",
  withCredentials: true, 
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});
console.log("Axios Base URL →", process.env.REACT_APP_BASEURL);

export default API;
