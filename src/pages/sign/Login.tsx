import React, { useState } from "react";
import Immutable from "immutable";
import { LoginAPI } from "@/api/SignAPI";
import log from "@/log";

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
      <form
        onSubmit={async (e) => {
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
        <input
          className="block"
          placeholder="email"
          onChange={(event) => {
            setForm((data) => data.set("email", event.target.value));
          }}
        />
        <input
          className="block"
          placeholder="password"
          type="password"
          onChange={(event) => {
            setForm((data) => data.set("password", event.target.value));
          }}
        />
        <button className="block" type="submit" disabled={submitting}>
          登录
        </button>
      </form>
    </>
  );
};

export default Login;
