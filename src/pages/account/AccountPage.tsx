import React, { ChangeEvent, useContext, useRef, useState } from "react";
import AccountContext from "@/context/AccountContext";
import { FileUploadProps, Profile, ProfileCreate } from "@/types";
import {
  Avatar,
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
import { APICreateProfile, APIUpdateProfile } from "@/api/ProfileAPI";
import { FilePush } from "@/api/FileUpload";
import log from "@/log";
import ReactCrop, { Crop } from "react-image-crop";
import PromiseFileReader from "promise-file-reader";
import "react-image-crop/src/ReactCrop.scss";
import { Logout } from "@/utils/utils";
import { StorageUrl } from "@/api/Storage";
import UploadImage from "@/components/publish/UploadImage";
import { CreateFileUploadProfile } from "@/utils/file";
import Notice from "@/components/Notice";
import { LoadingButton } from "@mui/lab";
import RoundedButton from "@/components/RoundedButton";
import { Box } from "@mui/system";

const AccountPage = () => {
  const { account, profiles, updateAccount } = useContext(AccountContext);
  const emptyForm: ProfileCreate = {
    call: "",
    title: "",
    category: "",
    avatar: "",
  };
  const [cropOpen, setCropOpen] = useState(false);
  const [avatar, setAvatar] = useState<FileUploadProps | null>(null);
  const [cropAvatar, setCropAvatar] = useState("");
  const [edited, setEdited] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement>();
  const [editProfile, setEditProfile] = useState<ProfileCreate>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [noticeType, setNoticeType] = useState<"success" | "warning">(
    "success"
  );
  const reset = () => {
    setSubmitting(false);
    setSelectedProfile(undefined);
    setEditProfile({ ...emptyForm });
  };

  const defaultCrop: Crop = {
    height: 0,
    x: 0,
    y: 0,
    aspect: 1,
    width: 0,
    unit: "%",
  };
  const [crop, setCrop] = useState<Crop>(defaultCrop);

  const [completedCrop, setCompletedCrop] = useState<Crop>(defaultCrop);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditProfile({
      ...editProfile,
      [e.target.name]: e.target.value,
    });
    setEdited(true);
  };

  const keys: ("title" | "call" | "category")[] = ["title", "call", "category"];

  const submit = async () => {
    try {
      if (avatar?.fileStatus === "uploading") {
        setNoticeOpen(true);
        setNoticeMessage("please cancel upload before submition");
        setNoticeType("warning");
        return;
      }
      setSubmitting(true);
      if (selectedProfile)
        await APIUpdateProfile(selectedProfile.id, editProfile);
      else await APICreateProfile(editProfile);
      setEdited(false);
      await updateAccount();
    } catch (e) {
      log.error(e);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };
  const closeEdit = () => {
    if (avatar?.fileStatus === "uploading") {
      setNoticeOpen(true);
      setNoticeMessage("please cancel upload before closing");
      setNoticeType("warning");
      return;
    }
  };
  const closeCrop = () => setCropOpen(false);
  const OKCrop = () => {
    previewCanvasRef.current?.toBlob(
      async (blob) => {
        if (!blob) return;
        const fileUploadObj = await CreateFileUploadProfile(blob);
        setAvatar(fileUploadObj);
        FilePush(
          "avatar",
          blob,
          (status, percnet) => {
            setAvatar((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                uploadingStatus: status,
                progress: percnet,
              };
            });
          },
          fileUploadObj?.controller
        )
          .then(({ data }) => {
            setEditProfile({
              ...editProfile,
              avatar: data.id,
            });
            setAvatar((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                uploadingStatus: "uploaded",
                fileStatus: "uploaded",
              };
            });
            setEdited(true);
          })
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
          src={cropAvatar ?? ""}
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

  const edit = (
    <Box>
      {selectedProfile ? "edit" : "create"}
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit().then();
          }}
        >
          <Stack spacing={3}>
            {selectedProfile && (
              <Grid container justifyContent="center">
                <Avatar
                  sx={{ width: "6rem", height: "6rem", textAlign: "center" }}
                >
                  {!!avatar || !!selectedProfile.avatar ? (
                    <UploadImage
                      file={
                        avatar || {
                          uploadingStatus: "uploaded",
                          fileStatus: "uploaded",
                          dataUrl: StorageUrl(
                            "avatar",
                            selectedProfile.avatar,
                            "large"
                          ),
                        }
                      }
                      percentagePosition="center"
                    />
                  ) : null}
                </Avatar>
              </Grid>
            )}
            {selectedProfile && (
              <Button
                variant="contained"
                component="label"
                color={avatar?.fileStatus === "uploading" ? "error" : "primary"}
                onClick={(e: any) => {
                  if (avatar?.fileStatus === "uploading") {
                    e.preventDefault();
                    avatar.controller?.abort();
                    setAvatar(null);
                  }
                }}
              >
                {avatar?.fileStatus === "uploading"
                  ? "cancel"
                  : "update avatar"}
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setCrop(defaultCrop);
                    const file = e.target?.files?.[0];
                    if (!file) return;
                    PromiseFileReader.readAsDataURL(file)
                      .then((data) => setCropAvatar(data))
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
      </Box>
      <Box>
        <LoadingButton
          loading={submitting}
          disabled={submitting || !edited}
          onClick={() => submit().then(closeEdit)}
          color="warning"
          fullWidth
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );

  const profileList = () => (
    <Stack>
      {profiles.map((profile) => (
        <Grid key={profile.id} item>
          <RoundedButton
            activated={selectedProfile === profile}
            onClick={() => {
              setSelectedProfile(profile);
              setEditProfile(profile);
              setAvatar(null);
              setEdited(false);
            }}
            fullWidth
          >
            <ProfileCard profile={profile} />
          </RoundedButton>
        </Grid>
      ))}
      <Button
        onClick={() => {
          reset();
        }}
      >
        new profile
      </Button>
    </Stack>
  );

  const center = () => (
    <>
      {edit}
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

      <Notice
        open={noticeOpen}
        message={noticeMessage}
        onClose={() => setNoticeOpen(false)}
        type={noticeType}
      />
    </>
  );

  const right = () => {
    return (
      <div>
        <div>account/profile</div>
        <Button
          color="error"
          onClick={() => {
            Logout();
            window.location.pathname = "/";
          }}
        >
          logout
        </Button>
      </div>
    );
  };

  return <MainFrame left={profileList()} center={center()} right={right()} />;
};

export default AccountPage;
