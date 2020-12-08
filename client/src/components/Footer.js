import React from "react";
import styled from "styled-components";
import { COLORS } from "../contants";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        <p>CONTACT</p>
        <p>hello@youremail.com</p>
        <p>1600 Saint-Catherine St W FB-117</p>
        <p>Montreal, Quebec H3H 2S7</p>
        <AiFillInstagram /> <AiFillFacebook />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  font-family: "Roboto Condensed", sans-serif;
  color: #fff;
  background-color: ${COLORS.primary};
`;

const Content = styled.div`
  padding: 20px;
`;

export default Footer;
