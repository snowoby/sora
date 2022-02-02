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

export const singleFileCreate = (profileID: string, data: FileUploadData) =>
  client.post<FileInfo>(`${ApiList.singleFile}/${profileID}`, data);

export const singleFilePut = (profileID: string, fileID: string, file: File) =>
  client.put<FileInfo>(`${ApiList.singleFile}/${profileID}/${fileID}`, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

export const FilePush = async (
  profileID: string,
  category: string,
  file: File
) => {
  return singleFileCreate(profileID, {
    category: category,
    filename: file.name,
    mime: file.type,
    size: file.size,
  }).then(({ data }) => singleFilePut(profileID, data.id, file));
};
