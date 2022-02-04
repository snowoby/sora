import urlcat from "urlcat";
import endpoint from "@/const/endpoint";

export const StorageUrl = (source: string, identifier?: string) =>
  urlcat(endpoint.url, "/:source/:identifier", {
    source,
    identifier: identifier ?? "original",
  });
