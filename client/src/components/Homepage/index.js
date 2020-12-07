import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Menu from "../Menu";
import Cart from "../Cart";

const Home = () => {
  const loadingStatus = useSelector((state) => state.items.status);

  return (
    <Wrapper>
      <div>
        <Menu />
      </div>
      <div>{loadingStatus === "success" && <Cart />}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Roboto Condensed", sans-serif;
`;

export default Home;
