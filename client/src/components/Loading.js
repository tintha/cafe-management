import React from "react";
import { ImSpinner9 } from "react-icons/im";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return <Wrapper size={30} />;
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled(ImSpinner9)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  animation: ${rotate} 1s linear infinite;
`;

export default Loading;
