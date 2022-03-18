import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Stack,
} from "@mui/material";
import { APIDeleteEpisode, APIGetAllEpisode } from "@/api/Episode";
import { Episode, Profile, Series } from "@/types";
import log from "@/log";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";

import UniversalContext from "@/context/UniversalContext";
import ShortEpisodeCard from "@/components/ShortEpisodeCard";
import ShortModal from "@/pages/home/ShortModal";
import Notice from "@/components/Notice";
import { AxiosError } from "axios";
import LinkMenu from "@/components/LinkMenu";
import MainFrame from "../frame/MainFrame";

const MainPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [noticeType, setNoticeType] = useState<"success" | "error">("success");
  const [deleteConfirmEpisode, setDeleteConfirmEpisode] =
    useState<Episode | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const location = useLocation();
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
            <Box key={episode.id}>
              <ShortEpisodeCard
                onDelete={(episode) => {
                  setDeleteConfirmEpisode(episode);
                  setDeleteConfirmOpen(true);
                  setDeleting(false);
                }}
                episode={episode}
              />
              <Divider />
            </Box>
          ))}
        </Stack>
      )}

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
    </Stack>
  );

  return (
    <>
      <MainFrame center={episodes ? mainBody() : <LinearProgress />} />
      <ShortModal
        open={location.pathname === "/quick"}
        onClose={(ep, identity) => {
          if (ep) {
            if (identity) {
              if (identity.valueType === "profile") {
                ep.profile = identity as Profile;
              }
              if (identity.valueType === "series") {
                ep.series = identity as Series;
                ep.profile = (identity as Series).profile;
              }
            }
            setEpisodes((episodes) => (episodes ? [ep, ...episodes] : [ep]));
          }
          navigate("/");
        }}
      />
    </>
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
