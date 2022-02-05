import React, { ChangeEvent, useState } from "react";
import { Button, Card, Input, Stack, TextField } from "@mui/material";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import { FileInfo, PublishCardProps } from "@/types";
import { FilePush } from "@/api/FileUpload";
import ProfileSwitcher from "@/components/ProfileSwitcher";

const PublishCard = ({ profileID, afterSubmit }: PublishCardProps) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [images, setImages] = useState<FileInfo[]>([]);
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
          <div>
            <ProfileSwitcher />
          </div>
          <Input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file)
                FilePush("dev", file)
                  .then(({ data }) => {
                    setImages([...images, data]);
                  })
                  .catch((e) => log.error(e));
            }}
          />
          <Button fullWidth type="submit">
            publish
          </Button>
          {JSON.stringify(images)}
          {images.map((file) => (
            <img
              key={file.id}
              src={`http://127.0.0.1:9000/develop/dev/${file.id}/small`}
              onError={(e) => {
                log.error(e);
                e.currentTarget.src = `http://127.0.0.1:9000/develop/dev/${file.id}/original`;
              }}
            />
          ))}
        </Stack>
      </form>
    </Card>
  );
};

export default PublishCard;
