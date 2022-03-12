import React from "react";
import { Slide, Snackbar, Alert, AlertColor } from "@mui/material";

type NoticeProps = {
  open: boolean;
  message: string;
  type?: AlertColor;
  onClose: () => void;
};
const slide = (props: any) => <Slide direction="up" {...props} />;

const Notice = (props: NoticeProps) => {
  return (
    <Snackbar
      TransitionComponent={slide}
      open={props.open}
      autoHideDuration={3000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={1}
    >
      <Alert
        onClose={props.onClose}
        severity={props.type}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Notice;
