import React, { useState } from "react";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import MarkdownViewer from "@/components/publish/MarkdownViewer";

const MarkdownEditor = (props: TextFieldProps) => {
  const [tabIndex, setTabIndex] = useState<string>("edit");

  const handleChange = (_: React.SyntheticEvent, value: any) => {
    setTabIndex(value);
  };
  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          sx={{ backgroundColor: "background.paper" }}
        >
          <Tab label="edit" value="edit" />
          <Tab label="preview" value="preview" />
        </Tabs>
      </Box>
      <Box hidden={tabIndex != "edit"} minHeight="10rem">
        <TextField {...props} />
      </Box>
      <Box
        hidden={tabIndex != "preview"}
        sx={[
          {
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "auto",
            },
          },
        ]}
        minHeight="10rem"
      >
        <MarkdownViewer>{props.value as string}</MarkdownViewer>
      </Box>
    </div>
  );
};

export default MarkdownEditor;
