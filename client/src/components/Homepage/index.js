import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Menu from "../Menu";

const Home = () => {
  const loadingStatus = useSelector((state) => state.items.status);

  return (
    <Wrapper>
      <Menu />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 1000px;
    margin: auto;
  }
`;

export default Home;
