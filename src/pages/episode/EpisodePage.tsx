import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { APIGetEpisode } from "@/api/Episode";
import { Episode, Profile, Comment } from "@/types";
import log from "@/log";
import BackTitleBar from "@/components/BackTitleBar";
import ShortEpisodeCard from "@/components/ShortEpisodeCard";
import TitleBarFrame from "../frame/TitleBarFrame";
import MarkdownEditor from "@/components/publish/MarkdownEditor";
import ProfileSeriesSwitcher from "@/components/ProfileSeriesSwitcher";
import AccountContext from "@/context/AccountContext";
import ProfileCard from "@/components/profile";
import { APICreateComment, APIGetAllCommentOfOneEpisode } from "@/api/Comment";
import CommentCard from "@/components/CommentCard";
import MiddleFrame from "../frame/MiddleFrame";
import useMediaQuery from "@mui/material/useMediaQuery";

const EpisodePage = () => {
  let { id } = useParams();
  const [episode, setEpisode] = useState<Episode>();
  const location = useLocation();
  const [commentOpen, setCommentOpen] = useState(location.hash === "#comments");
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<string>();
  const { profiles } = useContext(AccountContext);
  const [commentAuthor, setCommentAuthor] = useState<Profile | undefined>(
    profiles?.[0]
  );

  const [commentList, setCommentList] = useState<Comment[]>();

  useEffect(() => {
    if (!commentAuthor) setCommentAuthor(profiles?.[0]);
  }, [profiles]);

  useEffect(() => {
    if (!id) return;
    if (commentList) return;
    APIGetAllCommentOfOneEpisode(id).then(({ data }) => {
      setCommentList(data);
    });
  }, [commentOpen]);
  const largeThanSm = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  log.info(largeThanSm);
  useEffect(() => {
    if (!id) return;
    APIGetEpisode(id)
      .then(({ data }) => setEpisode(data))
      .catch((e) => log.error(e));
  }, [id]);

  if (!episode)
    return (
      <Container>
        <LinearProgress />
      </Container>
    );

  const commentArea = () => {
    return (
      <Box>
        <Divider>
          <Typography sx={{ color: "divider" }}>comments</Typography>
        </Divider>
        <Box>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!commentAuthor) return;
              APICreateComment(episode.id, {
                from: commentAuthor.id,
                content: comment,
                replyTo: replyTo,
              })
                .then(({ data }) => {
                  setComment("");
                  setCommentList((prev) => {
                    if (!prev) return [data];
                    return [data, ...prev];
                  });
                })
                .catch((e) => log.error(e));
            }}
          >
            <Box
              display={{ xs: "block", md: "grid" }}
              gridTemplateColumns="auto 1fr auto"
              gap={1}
            >
              <ProfileSeriesSwitcher
                selected={commentAuthor}
                profileOptions={profiles ?? []}
                seriesOptions={[]}
                onChange={(selected) => setCommentAuthor(selected as Profile)}
                freeWidth={largeThanSm}
                renderButton={(selected) => (
                  <>
                    <Box
                      height="3rem"
                      width="3rem"
                      display={{ xs: "none", md: "block" }}
                    >
                      <ProfileCard
                        profile={selected as Profile}
                        size="avatar"
                      />
                    </Box>
                    <Box display={{ xs: "block", md: "none" }}>
                      <ProfileCard profile={selected as Profile} size="lite" />
                    </Box>
                  </>
                )}
              />

              <MarkdownEditor
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Box alignSelf="end" mt="1rem" textAlign="end">
                <Button type="submit">Publish</Button>
              </Box>
            </Box>
          </form>
          <Box mt="1rem">
            <Divider />
          </Box>
        </Box>
      </Box>
    );
  };

  const comments = () => {
    return (
      <Box>
        {commentList?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            marginBottom={2}
            onClick={() => setReplyTo(comment.id)}
          />
        ))}
      </Box>
    );
  };
  const titleBar = () => (
    <BackTitleBar>{episode.title ?? "details"}</BackTitleBar>
  );

  return (
    <MiddleFrame
      title={titleBar()}
      center={
        <>
          <ShortEpisodeCard episode={episode} fullImage={true} />
          <Box mx="1rem" mb="1rem">
            {profiles?.length && commentArea()}
          </Box>
          <Box mx="1rem">{comments()}</Box>
        </>
      }
    />
  );
};

export default EpisodePage;
