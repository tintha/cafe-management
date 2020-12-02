import React from "react";
import styled from "styled-components";

const LoginButton = ({ type, children }) => {
  return <Submit type={type}>{children}</Submit>;
};

const Submit = styled.button``;

export default LoginButton;
