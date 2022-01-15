import axios from "axios";

const instance = axios.create({
  baseURL: process.env.ENDPOINT,
  timeout: 1000,
});
