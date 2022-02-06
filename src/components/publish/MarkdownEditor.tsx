import React from "react";
import { Grid, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import MarkdownViewer from "@/components/publish/MarkdownViewer";

const MarkdownEditor = (props: TextFieldProps) => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <TextField {...props} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MarkdownViewer>{props.value as string}</MarkdownViewer>
      </Grid>
    </Grid>
  );
};

export default MarkdownEditor;
