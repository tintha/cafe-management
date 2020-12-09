import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../contants";

const ThankYou = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  setTimeout(() => {
    history.push("/user/orders");
  }, 5000);

  return (
    <Wrapper>
      <p>Thank you for your order!</p>
      <p>You will be redirected to your orders in a few seconds...</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

export default ThankYou;
