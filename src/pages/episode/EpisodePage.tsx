import { Box, Card, CardContent, Container, Grid, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGetEpisode } from "@/api/Episode";
import { EpisodeInfo } from "@/types";
import log from "@/log";
import MarkdownViewer from "@/components/publish/MarkdownViewer";
import { ArrowBack } from "@mui/icons-material";
import ProfileCard from "@/components/profile";
import { useNavigate } from 'react-router-dom';

const EpisodePage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<EpisodeInfo>();

  useEffect(()=>{
    if (!id) return;
    APIGetEpisode(id).then(({data})=>setEpisode(data)).catch((e)=>log.error(e));
  },[id]);

  if (!episode) return <Container>Loading...</Container>;

  return <Container>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box>
          <h2><IconButton onClick={()=>navigate(-1)}><ArrowBack /></IconButton>{episode.title}</h2>

        </Box>
        <Paper>
            <MarkdownViewer>
              {episode.content}
            </MarkdownViewer>
        </Paper>

      </Grid>
      <Grid item xs={4}>
        <h2>Author</h2>
        <ProfileCard profile={episode.profile} />
      </Grid>
  </Grid>
  </Container>;
};

export default EpisodePage;
