import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const client = axios.create({
  // baseURL: process.env.REACT_APP_ENDPOINT,
  timeout: 1000,
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken && config.headers) config.headers.Authorization = accessToken;
  return config;
});

export default client;
