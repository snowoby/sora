import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Immutable from "immutable";
import { Button, Stack, TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import log from "@/log";
import UniversalContext from "@/context/UniversalContext";
import loginBackground from "@/assets/login_background.webp";
import { LoginAPI } from "@/api/SignAPI";

type SignPageType = "login" | "register";

const SignPage = ({ pageType }: { pageType: SignPageType }) => {
  const universalConfig = useContext(UniversalContext);
  const [form, setForm] = useState(
    Immutable.Map({
      email: "",
      password: "",
    })
  );
  const [submitting, setSubmitting] = useState(false);

  const another = (value: SignPageType) =>
    value === "login" ? "register" : "login";

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await LoginAPI(form);
      //TODO
    } catch (e) {
      log.info(e);
    } finally {
      setSubmitting(false);
    }
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((data) => data.set(event.target.name, event.target.value));
  };

  return (
    <>
      <Helmet>
        <title>{pageType}</title>
      </Helmet>
      <div
        style={{ backgroundImage: `url(${loginBackground})` }}
        className="h-screen w-screen bg-cover bg-bottom flex items-center justify-center"
      >
        <div className="group">
          <div
            className="m-20 max-w-md w-screen max-h-96 h-screen
        bg-cover shadow-2xl backdrop-filter backdrop-blur-xl
        bg-no-repeat bg-fixed rounded-lg p-4 group-hover:bg-white duration-200"
          >
            {
              //TODO firefox
            }
            <h1 className="text-center text-4xl">{universalConfig.siteName}</h1>
            <div className="mt-8">
              <form onSubmit={formSubmit}>
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
                  <Button
                    className="block"
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={submitting}
                  >
                    {pageType}
                  </Button>
                </Stack>
              </form>
              <div className="w-full text-center">
                <div className="my-2">-or-</div>
                <Link to={`../${another(pageType)}`}>
                  <Button>{another(pageType)}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignPage;
