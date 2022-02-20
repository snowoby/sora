import Api from "@/api/ApiList";
import client from "@/api/axios";
import { Series } from "@/types";

export const APICreateSeries = (info: Record<string, any>) =>
  client.post<Series>(`${Api.series}`, info);

export const APIUpdateSeries = (id: string, info: Record<string, any>) =>
  client.put<Series>(`${Api.series}${id}`, info);

export const APIGetSeries = (id: string) =>
  client.get<Series>(`${Api.series}${id}`);

export const APIAllMySeries = () => client.get<Series[]>(Api.series);
