import Api from "@/api/ApiList";
import client from "@/api/axios";
import { Episode,Comment } from "@/types";

export const APICreateComment = (id:string,info: Record<string, any>) =>
  client.post<Comment>(`${Api.comment}episode/${id}`, info);

export const APIGetAllCommentOfOneEpisode = (id:string) => client.get<Comment[]>(`${Api.comment}episode/${id}`);

// export const APIGetEpisode = (id: string) =>
  // client.get<Episode>(`${Api.episode}${id}`);

export const APIDeleteComment = (id: string) => client.delete<Comment>(`${Api.episode}${id}`);
