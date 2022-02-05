import { AccountInfo, Profile } from "@/types";
import Api from "@/api/ApiList";
import client from "@/api/axios";
import urlcat from "urlcat";

export const APISelf = () => client.get<AccountInfo>(Api.self);

export const APICreateProfile = (info: Record<string, any>) =>
  client.post<Profile>(Api.profile, info);

export const APIUpdateProfile = (id: string, info: Record<string, any>) =>
  client.put<Profile>(urlcat(Api.profile, "/:id/", { id }), info);
