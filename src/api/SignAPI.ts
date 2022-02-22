import Api from "@/api/ApiList";
import {
  GetRefreshToken,
  SetAccessToken,
  SetRefreshToken,
} from "@/utils/utils";
import axios, { AxiosRequestConfig } from "axios";
import { Token } from "@/types";
import log from "@/log";

let config: AxiosRequestConfig = {
  baseURL: "http://localhost:8089/",
  timeout: 1000,
};
if (process.env.NODE_ENV === "production") {
  config = {
    baseURL: process.env.REACT_APP_ENDPOINT,
  };
}
const client = axios.create(config);

export const APILogin = (info: Record<string, any>) =>
  client.post<Token>(Api.login, info);

export const APIRegister = (info: Record<string, any>) =>
  client.post(Api.register, info);

export const APIAccess = async () => {
  const response = await client.post<Token>(Api.refresh, null, {
    headers: { Authorization: `Bearer ${GetRefreshToken()}` },
  });
  SetAccessToken(response.data.body);
  return response;
};

export const LoginStream = async (info: Record<string, any>) => {
  SetRefreshToken("");
  SetAccessToken("");
  const response = await APILogin(info);
  SetRefreshToken(response.data.body);
  log.info(response.data.body);
  return await APIAccess();
};
