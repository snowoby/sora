import React, { useEffect, useRef, useState } from "react";
import { StorageUrl } from "@/api/Storage";
import log from "@/log";
import urlcat from "urlcat";

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
    return () => {
      clearInterval(timeoutID.current);
    };
  }, [source]);

  return (
    <img
      ref={imgRef}
      src={StorageUrl("file", source, "compressed")}
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
