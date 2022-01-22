import client from "@/api/axios";
import Api from "@/api/ApiList";
import {
  GetRefreshToken,
  SetAccessToken,
  SetRefreshToken,
} from "@/utils/utils";
import axios from "axios";
import { AccountInfo, Token } from "@/types";

export const APILogin = (info: Record<string, any>) =>
  axios.post<Token>(Api.login, info);

export const APIRegister = (info: Record<string, any>) =>
  axios.post(Api.register, info);

export const APIAccess = async () => {
  const response = await axios.post<Token>(Api.refresh, null, {
    headers: { Authorization: `Bearer ${GetRefreshToken()}` },
  });
  SetAccessToken(response.data.body);
  return response;
};

export const APISelf = () => client.get<AccountInfo>(Api.self);

export const LoginStream = async (info: Record<string, any>) => {
  SetRefreshToken("");
  SetAccessToken("");
  const response = await APILogin(info);
  SetRefreshToken(response.data.body);
  return await APIAccess();
};
