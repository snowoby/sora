import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { AvatarWrapProps } from "@/types";
import { StorageUrl } from "@/api/Storage";

const AvatarWrap = ({ source, sx, ...props }: AvatarWrapProps) => {
  const url = (identifier: "original" | "compressed") =>
    source && StorageUrl(source, identifier);

  return (
    <Avatar sx={sx} src={url("compressed")} {...props}>
      <Avatar sx={sx} src={url("original")} />
    </Avatar>
  );
};

export default AvatarWrap;