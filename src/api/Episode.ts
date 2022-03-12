import Api from "@/api/ApiList";
import client from "@/api/axios";
import { Episode } from "@/types";

export const APICreateEpisode = (info: Record<string, any>) =>
  client.post<Episode>(`${Api.episode}`, info);

export const APIGetAllEpisode = () => client.get<Episode[]>(Api.episode);

export const APIGetEpisode = (id: string) =>
  client.get<Episode>(`${Api.episode}${id}`);

export const APIDeleteEpisode = (id: string) => client.delete<Episode>(`${Api.episode}${id}`);
