import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ShortPublishCard from "@/pages/publish/ShortPublishCard";
import { Episode, Profile, Series } from "@/types";

type Props = {
  open: boolean;
  onClose: (episode?: Episode, identity?: Series | Profile) => void;
};

const ShortModal = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
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
