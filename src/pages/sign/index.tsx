import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useContext,
  useState,
} from "react";
import { Link, Outlet } from "react-router-dom";
import loginBackground from "@/assets/login_background.webp";
import UniversalContext from "@/context/UniversalContext";
import { Button, Form } from "semantic-ui-react";
import { LoginAPI } from "@/api/SignAPI";
import log from "@/log";
import Immutable from "immutable";

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
      <div
        style={{ backgroundImage: `url(${loginBackground})` }}
        className="h-screen w-screen bg-cover bg-bottom flex items-center justify-center"
      >
        <div className="m-0 max-w-md w-screen max-h-96 h-screen bg-red-50 rounded-lg p-2">
          <h1 className="text-center text-4xl">{universalConfig.siteName}</h1>
          <div className="mt-2">
            <Form onSubmit={formSubmit}>
              {["email", "password"].map((fieldName) => (
                <Form.Field key={fieldName}>
                  <label>{fieldName}</label>
                  <input
                    className="block"
                    placeholder={fieldName}
                    type={fieldName}
                    name={fieldName}
                    minLength={1}
                    onChange={inputChange}
                  />
                </Form.Field>
              ))}
              <Button
                inverted
                fluid
                color="blue"
                className="block"
                type="submit"
                disabled={submitting}
              >
                {pageType}
              </Button>
            </Form>
            <div className="w-full text-center">
              <div className="my-2">-or-</div>
              <Link to={`../${another(pageType)}`}>
                -&gt;{another(pageType)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoginButtonGroup = () => {};

export default SignPage;
