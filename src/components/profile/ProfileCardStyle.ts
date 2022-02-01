import { makeStyles } from "@material-ui/styles";

const ProfileCardStyle = makeStyles({
  layout: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    textAlign: "left",
    gap: "0.75rem",
  },
  avatar: {
    height: "4rem",
    width: "4rem",
  },
  avatarSmall: {
    height: "3rem",
    width: "3rem",
  },
  name: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default ProfileCardStyle;
