import client from "@/api/axios";
import Api from "@/api/ApiList";
import Immutable from "immutable";

export const LoginAPI = (info: Immutable.Map<string, string>) =>
  client.post(Api.login, info);
