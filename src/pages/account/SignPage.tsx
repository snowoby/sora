import React, { useContext, useState, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Immutable from "immutable";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grow,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import log from "@/log";
import UniversalContext from "@/context/UniversalContext";
import loginBackground from "@/assets/login.webp";
import registerBackground from "@/assets/register.webp";
import { APIRegister, LoginStream } from "@/api/SignAPI";
import AccountContext from "@/context/AccountContext";
import { LoadingButton } from "@mui/lab";

type SignPageType = "login" | "register";

const SignPage = ({ pageType }: { pageType: SignPageType }) => {
  const universalConfig = useContext(UniversalContext);
  const [form, setForm] = useState(
    Immutable.Map({
      email: "",
      password: "",
    })
  );

  const navigate = useNavigate();
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error">();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { account, updateAccount } = useContext(AccountContext);

  const another = (value: SignPageType) =>
    value === "login" ? "register" : "login";

  const loginAction = async () => {
    const response = await LoginStream(form);
    setNoticeOpen(true);
    setMessage("login successfully! redirecting...");
    await updateAccount();
    log.info(response.data);
    navigate("/");
  };

  const registerAction = async () => {
    await APIRegister(form);
    await loginAction();
  };
  const submit = {
    login: loginAction,
    register: registerAction,
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((data) => data.set(event.target.name, event.target.value));
  };

  const haveContent = Boolean(form.get("email") || form.get("password"));

  if (account) return <Navigate to="/account" replace />;

  return (
    <>
      <Helmet>
        <title>{pageType}</title>
      </Helmet>
      <Box
        sx={{
          backgroundImage: `url(${
            pageType === "login" ? loginBackground : registerBackground
          })`,
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={[
            {
              m: "0",
              p: "2rem",
              width: "100%",
              maxWidth: "24rem",
              height: "100%",
              maxHeight: "24rem",
              boxShadow: "0 0 4rem gray",
              backgroundColor: "rgba(255,255,255,0.6)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
              transitionDuration: "200ms",
              borderRadius: "2rem",
            },
            haveContent && {
              backgroundColor: "rgba(255,255,255,0.9)",
            },
          ]}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: "0.75rem" }}>
            {pageType}
          </Typography>
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitting(true);
                submit[pageType]()
                  .then(() => {
                    setStatus("success");
                  })
                  .catch((e) => {
                    setMessage(e.response.data.message);
                    log.error(e);
                    setStatus("error");
                    setSubmitting(false);
                  })
                  .finally(() => setNoticeOpen(true));

                return false;
              }}
            >
              <Stack spacing={3}>
                {["email", "password"].map((fieldName) => (
                  <TextField
                    key={fieldName}
                    className="block"
                    fullWidth
                    label={fieldName}
                    type={fieldName}
                    name={fieldName}
                    variant="filled"
                    required={true}
                    onChange={inputChange}
                  />
                ))}
                <LoadingButton
                  className="block"
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  loading={submitting}
                >
                  {pageType}
                </LoadingButton>
              </Stack>
            </form>
            <Stack spacing={2} sx={{ width: "100%", textAlign: "center" }}>
              <Divider>or</Divider>
              <Link to={`../${another(pageType)}`}>
                <Button>{another(pageType)}</Button>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Notice
        open={noticeOpen}
        message={message}
        type={status}
        onClose={() => setNoticeOpen(false)}
      />
    </>
  );
};

export default SignPage;

type NoticeProps = {
  open: boolean;
  message: string;
  type?: "error" | "success";
  onClose: () => void;
};
const slide = (props: any) => <Slide direction="up" {...props} />;

const Notice = (props: NoticeProps) => {
  return (
    <Snackbar
      TransitionComponent={slide}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={1}
    >
      <Alert
        onClose={props.onClose}
        severity={props.type}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};
