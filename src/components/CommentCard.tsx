import React from "react";
import { Comment } from "@/types";
import { Box, BoxProps, Chip, Typography } from "@mui/material";
import ProfileCard from "./profile";

type Props = {
  comment: Comment;
} & BoxProps;

const CommentCard = ({ comment, ...props }: Props) => {
  return (
    <Box {...props}>
      <Box display="grid" gap={1} gridTemplateColumns="auto 1fr">
        <Box width="2rem" height="2rem">
          <ProfileCard profile={comment.author} size="avatar" />
        </Box>
        <Typography>
          <Chip
            label={comment.author.title}
            sx={{ mr: "0.25rem", height: "1.5rem" }}
            component="span"
          />
          {comment.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentCard;
