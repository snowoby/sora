import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
  useState,
} from "react";
import AccountContext from "@/context/AccountContext";
import { Profile, ProfileCreate } from "@/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import MainFrame from "@/pages/frame/MainFrame";
import ProfileCard from "@/components/profile";
import AvatarWrap from "@/components/AvatarWrap";
import { APICreateProfile } from "@/api/ProfileAPI";
import log from "@/log";
import { FilePush } from "@/api/FileUpload";

const AccountPage = () => {
  const { accountInfo, updateAccountInfo } = useContext(AccountContext);
  const emptyForm: ProfileCreate = {
    call: "",
    title: "",
    category: "",
    avatar: "",
  };
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();

  const [createProfile, setCreateProfile] = useState<ProfileCreate>(emptyForm);
  const reset = () => {
    setOpen(false);
    setCreateProfile({ ...emptyForm });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCreateProfile({
      ...createProfile,
      [e.target.name]: e.target.value,
    });

  const keys: ("title" | "call" | "category" | "avatar")[] = [
    "title",
    "call",
    "category",
    "avatar",
  ];

  const submit = async () => {
    try {
      await APICreateProfile(createProfile);
      await updateAccountInfo();
      setCreateProfile(emptyForm);
    } catch (e) {
      log.error(e);
    }
  };

  if (!accountInfo) return <Navigate to="/account/login" replace />;

  const editDialog = selectedProfile && (
    <Dialog open={open} onClose={reset}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit().then(reset);
          }}
        >
          <Stack spacing={3}>
            <AvatarWrap source={createProfile.avatar} />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                FilePush(selectedProfile.id, "avatar", file).then(({ data }) =>
                  setCreateProfile({
                    ...createProfile,
                    avatar: `${data.path}/${data.id}`,
                  })
                );
              }}
            ></input>
            {keys.map((fieldName) => (
              <TextField
                key={fieldName}
                hidden={fieldName === "avatar"}
                fullWidth
                label={fieldName}
                name={fieldName}
                value={createProfile[fieldName]}
                required
                variant="filled"
                onChange={handleChange}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={reset}>Cancel</Button>
        <Button onClick={() => submit().then(reset)}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <MainFrame>
      <div>email:{accountInfo.account.email}</div>
      <div>
        {accountInfo?.profiles.map((profile) => (
          <div key={profile.id}>
            <button
              onClick={() => {
                setSelectedProfile(profile);
                setOpen(true);
              }}
            >
              edit
            </button>
            <ProfileCard key={profile.id} profile={profile} />
          </div>
        ))}
      </div>
      {editDialog}
    </MainFrame>
  );
};

export default AccountPage;
