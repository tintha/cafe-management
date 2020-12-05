import React from "react";
import styled from "styled-components";
import Menu from "../Menu";
import Cart from "../Cart";

const Home = () => {
  return (
    <Wrapper>
      Home -
      <div>
        <Menu />
      </div>
      <div>
        <Cart />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export default Home;
