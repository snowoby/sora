import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import AccountContext from "@/context/AccountContext";
import { APIAllMySeries, APICreateSeries, APIUpdateSeries } from "@/api/Series";
import { SeriesData, Series } from "@/types";
import log from "@/log";
import BackTitleBar from "@/components/BackTitleBar";
import MainFrame from "../frame/MainFrame";
import RoundedButton from "@/components/RoundedButton";
// const GroupButton = ({
//   onClick,
//   active,
//   children,
// }: {
//   onClick: () => void;
//   active: boolean;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <div>
//       <Button
//         onClick={onClick}
//         sx={[
//           {
//             color: "text.primary",
//             textTransform: "none",
//             justifyContent: "flex-start",
//           },
//           active && {
//             backgroundColor: "action.hover",
//           },
//         ]}
//         fullWidth
//       >
//         <Typography variant="subtitle1">{children}</Typography>
//       </Button>
//     </div>
//   );
// };

const CreateSeriesPage = () => {
  const emptySeries = {
    id: null,
    title: "",
    type: "",
    profileID: "",
  };
  // const [seriesList, setSeriesList] = React.useState<Series[]>();
  const [seriesEdit, setSeriesEdit] = React.useState<SeriesData>(emptySeries);
  const { profiles, series, updateAccount } = useContext(AccountContext);

  // const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    updateAccount();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!seriesEdit.id) {
      APICreateSeries(seriesEdit).then(updateAccount).catch(log.error);
    } else {
      APIUpdateSeries(seriesEdit.id, seriesEdit)
        .then(updateAccount)
        .catch(log.error);
    }
  };

  if (!profiles) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }
  const renderSeriesList = () => (
    <Box>
      <RoundedButton
        onClick={() => {
          setSeriesEdit(emptySeries);
        }}
        activated={!seriesEdit.id}
        fullWidth
      >
        !New
      </RoundedButton>
      {series?.map((s, index) => (
        <RoundedButton
          key={index}
          onClick={() => {
            setSeriesEdit({
              id: s.id,
              title: s.title,
              type: s.type,
              profileID: s.profile.id,
            });
          }}
          activated={seriesEdit.id === s.id}
          fullWidth
        >
          {s.title}
        </RoundedButton>
      ))}
    </Box>
  );

  const renderSeriesEdit = () => (
    <Box>
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
    </Box>
  );
  return (
    <MainFrame
      title={<BackTitleBar>series</BackTitleBar>}
      left={renderSeriesList()}
      center={renderSeriesEdit()}
    />
  );
};

export default CreateSeriesPage;
