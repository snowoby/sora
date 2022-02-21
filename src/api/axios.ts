import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import {
  GetAccessToken,
  GetRefreshToken,
  SetRefreshToken,
} from "@/utils/utils";
import { APIAccess } from "@/api/SignAPI";
import log from "@/log";

dotenv.config();
let config: AxiosRequestConfig = {
  baseURL: "http://localhost:8089/",
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
  const accessToken = GetAccessToken();
  if (accessToken && config.headers)
    config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (e) => {
    const status = e.response ? e.response.status : null;

    if (status === 401 && GetRefreshToken()) {
      return APIAccess()
        .then((_) => {
          e.config.headers["Authorization"] = "Bearer " + GetAccessToken();
          e.config.baseURL = undefined;
          return axios.request(e.config);
        })
        .catch((e) => {
          log.error(e);
          SetRefreshToken("");
        });
    }

    return Promise.reject(e);
  }
);

export default client;
