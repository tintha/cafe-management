import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../contants";

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Wrapper>Thank you for your order!</Wrapper>;
};

const Wrapper = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

export default ThankYou;
