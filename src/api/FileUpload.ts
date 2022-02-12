import log from "@/log";
import client from "@/api/axios";
import { FileInfo, FileUploadData } from "@/types";
import ApiList from "@/api/ApiList";
import PromiseFileReader from "promise-file-reader";

// const loadFile = (file: File): Promise<string | null> =>
//   new Promise((resolve, reject) => {
//     const read = new FileReader();
//     read.readAsDataURL(file);
//     read.onloadend = () => {
//       resolve(read.result);
//     };
//     read.onerror = reject;
//   });

export const singleFileCreate = (data: FileUploadData) =>
  client.post<FileInfo>(`${ApiList.singleFile}`, data);

export const singleFilePut = (fileID: string, file: File | Blob) =>
  client.put<FileInfo>(`${ApiList.singleFile}${fileID}`, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

export const FilePush = async (category: string, file: File | Blob) => {
  return singleFileCreate({
    category: category,
    filename: file instanceof File ? file.name : "noname",
    mime: file.type,
    size: file.size,
  }).then(({ data }) => singleFilePut(data.id, file));
};
