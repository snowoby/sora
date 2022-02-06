import React, { ReactNode } from "react";
import Dropzone, { DropzoneProps, DropzoneRef } from "react-dropzone";

const FileUploader = ({
  children,
  ...otherProps
}: { children?: ReactNode } & Omit<DropzoneProps, "children"> &
  React.RefAttributes<DropzoneRef>) => {
  return (
    <Dropzone {...otherProps}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            {children}
            <input {...getInputProps()} />
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;
