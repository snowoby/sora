import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Modal,
  Stack,
} from "@mui/material";
import { APIDeleteEpisode, APIGetAllEpisode } from "@/api/Episode";
import { Episode, FileInfo, Profile, Series } from "@/types";
import log from "@/log";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";

import UniversalContext from "@/context/UniversalContext";
import ShortEpisodeCard from "@/components/ShortEpisodeCard";
import Notice from "@/components/Notice";
import { AxiosError } from "axios";
import MainFrame from "../frame/MainFrame";
import TitleBar from "@/components/TitleBar";
import { StorageUrl } from "@/api/Storage";

const MainPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [noticeType, setNoticeType] = useState<"success" | "error">("success");
  const [deleteConfirmEpisode, setDeleteConfirmEpisode] =
    useState<Episode | null>(null);
  const [largeImageOpen, setLargeImageOpen] = useState(false);
  const [largeImageFile, setLargeImageFile] = useState<FileInfo | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchEpisodes = () =>
    APIGetAllEpisode()
      .then(({ data }) => {
        setEpisodes(data);
      })
      .catch((e) => log.error(e));

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const { siteName } = useContext(UniversalContext);

  const mainBody = () => (
    <>
      <Stack
        spacing={2}
        sx={{
          borderLeftColor: "divider",
          borderLeftStyle: "solid",
          borderLeftWidth: "1px",
          borderRightColor: "divider",
          borderRightStyle: "solid",
          borderRightWidth: "1px",
        }}
      >
        {episodes && (
          <Stack>
            {episodes.map((episode) => (
              <Box
                key={episode.id}
                sx={{
                  transition: "all 0.15s ease-in-out",
                  "&:hover": {
                    boxShadow: (theme) =>
                      `${theme.palette.primary.main} 0 0 10px -4px`,
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  navigate(`/episode/${episode.id}`);
                }}
              >
                <ShortEpisodeCard
                  onDelete={(episode) => {
                    setDeleteConfirmEpisode(episode);
                    setDeleteConfirmOpen(true);
                    setDeleting(false);
                  }}
                  episode={episode}
                  onMediaClick={(e, file) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setLargeImageFile(file);
                    setLargeImageOpen(true);
                  }}
                />
                <Divider />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
      <Modal
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={largeImageOpen}
        disableScrollLock={false}
        onClick={() => setLargeImageOpen(false)}
      >
        <Box
          width="100%"
          height="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {largeImageFile && (
            <img
              src={StorageUrl("file", largeImageFile.id, "original")}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
        </Box>
      </Modal>
      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        loading={deleting}
        onConfirm={() => {
          if (!deleteConfirmEpisode) return;
          setDeleting(true);
          APIDeleteEpisode(deleteConfirmEpisode.id)
            .then(() => {
              setDeleteConfirmEpisode(null);
              setDeleteConfirmOpen(false);
              setNoticeMessage("deleted.");
              setNoticeType("success");
              setShowNotice(true);
              setEpisodes((episodes) =>
                episodes?.filter((e) => e.id !== deleteConfirmEpisode.id)
              );
            })
            .catch((e) => {
              setNoticeMessage(
                (e as AxiosError).response?.data?.message ?? e.message
              );
              setNoticeType("error");
              setShowNotice(true);
              setDeleting(false);
            });
        }}
      >
        {deleteConfirmEpisode && (
          <ShortEpisodeCard hideAction={true} episode={deleteConfirmEpisode} />
        )}
      </ConfirmDialog>
      <Notice
        open={showNotice}
        message={noticeMessage}
        onClose={() => setShowNotice(false)}
        type={noticeType}
      ></Notice>
    </>
  );

  return (
    <MainFrame
      center={episodes ? mainBody() : <LinearProgress />}
      title={<TitleBar button={<></>}>{siteName}</TitleBar>}
    />
  );
};

export default MainPage;

type ConfirmDialogProps = {
  children?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  loading?: boolean;
};

const ConfirmDialog = ({
  open,
  children,
  onClose,
  onConfirm,
  loading,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>do you really want to delete?</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} onClick={onClose}>
          Cancel
        </LoadingButton>
        <LoadingButton loading={loading} color="error" onClick={onConfirm}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
