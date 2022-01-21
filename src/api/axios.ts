import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";

dotenv.config();
let config: AxiosRequestConfig = {
  timeout: 1000,
};
if (process.env.NODE_ENV === "production") {
  config = {
    baseURL: process.env.REACT_APP_ENDPOINT,
    timeout: 1000,
  };
}
const client = axios.create(config);

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken && config.headers)
    config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default client;
