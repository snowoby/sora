import client from "@/api/axios";
import Api from "@/api/ApiList";
import Immutable from "immutable";
import { config } from "dotenv";
import {
  GetRefreshToken,
  SetAccessToken,
  SetRefreshToken,
} from "@/utils/utils";
import log from "@/log";

type Token = { body: string };
type Account = { email: string };

export const APILogin = (info: Record<string, any>) =>
  client.post<Token>(Api.login, info);

export const APIRegister = (info: Record<string, any>) =>
  client.post(Api.register, info);

export const APIRefresh = (info: Record<string, any>) =>
  client.post<Token>(Api.refresh, info);

export const APIAccess = async () => {
  const response = await client.post<Token>(Api.refresh, null, {
    headers: { Authorization: `Bearer ${GetRefreshToken()}` },
  });
  SetAccessToken(response.data.body);
  return response;
};

export const APISelf = () => client.get<Account>(Api.self);

export const LoginStream = async (info: Record<string, any>) => {
  const response = await APILogin(info);
  SetRefreshToken(response.data.body);
  return await APIAccess();
};
