import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ShortPublishCard from "@/pages/publish/ShortPublishCard";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ShortModal = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>Quick</DialogTitle>
      <DialogContent>
        <ShortPublishCard onFinish={props.onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ShortModal;
