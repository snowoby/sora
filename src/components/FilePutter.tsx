import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  LinearProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import FileUploader from "@/components/publish/FileUploader";
import { FilePush } from "@/api/FileUpload";
// import Image from "@/components/Image";
import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { FileInfo, FileUploadProps } from "@/types";
import { StorageUrl } from "@/api/Storage";
import PromiseFileReader from "promise-file-reader";
import CancelIcon from "@mui/icons-material/Cancel";
import log from "@/log";
import Notice from "./Notice";
import UploadImage from "./publish/UploadImage";
import { CreateFileUploadProfile } from "@/utils/file";
type UpdateFunc = (actionType?: Actions, file?: FileUploadProps) => void;

interface Props {
  files: FileUploadProps[];
  onChange: UpdateFunc;
}
const FilePutter = (props: Props) => {
  const { files, onChange } = props;
  const mounted = useRef(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<FileUploadProps | null>(null);
  const [noticeOpen, setNoticeOpen] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [noticeType, setNoticeType] = useState<"success" | "info">("success");

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <Box display="grid" gridTemplateColumns="auto 1fr">
      <List component={Stack} direction="row" flexWrap="wrap" gap={2}>
        <div style={{ width: "6rem", height: "6rem" }}>
          <FileUploader
            accept={["image/*"]}
            maxSize={1024 * 1024 * 20}
            onDrop={async (dropFiles) => {
              // const newFiles: FileUploadProps[] = dropFiles.map((file) => {
              //   const fileUpload: FileUploadProps = {
              //     uploadingStatus: "uploading",
              //     fileStatus: "uploading",
              //     localFile: file,
              //     controller: new AbortController(),
              //   };
              //   return fileUpload;
              // });

              const files: FileUploadProps[] = [];
              for (const file of dropFiles) {
                if (!file) continue;
                const toUpload = await CreateFileUploadProfile(file);
                files.push(toUpload);
                mounted.current && onChange("add", toUpload);
              }

              for (const fileUpload of files) {
                if (!fileUpload.localFile) continue;
                try {
                  if (!mounted.current) return;
                  const { data } = await FilePush(
                    "file",
                    fileUpload.localFile,
                    (status, percentage) => {
                      fileUpload.uploadingStatus = status;
                      fileUpload.progress = percentage;
                      mounted.current && onChange();
                    },
                    fileUpload.controller
                  );
                  fileUpload.fileStatus = "uploaded";
                  fileUpload.fileInfo = data;
                  fileUpload.dataUrl = StorageUrl(
                    data.path,
                    data.id,
                    "thumbnail"
                  );
                } catch (e: any) {
                  if (e.message === "canceled")
                    fileUpload.fileStatus = "deleted";
                  else fileUpload.fileStatus = "failed";
                }
                mounted.current && onChange();
              }
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "6rem",
                height: "6rem",
                textAlign: "left",
              }}
            >
              Upload files here
            </Button>
          </FileUploader>
        </div>
        {files
          .filter((file) => file.fileStatus !== "deleted")
          .map((file, index) => (
            <Box position="relative" key={index}>
              <Box
                position="absolute"
                zIndex={20}
                right={0}
                top={0}
                sx={{ transform: "translate(50%, -50%)" }}
              >
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => {
                    setDeleteDialogOpen(true);
                    setToDelete(file);
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
              <Button
                sx={{ p: 0 }}
                disabled={file.fileStatus !== "uploaded"}
                onClick={() => {
                  if (!file.fileInfo) return;
                  navigator.clipboard.writeText(
                    `![${file.fileInfo.filename}](image:${file.fileInfo.id} "${file.fileInfo.filename}")`
                  );
                }}
              >
                <UploadImage file={file} width="6rem" height="6rem" />
                {file.fileStatus === "uploaded" && (
                  <ImageListItemBar
                    subtitle={
                      <Typography variant="body2">
                        {file.fileInfo?.filename}
                      </Typography>
                    }
                  />
                )}
              </Button>
            </Box>
          ))}
      </List>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onConfirm={() => {
          if (!toDelete) return;
          toDelete.controller?.abort();
          toDelete.fileStatus = "deleted";
          onChange();
          setDeleteDialogOpen(false);
          setNoticeOpen(true);
          setNoticeType("success");
          setNoticeMessage("deleted!");
        }}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setNoticeOpen(true);
          setNoticeType("info");
          setNoticeMessage("that was close.");
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
            {(toDelete?.localFile as any)?.name ?? "Noname file"}
          </Typography>
          <Typography variant="subtitle1">
            {toDelete?.localFile?.size
              ? `${(toDelete?.localFile?.size / 1024 / 1024).toFixed(2)} MB`
              : "unknown"}
          </Typography>
          <Typography variant="subtitle1">
            the file is {toDelete?.uploadingStatus}
            {toDelete?.uploadingStatus === "uploading" && !!toDelete.progress
              ? " " + Math.floor(toDelete?.progress * 100) + "%"
              : ""}
          </Typography>
          {toDelete?.uploadingStatus === "uploading" && toDelete.progress && (
            <LinearProgress
              variant="determinate"
              value={Math.floor(toDelete.progress * 100)}
            />
          )}
        </Box>
        <img style={{ maxWidth: "100%" }} src={toDelete?.dataUrl} />
      </DeleteConfirmDialog>
      <Notice
        open={noticeOpen}
        message={noticeMessage}
        type={noticeType}
        onClose={() => {
          setNoticeOpen(false);
        }}
      />
    </Box>
  );
};

export default FilePutter;

type DeleteConfirmDialogProps = {
  open: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
};

const DeleteConfirmDialog = (props: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogTitle>Delete file</DialogTitle>
      <DialogContent>
        <Box>{props.children}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Close</Button>
        <Button onClick={props.onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type Actions = "add" | "remove" | "reset";
type ActionProps = {
  type?: Actions;
  file?: FileUploadProps;
};

const fileReducer = (
  state: FileUploadProps[],
  action: ActionProps
): FileUploadProps[] => {
  switch (action.type) {
    case "add":
      if (action.file) return [...state, action.file];
      return state;
    case "remove":
      return state.filter((file) => file !== action.file);
    case "reset":
      return [];
    default:
      return [...state];
  }
};
export const useFilePutter = (
  initFiles?: FileUploadProps[]
): [FileUploadProps[], UpdateFunc] => {
  initFiles = initFiles ?? ([] as FileUploadProps[]);
  const [state, dispatch] = useReducer(fileReducer, initFiles);
  return [
    state,
    (actionType?: Actions, file?: FileUploadProps) =>
      dispatch({ type: actionType, file }),
  ];
};
