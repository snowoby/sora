import React, { ChangeEvent, useState } from "react";
import { Button, Card, Input, Stack, TextField } from "@mui/material";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import { PublishCardProps } from "@/types";
import { FilePush } from "@/api/FileUpload";

const PublishCard = ({ profileID, afterSubmit }: PublishCardProps) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  return (
    <Card>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          APICreateEpisode(profileID, form)
            .then(({ data }) => {
              afterSubmit?.(data);
              log.info(e);
            })
            .catch((e) => log.error(e));
        }}
      >
        <Stack spacing={2}>
          <TextField
            variant="filled"
            fullWidth
            label="title"
            name="title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            multiline
            variant="filled"
            minRows={5}
            fullWidth
            label="content"
            name="content"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <Input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const a = e.target.files?.[0];
              if (a)
                FilePush(profileID, "dev", a)
                  .then((response) => log.info(response))
                  .catch((e) => log.error(e));
            }}
          />
          <Button fullWidth type="submit">
            publish
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default PublishCard;
