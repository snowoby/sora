import React, { ChangeEvent, useContext, useState } from "react";
import AccountContext from "@/context/AccountContext";
import { ProfileCreate } from "@/types";
import { Button, Stack, TextField } from "@mui/material";
import { APICreateProfile } from "@/api/ProfileAPI";
import log from "@/log";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
  const { accountInfo } = useContext(AccountContext);

  if (!accountInfo) return <Navigate to="/account/login" replace />;
  return (
    <>
      <div>email:{accountInfo.account.email}</div>
      <div>
        {accountInfo?.profiles.map((profile) => (
          <div key={profile.id}>
            <span>{profile.id} </span>
            <span>{profile.title} </span>
            <span>{profile.callSign}</span>
          </div>
        ))}
      </div>

      <div>
        <ProfileCreateForm />
      </div>
    </>
  );
};

const ProfileCreateForm = () => {
  const { updateAccountInfo } = useContext(AccountContext);
  const emptyForm: ProfileCreate = {
    callSign: "",
    title: "",
    category: "",
  };
  const [createProfile, setCreateProfile] = useState<ProfileCreate>(emptyForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCreateProfile({
      ...createProfile,
      [e.target.name]: e.target.value,
    });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await APICreateProfile(createProfile);
          await updateAccountInfo();
          setCreateProfile(emptyForm);
        } catch (e) {
          log.error(e);
        }
      }}
    >
      <Stack spacing={3}>
        {["title", "callSign", "category"].map((fieldName) => (
          <TextField
            key={fieldName}
            fullWidth
            label={fieldName}
            name={fieldName}
            required
            variant="filled"
            onChange={handleChange}
          />
        ))}
        <Button fullWidth type="submit" variant="contained">
          Go
        </Button>
      </Stack>
    </form>
  );
};

export default AccountPage;
