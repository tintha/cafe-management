import React from "react";
import styled from "styled-components";

const Input = ({ type }) => {
  return <LoginInput type={type} />;
};

const LoginInput = styled.input`
  margin: 20px;
`;

export default Input;
