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
  onDelete?: (episode: Episode) => void;
  onMediaClick?: (e: any, file: FileInfo) => void;
  hideAction?: boolean;
  fullImage?: boolean;
  leftAction?: React.ReactNode | React.ReactNode[];
  rightAction?: React.ReactNode | React.ReactNode[];
}
const ShortEpisodeCard = ({
  episode,
  hideAction,
  fullImage,
  onDelete,
  onMediaClick,
  leftAction,
  rightAction,
}: Props) => {
  const actionArea = () => (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      px={2}
    >
      <Box
        display="flex"
        flexDirection="row"
        mb={1}
        gap={1}
        justifyContent="flex-start"
      >
        {leftAction}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        mb={1}
        gap={1}
        justifyContent="flex-end"
      >
        {rightAction}
      </Box>
    </Box>
  );

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
      {!!episode.files?.length && (
        <Box
          m={2}
          overflow="hidden"
          sx={{
            borderRadius: "0.5rem",
            borderColor: "divider",
            borderWidth: "0.5px",
            borderStyle: "solid",
          }}
        >
          <ImageTiles
            files={episode.files}
            fullImage={fullImage}
            onClick={onMediaClick}
          />
        </Box>
      )}
      {actionArea()}
    </>
  );
};

export default ShortEpisodeCard;

const ImageTiles = ({
  files,
  fullImage,
  onClick,
}: {
  files?: FileInfo[];
  fullImage?: boolean;
  onClick?: (e: any, file: FileInfo) => void;
}) => {
  const count = files?.length || 0;
  if (!count) return null;
  const colSize = Math.ceil(Math.sqrt(count));
  const rowSize = Math.ceil(count / colSize);

  const multipleImage = () => {
    return files?.map((file: FileInfo) => (
      <img
        key={file.id}
        src={StorageUrl(file.path, file.id, "thumbnail")}
        alt={file.filename}
        style={{
          display: "block",
          width: "100%",
          aspectRatio: !fullImage ? "1" : "auto",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    ));
  };

  const singleImage = () => {
    const file = files?.[0];
    if (!file) return null;
    return [
      <img
        key={file.id}
        src={StorageUrl(file.path, file.id, "thumbnail")}
        alt={file.filename}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "1024px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />,
    ];
  };

  return (
    <>
      <Box
        sx={[
          !fullImage && {
            display: "grid",
            gridTemplateColumns: Array(colSize).fill(`1fr`).join(" "),
            gridTemplateRows: Array(rowSize).fill(`auto`).join(" "),
            gap: 0.25,
          },
        ]}
      >
        {(files?.length === 1 ? singleImage() : multipleImage())?.map(
          (img, index) => (
            <Box
              key={index}
              onClick={(e) => {
                onClick?.(e, files?.[index] as FileInfo);
              }}
            >
              {img}
            </Box>
          )
        )}
      </Box>
    </>
  );
};
