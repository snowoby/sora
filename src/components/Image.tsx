import React, { useEffect, useRef, useState } from "react";
import { StorageExists, StorageUrl } from "@/api/Storage";
import log from "@/log";
import urlcat from "urlcat";
import { CircularProgress } from "@mui/material";

const SourceImage = ({
  source,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { source: string }) => {
  const errorCount = useRef(0);
  const timeoutID = useRef<any>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    clearInterval(timeoutID.current);
    errorCount.current = 0;
  }, [source]);

  return (
    <img
      ref={imgRef}
      src={StorageUrl(source, "compressed")}
      onError={(e) => {
        timeoutID.current = setTimeout(() => {
          if (!imgRef.current) return;
          imgRef.current.src = urlcat(imgRef.current.src, {
            date: new Date(),
          });
          errorCount.current += 1;
        }, 1000 * Math.pow(1.5, errorCount.current));
      }}
      {...props}
    />
  );
};

export default SourceImage;
