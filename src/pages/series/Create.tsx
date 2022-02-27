import React, { useContext, useEffect } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import AccountContext from "@/context/AccountContext";
import { APIAllMySeries, APICreateSeries, APIUpdateSeries } from "@/api/Series";
import { SeriesData, Series } from "@/types";
import log from "@/log";
import BackTitleBar from "@/components/BackTitleBar";
const GroupButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <Button
        onClick={onClick}
        sx={[
          {
            color: "text.primary",
            textTransform: "none",
            justifyContent: "flex-start",
          },
          active && {
            backgroundColor: "action.hover",
          },
        ]}
        fullWidth
      >
        <Typography variant="subtitle1">{children}</Typography>
      </Button>
    </div>
  );
};

const CreateSeriesPage = () => {
  const emptySeries = {
    id: null,
    title: "",
    type: "",
    profileID: "",
  };
  const [seriesList, setSeriesList] = React.useState<Series[]>();
  const [seriesEdit, setSeriesEdit] = React.useState<SeriesData>(emptySeries);
  const { profiles } = useContext(AccountContext);

  // const [profile, setProfile] = useState<Profile>();

  const getSeriesList = () =>
    APIAllMySeries().then(({ data }) => setSeriesList(data));

  useEffect(() => {
    getSeriesList();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!seriesEdit.id) {
      APICreateSeries(seriesEdit).then(getSeriesList).catch(log.error);
    } else {
      APIUpdateSeries(seriesEdit.id, seriesEdit)
        .then(getSeriesList)
        .catch(log.error);
    }
  };

  if (!profiles) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={4}>
          <BackTitleBar />
          <GroupButton
            onClick={() => {
              setSeriesEdit(emptySeries);
            }}
            active={!seriesEdit.id}
          >
            !New
          </GroupButton>
          {seriesList?.map((series, index) => (
            <GroupButton
              key={index}
              onClick={() => {
                setSeriesEdit({
                  id: series.id,
                  title: series.title,
                  type: series.type,
                  profileID: series.profile.id,
                });
              }}
              active={seriesEdit.id === series.id}
            >
              {series.title}
            </GroupButton>
          ))}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">Owner</Typography>
          {profiles && (
            <ProfileSwitcher
              profiles={profiles}
              disabled={!!seriesEdit.id}
              selected={profiles.find((p) => p.id === seriesEdit.profileID)}
              onChange={(profile) => {
                setSeriesEdit({
                  ...seriesEdit,
                  profileID: profile.id,
                });
              }}
            >
              select a profile
            </ProfileSwitcher>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              key={"title" + seriesEdit.id}
              variant="filled"
              label="title"
              fullWidth
              value={seriesEdit.title}
              onChange={(e) =>
                setSeriesEdit({ ...seriesEdit, title: e.target.value })
              }
            />
            <TextField
              key={"type" + seriesEdit.id}
              variant="filled"
              label="type"
              fullWidth
              value={seriesEdit?.type}
              onChange={(e) =>
                setSeriesEdit({ ...seriesEdit, type: e.target.value })
              }
            />
            <Button type="submit">create</Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateSeriesPage;
