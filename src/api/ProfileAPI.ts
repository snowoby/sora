import { AccountInfo, Profile } from "@/types";
import Api from "@/api/ApiList";
import client from "@/api/axios";

export const APISelf = () => client.get<AccountInfo>(Api.self);

export const APICreateProfile = (info: Record<string, any>) =>
  client.post<Profile>(Api.profile, info);
