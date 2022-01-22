import React, { ChangeEvent, useContext, useState } from "react";
import AccountContext from "@/context/AccountContext";
import { AccountPageProps, Profile, ProfileCreate } from "@/types";
import { Button, Input, TextField } from "@mui/material";
import Immutable from "immutable";
import { APICreateProfile } from "@/api/ProfileAPI";
import log from "@/log";

const AccountPage = () => {
  const { accountInfo } = useContext(AccountContext);

  return (
    <>
      <div>email:{accountInfo?.account.email}</div>
      <div>
        {accountInfo?.profiles.map((profile) => (
          <div key={profile.id}>{profile.id}</div>
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
      {["title", "callSign", "category"].map((fieldName) => (
        <TextField
          key={fieldName}
          fullWidth
          label={fieldName}
          name={fieldName}
          required
          onChange={handleChange}
        />
      ))}

      <Button fullWidth type="submit">
        Go
      </Button>
    </form>
  );
};

export default AccountPage;
