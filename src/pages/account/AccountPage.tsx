import React, { ChangeEvent, useContext, useRef, useState } from "react";
import AccountContext from "@/context/AccountContext";
import { Profile, ProfileCreate } from "@/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import MainFrame from "@/pages/frame/MainFrame";
import ProfileCard from "@/components/profile";
import AvatarWrap from "@/components/AvatarWrap";
import { APICreateProfile, APIUpdateProfile } from "@/api/ProfileAPI";
import { FilePush } from "@/api/FileUpload";
import log from "@/log";
import ReactCrop, { Crop } from "react-image-crop";
import PromiseFileReader from "promise-file-reader";
import "react-image-crop/src/ReactCrop.scss";
import { Logout } from "@/utils/utils";

const AccountPage = () => {
  const { account, profiles, updateAccount } = useContext(AccountContext);
  const emptyForm: ProfileCreate = {
    call: "",
    title: "",
    category: "",
    avatar: "",
  };
  const [open, setOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement>();
  const [editProfile, setEditProfile] = useState<ProfileCreate>(emptyForm);
  const navigate = useNavigate();
  const reset = () => {
    setSelectedProfile(undefined);
    setEditProfile({ ...emptyForm });
  };
  const [crop, setCrop] = useState<Crop>({
    height: 0,
    x: 0,
    y: 0,
    aspect: 1,
    width: 100,
    unit: "%",
  });

  const [completedCrop, setCompletedCrop] = useState<Crop>({
    height: 0,
    x: 0,
    y: 0,
    aspect: 1,
    width: 100,
    unit: "%",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditProfile({
      ...editProfile,
      [e.target.name]: e.target.value,
    });

  const keys: ("title" | "call" | "category")[] = ["title", "call", "category"];

  const submit = async () => {
    try {
      if (selectedProfile)
        await APIUpdateProfile(selectedProfile.id, editProfile);
      else await APICreateProfile(editProfile);
      await updateAccount();
      setEditProfile(emptyForm);
    } catch (e) {
      log.error(e);
    }
  };
  const closeEdit = () => setOpen(false);
  const closeCrop = () => setCropOpen(false);
  const OKCrop = () => {
    previewCanvasRef.current?.toBlob(
      (blob) => {
        if (!blob) return;
        FilePush("avatar", blob)
          .then(({ data }) =>
            setEditProfile({
              ...editProfile,
              avatar: data.id,
            })
          )
          .catch((e) => log.error(e));
      },
      "image/png",
      1
    );
  };
  // const uploadAvatar = () =>
  //   FilePush("avatar").then(({ data }) =>
  //     setEditProfile({
  //       ...editProfile,
  //       avatar: `${data.path}/${data.id}`,
  //     })
  //   );
  if (!account || !profiles) return <Navigate to="/account/login" replace />;

  const cropDialog = (
    <Dialog open={cropOpen} onClose={closeCrop}>
      <DialogTitle>crop</DialogTitle>
      <DialogContent>
        <ReactCrop
          src={avatar}
          crop={crop}
          onImageLoaded={setImg}
          onComplete={setCompletedCrop}
          onChange={(newCrop) => {
            setCrop(newCrop);
            const canvas = previewCanvasRef.current;
            if (!canvas || !img) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const pixelRatio = window.devicePixelRatio;
            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;
            canvas.width = crop.width * pixelRatio * scaleX;
            canvas.height = crop.height * pixelRatio * scaleY;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(
              img,
              crop.x * scaleX,
              crop.y * scaleY,
              crop.width * scaleX,
              crop.height * scaleY,
              0,
              0,
              crop.width * scaleX,
              crop.height * scaleY
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCrop}>Cancel</Button>
        <Button
          onClick={() => {
            OKCrop();
            closeCrop();
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  const editDialog = (
    <Dialog open={open} onClose={closeEdit}>
      <DialogTitle>{selectedProfile ? "edit" : "create"}</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit().then(reset);
          }}
        >
          <Stack spacing={3}>
            {selectedProfile && (
              <Grid container justifyContent="center">
                <AvatarWrap
                  sx={{ width: "6rem", height: "6rem", textAlign: "center" }}
                  source={editProfile.avatar}
                />
              </Grid>
            )}
            {selectedProfile && (
              <Button variant="contained" component="label">
                update avatar
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target?.files?.[0];
                    if (!file) return;
                    PromiseFileReader.readAsDataURL(file)
                      .then((data) => setAvatar(data))
                      .catch((err) => console.error(err))
                      .then(() => setCropOpen(true));
                  }}
                />
              </Button>
            )}

            {keys.map((fieldName) => (
              <TextField
                key={fieldName}
                fullWidth
                label={fieldName}
                name={fieldName}
                value={editProfile[fieldName]}
                required
                variant="filled"
                onChange={handleChange}
              />
            ))}
          </Stack>
          <input
            hidden={true}
            name="avatar"
            value={editProfile["avatar"] ?? ""}
            readOnly
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEdit}>Cancel</Button>
        <Button onClick={() => submit().then(closeEdit)}>OK</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <MainFrame>
      <div>email:{account.email}</div>
      <Grid container spacing={2}>
        {profiles.map((profile) => (
          <Grid key={profile.id} item xs={12} md={6} lg={4}>
            <Button
              onClick={() => setSelectedProfile(profile)}
              sx={[
                {
                  padding: "1rem",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  color: "text.primary",
                  textTransform: "none",
                  justifyContent: "flex-start",
                },
                selectedProfile?.id === profile.id && {
                  backgroundColor: "action.hover",
                },
              ]}
              fullWidth
            >
              <ProfileCard profile={profile} />
            </Button>
          </Grid>
        ))}
      </Grid>

      <Button
        onClick={() => {
          selectedProfile && setEditProfile(selectedProfile);
          setOpen(true);
        }}
        disabled={!selectedProfile}
      >
        edit
      </Button>
      <Button
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        new profile
      </Button>
      {editDialog}
      {cropDialog}
      <canvas
        hidden={true}
        ref={previewCanvasRef}
        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
        style={{
          width: Math.round(completedCrop?.width ?? 0),
          height: Math.round(completedCrop?.height ?? 0),
        }}
      />
      <Button
        color="error"
        onClick={() => {
          Logout();
          window.location.pathname = "/";
        }}
      >
        logout
      </Button>
    </MainFrame>
  );
};

export default AccountPage;
