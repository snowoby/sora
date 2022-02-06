import urlcat from "urlcat";
import endpoint from "@/const/endpoint";
import client from "@/api/axios";
import axios from "axios";

export const StorageUrl = (source: string, identifier?: string) =>
  urlcat(endpoint.url, "/:source/:identifier", {
    source,
    identifier: identifier ?? "original",
  });

export const StorageExists = (source: string, identifier?: string) => {
  const url = StorageUrl(source, identifier);
  return axios.head(url);
};
