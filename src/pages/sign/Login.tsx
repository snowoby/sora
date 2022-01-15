import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <form>
        <input
          placeholder="email"
          onChange={(event) => {
            setForm((data) => ({ ...data, email: event.target.value }));
          }}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(event) => {
            setForm((data) => ({ ...data, password: event.target.value }));
          }}
        />
        <button>登录</button>
      </form>
    </>
  );
};

export default Login;
