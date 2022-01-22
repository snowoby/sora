import axios from "axios";
import { Profile } from "@/types";
import Api from "@/api/ApiList";
import client from "@/api/axios";

export const APICreateProfile = (info: Record<string, any>) =>
  client.post<Profile>(Api.profile, info);
