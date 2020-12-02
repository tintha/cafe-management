import React from "react";
import LoginInput from "./Input";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <div>
      Login component
      <LoginInput type="text" />
      <LoginInput type="password" />
      <LoginButton type="submit">Login</LoginButton>
    </div>
  );
};

export default Login;
