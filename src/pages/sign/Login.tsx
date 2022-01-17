import React, { useState } from "react";
import Immutable from "immutable";
import { LoginAPI } from "@/api/SignAPI";
import log from "@/log";
import { Button, Form } from "semantic-ui-react";

const Login = () => {
  const [form, setForm] = useState(
    Immutable.Map({
      email: "",
      password: "",
    })
  );
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <Form
        onSubmit={async (e) => {
          console.log(e);
          e.preventDefault();
          setSubmitting(true);
          try {
            const response = await LoginAPI(form);
            response;
          } catch (e) {
            log.info(e);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form.Field>
          <label>email</label>
          <input
            className="block"
            placeholder="email"
            type="email"
            onChange={(event) => {
              setForm((data) => data.set("email", event.target.value));
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input
            className="block"
            placeholder="password"
            type="password"
            onChange={(event) => {
              setForm((data) => data.set("password", event.target.value));
            }}
          />
        </Form.Field>

        <Button
          inverted
          fluid
          color="blue"
          className="block"
          type="submit"
          disabled={submitting}
        >
          登录
        </Button>
      </Form>
    </>
  );
};

export default Login;
