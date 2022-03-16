import { FileUploadProps } from "@/types";
import PromiseFileReader from "promise-file-reader";

export const CreateFileUploadProfile = async (file: File | Blob) => {
  let dataUrl;
  if (file.type.startsWith("image/")) {
    dataUrl = await PromiseFileReader.readAsDataURL(file);
  }
  const result: FileUploadProps = {
    uploadingStatus: "uploading",
    fileStatus: "uploading",
    localFile: file,
    dataUrl,
    controller: new AbortController(),
  };

  return result;
};
