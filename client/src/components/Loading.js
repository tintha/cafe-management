import React from "react";
import { ImSpinner9 } from "react-icons/im";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../contants";

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
  margin-top: 100px;
  animation: ${rotate} 1s linear infinite;
  color: ${COLORS.primary};
`;

export default Loading;
