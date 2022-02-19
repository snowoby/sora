import Api from "@/api/ApiList";
import client from "@/api/axios";
import { EpisodeInfo, SeriesInfo } from "@/types";

export const APICreateSeries = (info: Record<string, any>) =>
  client.post<SeriesInfo>(`${Api.series}`, info);

export const APIUpdateSeries = (id: string, info: Record<string, any>) =>
  client.put<SeriesInfo>(`${Api.series}${id}`, info);

export const APIGetSeries = (id: string) =>
  client.get<SeriesInfo>(`${Api.series}${id}`);

export const APIAllMySeries = () => client.get<SeriesInfo[]>(Api.series);
