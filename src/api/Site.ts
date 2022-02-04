import Api from "@/api/ApiList";
import client from "@/api/axios";
import { StorageEndpoint } from "@/types";

export const APIStorageEndpoint = () => client.get<StorageEndpoint>(Api.site);
