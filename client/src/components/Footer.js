import React from "react";
import styled from "styled-components";
import { COLORS } from "../contants";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        <p>Small café/store management web app</p>
        <p>Concordia Bootcamp Final Project</p>
        <AiFillInstagram /> <AiFillFacebook />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  justify-content: flex-start;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  margin: auto;
  width: 100%;
`;

const Content = styled.div`
  padding: 20px;
  width: 100%;
  text-align: center;
  & > p {
    font-size: 0.8rem;
  }
`;

export default Footer;
