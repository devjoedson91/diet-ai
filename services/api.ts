import axios from "axios";

export const api = axios.create({
  baseURL: "https://diet-server.vercel.app",
});
