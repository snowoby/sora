import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { APICreateEpisode, APIGetEpisode } from "@/api/Episode";
import { Episode, Profile, Series, Comment } from "@/types";
import log from "@/log";
import BackTitleBar from "@/components/BackTitleBar";
import ShortEpisodeCard from "@/components/ShortEpisodeCard";
import TitleBarFrame from "../frame/TitleBarFrame";
import MarkdownEditor from "@/components/publish/MarkdownEditor";
import DefaultProfileSeriesSwitcher from "@/components/DefaultProfileSeriesSwitcher";
import ProfileSeriesSwitcher from "@/components/ProfileSeriesSwitcher";
import series from "@/components/series";
import AccountContext from "@/context/AccountContext";
import ProfileCard from "@/components/profile";
import { APICreateComment, APIGetAllCommentOfOneEpisode } from "@/api/Comment";
import CommentCard from "@/components/CommentCard";

const EpisodePage = () => {
  let { id } = useParams();
  const [episode, setEpisode] = useState<Episode>();
  const location = useLocation();
  const [commentOpen, setCommentOpen] = useState(location.hash === "#comments");
  const [comment, setComment] = useState("");
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

  useEffect(() => {
    if (!id) return;
    APIGetEpisode(id)
      .then(({ data }) => setEpisode(data))
      .catch((e) => log.error(e));
  }, [id]);

  if (!episode) return <Container>Loading...</Container>;

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
              })
                .then(() => {
                  setComment("");
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
          <CommentCard key={comment.id} comment={comment} marginBottom={2} />
        ))}
      </Box>
    );
  };

  return (
    <TitleBarFrame
      title={<BackTitleBar>{episode.title ?? "details"}</BackTitleBar>}
    >
      <Grid container>
        <Grid item xs />
        <Grid item xs={12} md={8}>
          <ShortEpisodeCard episode={episode} fullImage={true} />
          <Box mx="1rem" mb="1rem">
            {profiles?.length && commentArea()}
          </Box>
          <Box mx="1rem">{comments()}</Box>
        </Grid>
        <Grid item xs />
      </Grid>
    </TitleBarFrame>
  );
};

export default EpisodePage;
