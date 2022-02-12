import urlcat from "urlcat";
import endpoint from "@/const/endpoint";
import client from "@/api/axios";
import axios from "axios";

export const StorageUrl = (source: string, identifier?: string) =>
  urlcat(endpoint.url, "/:folder/:id/:identifier", {
    folder:source.split("/")[0],
    id:source.split("/")[1],
    identifier: identifier ?? "original",
  });

export const StorageExists = (source: string, identifier?: string) => {
  const url = StorageUrl(source, identifier);
  return axios.head(url);
};
