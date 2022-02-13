import React, { useContext, useEffect } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import AccountContext from "@/context/AccountContext";
import { APIAllMySeries, APICreateSeries } from "@/api/Series";
import { SeriesInfo } from "@/types";

const CreateSeriesPage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [series, setSeries] = React.useState<SeriesInfo[]>();
  const { currentProfile } = useContext(AccountContext);

  useEffect(() => {
    APIAllMySeries().then(({ data }) => {
      setSeries(data);
      console.log(data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentProfile) return;
    if (!series) return;
    APICreateSeries({
      title: title,
      content: content,
      profileID: currentProfile.id,
    }).then(({ data }) => {
      setSeries([...series, data]);
      console.log(data);
    });
    console.log(title, content);
  };

  if (!currentProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={8}>
          <ProfileSwitcher />
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="Series Name"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              multiline
              variant="filled"
              label="series description"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit">create</Button>
          </form>
        </Grid>
        <Grid item xs={4}>
          {series?.map((s) => (
            <div key={s.id}>
              <h3>{s.title}</h3>
              <p>{s.content}</p>
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreateSeriesPage;
