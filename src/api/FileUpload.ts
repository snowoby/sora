import log from "@/log";
import client from "@/api/axios";
import { FileInfo, FileUploadData, FileUploadingStatus } from "@/types";
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

type ProgessUpdateFunc = ( status:FileUploadingStatus,percent?:number)=>void

export const singleFileCreate = (data: FileUploadData, controller?:AbortController) =>
  client.post<FileInfo>(`${ApiList.singleFile}`, data,{signal:controller?.signal});

export const singleFilePut = (fileID: string, file: File | Blob,updateProgress?:ProgessUpdateFunc, controller?:AbortController) =>
  client.put<FileInfo>(`${ApiList.singleFile}${fileID}`, file, {
    headers: {
      "Content-Type": file.type,
    },
    onUploadProgress: (e: ProgressEvent) =>{
      if(!e.lengthComputable||!e.total){
        updateProgress?.( "uploading",0)
        return
      }
      if (e.loaded===e.total){
        updateProgress?.("processing")
        return
      }
      updateProgress?.("uploading",e.loaded/e.total)
    },
    signal:controller?.signal
  }, );

export const FilePush = async (category: string, file: File | Blob, updateProgress?:ProgessUpdateFunc, controller?:AbortController) => {
  updateProgress?.("creating")
  return singleFileCreate({
    category: category,
    filename: file instanceof File ? file.name : "noname",
    mime: file.type,
    size: file.size,
  },controller).then(({ data }) => singleFilePut(data.id, file, updateProgress, controller))
  .then((response)=>{
    updateProgress?.("uploaded");
    return response;
  })
  // .catch(e=>{updateProgress?.("failed")});
};
