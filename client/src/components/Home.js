import React from "react";
import Menu from "./Menu";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      Home - <Menu />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default Home;
