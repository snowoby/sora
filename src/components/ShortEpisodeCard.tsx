import React from "react";
import { Episode, FileInfo } from "@/types";
import PublisherCard from "@/components/PublisherCard";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MarkdownViewer from "@/components/publish/MarkdownViewer";
import { StorageUrl } from "@/api/Storage";
dayjs.extend(relativeTime);

interface Props {
  episode: Episode;
}
const ShortEpisodeCard = ({ episode }: Props) => {
  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr auto"
        alignItems="center"
        m={2}
      >
        <PublisherCard series={episode.series} profile={episode.profile} />
        <div />

        <Typography variant="body2" color="text.secondary">
          {dayjs(episode.create_time).fromNow()}
        </Typography>
      </Box>
      <Box m={2}>
        {episode.title && (
          <Typography variant="subtitle1" color="textPrimary">
            {episode.title}
          </Typography>
        )}
        <MarkdownViewer skipImage={true}>{episode.content}</MarkdownViewer>
      </Box>
      <Box
        m={2}
        overflow="hidden"
        sx={{
          borderRadius: "0.5rem",
          borderColor: "palette.divider",
          borderWidth: "0.5px",
          borderStyle: "solid",
        }}
      >
        <ImageTiles files={episode.files} />
      </Box>
    </>
  );
};

export default ShortEpisodeCard;

const ImageTiles = ({ files }: { files?: FileInfo[] }) => {
  const count = files?.length || 0;
  if (!count) return null;
  const colSize = Math.ceil(Math.sqrt(count));
  const rowSize = Math.ceil(count / colSize);
  return (
    <Box
      display="grid"
      sx={{
        gridTemplateColumns: Array(colSize).fill(`1fr`).join(" "),
        gridTemplateRows: Array(rowSize).fill(`auto`).join(" "),
        gap: 0.25,
      }}
    >
      {files?.map((file: FileInfo) => (
        <img
          key={file.id}
          src={StorageUrl(file.id, file.path, "thumbnail")}
          alt={file.filename}
          style={{
            width: "100%",
            aspectRatio: "1",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ))}
    </Box>
  );
};
