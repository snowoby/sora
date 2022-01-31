import React from "react";
import { Button, Card, TextField } from "@mui/material";

const PublishCard = () => {
  return (
    <Card>
      <form>
        <TextField variant="filled" fullWidth label="title" name="title" />
        <TextField
          multiline
          variant="filled"
          minRows={5}
          fullWidth
          label="content"
          name="content"
        />
        <Button>Publish</Button>
      </form>
    </Card>
  );
};

export default PublishCard;
