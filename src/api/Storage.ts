import urlcat from "urlcat";
import endpoint from "@/const/endpoint";
import axios from "axios";

export const StorageUrl = (path: string, id: string, identifier: string) => {
  if(!id||!identifier)return ""
  return urlcat(endpoint.url, "/:folder/:id/:identifier", {
    folder: path ?? "file",
    id: id,
    identifier: identifier,
  });

}

export const StorageExists = (
  source: string,
  path: string,
  identifier: string
) => {
  const url = StorageUrl(path, source, identifier);
  return axios.head(url);
};
