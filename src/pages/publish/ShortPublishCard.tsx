import React, { useContext, useState } from "react";
import FilePutter from "@/components/FilePutter";
import { Episode, FileInfo, Profile, Series } from "@/types";
import Content from "./Content";
import DefaultProfileSeriesSwitcher from "@/components/DefaultProfileSeriesSwitcher";
import { Box, Button, Stack, Typography } from "@mui/material";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import { LoadingButton } from "@mui/lab";
import AccountContext from "@/context/AccountContext";

type Props = {
  onFinish?: (episode: Episode | null) => void;
};

const ShortPublishCard = ({ onFinish }: Props) => {
  const [content, setContent] = React.useState("");
  const [files, setFiles] = React.useState<FileInfo[]>([]);
  const { profiles } = useContext(AccountContext);
  const [identity, setIdentity] = useState<Profile | Series | undefined>(
    profiles?.[0]
  );
  const [submitting, setSubmitting] = useState(false);
  const submit = () => {
    setSubmitting(true);
    APICreateEpisode({
      content,
      files: files.map((file) => ({
        id: file.id,
        nsfw: false,
        mime: file.mime,
      })),
      seriesId: identity?.valueType === "series" ? identity.id : undefined,
      profileId:
        identity?.valueType === "series"
          ? (identity as Series).profile.id
          : identity?.id,
    })
      .then(({ data }) => {
        log.info(data);
        onFinish?.(data);
      })
      .catch((e) => log.error(e))
      .finally(() => setSubmitting(false));
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
              *all image will be published.
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
    </>
  );
};

export default ShortPublishCard;
