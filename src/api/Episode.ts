import Api from "@/api/ApiList";
import client from "@/api/axios";
import { EpisodeInfo } from "@/types";

export const APICreateEpisode = (info: Record<string, any>) =>
  client.post<EpisodeInfo>(`${Api.episode}`, info);

export const APIGetAllEpisode = () => client.get<EpisodeInfo[]>(Api.episode);

export const APIGetEpisode = (id: string) =>
  client.get<EpisodeInfo>(`${Api.episode}${id}`);
