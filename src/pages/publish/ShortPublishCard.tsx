import React, { useContext, useEffect, useState } from "react";
import FilePutter, { useFilePutter } from "@/components/FilePutter";
import { Episode, FileInfo, FileUploadProps, Profile, Series } from "@/types";
import Content from "./Content";
import DefaultProfileSeriesSwitcher from "@/components/DefaultProfileSeriesSwitcher";
import { AlertColor, Box, Button, Stack, Typography } from "@mui/material";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import { LoadingButton } from "@mui/lab";
import AccountContext from "@/context/AccountContext";
import Notice from "@/components/Notice";

type Props = {
  onFinish?: (episode?: Episode, identity?: Profile | Series) => void;
};

const ShortPublishCard = ({ onFinish }: Props) => {
  const [content, setContent] = React.useState("");
  const [files, setFiles] = useFilePutter();

  const { profiles } = useContext(AccountContext);
  const [identity, setIdentity] = useState<Profile | Series | undefined>(
    profiles?.[0]
  );
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [status, setStatus] = useState<AlertColor>("success");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    !identity && setIdentity(profiles?.[0]);
  }, [profiles]);
  const submit = () => {
    if (files.find((file) => file.fileStatus === "uploading")) {
      setNoticeOpen(true);
      setNoticeMessage(
        "Please wait for all files to finish uploading, or cancel them."
      );
      setStatus("warning");
      return;
    }
    setSubmitting(true);
    APICreateEpisode({
      content,
      files: files
        .filter((file) => file.fileStatus === "uploaded")
        .map((file) => ({
          id: file.fileInfo?.id,
          nsfw: false,
          mime: file.fileInfo?.mime,
        })),
      seriesId: identity?.valueType === "series" ? identity.id : undefined,
      profileId:
        identity?.valueType === "series"
          ? (identity as Series).profile.id
          : identity?.id,
    })
      .then(({ data }) => {
        log.info(data);
        setNoticeOpen(true);
        setNoticeMessage("published!");
        setStatus("success");
        setTimeout(() => {
          onFinish?.(data, identity);
        }, 1000);
      })
      .catch((e) => {
        log.error(e);
        setNoticeOpen(true);
        setNoticeMessage(e.response?.data?.message ?? e.message);
        setStatus("error");
        setSubmitting(false);
      });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Stack spacing={2}>
          <DefaultProfileSeriesSwitcher
            onChange={setIdentity}
            selected={identity}
          />
          <Content content={content} onChange={setContent} />
          <Box>
            <FilePutter files={files} onChange={setFiles} />
            <Typography variant="body2" color="text.secondary">
              *all the images will be published.
            </Typography>
          </Box>
          <LoadingButton
            loading={submitting}
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
          >
            go
          </LoadingButton>
        </Stack>
      </form>
      <Notice
        open={noticeOpen}
        message={noticeMessage}
        type={status}
        onClose={() => setNoticeOpen(false)}
      />
    </>
  );
};

export default ShortPublishCard;
