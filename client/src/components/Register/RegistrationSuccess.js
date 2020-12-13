import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../contants";

const RegistrationSuccess = () => {
  return (
    <Wrapper>
      <p>Your account was successfully created. </p>
      <p>
        Please <Link to="/login">sign in</Link>.
      </p>
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

export default RegistrationSuccess;
