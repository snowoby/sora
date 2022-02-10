import React, { useEffect, useRef, useState } from "react";
import { StorageExists, StorageUrl } from "@/api/Storage";
import log from "@/log";
import urlcat from "urlcat";
import { CircularProgress } from "@mui/material";

const SourceImage = ({
  source,
  children,
  ...props
}: React.HTMLAttributes<HTMLPictureElement> & { source: string }) => {
  return (
    <picture {...props}>
      {children}
      <source srcSet={StorageUrl(source, "compressed")} />
      <source srcSet={StorageUrl(source, "original")} />
    </picture>
  );
};

export default SourceImage;
