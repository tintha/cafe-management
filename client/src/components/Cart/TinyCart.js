import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { COLORS } from "../../contants";
import { GiCoffeeCup, GiCupcake } from "react-icons/gi";

const TinyCart = () => {
  const cartState = useSelector((state) => state.cart);
  const cartItems = Object.values(cartState);

  let { totalPrice, totalCupcakes, totalBeverages } = cartItems.reduce(
    (acc, cur) => {
      const { quantity, price, category } = cur;
      acc.totalPrice += (price * quantity) / 100;
      if (category === "Cupcakes") {
        acc.totalCupcakes += quantity;
      } else if (category === "Coffee & Tea") {
        acc.totalBeverages += quantity;
      }
      return acc;
    },
    { totalPrice: 0, totalCupcakes: 0, totalBeverages: 0 }
  );

  return (
    <Wrapper>
      <TopContainer>
        <NumItems>
          <TinyItem>
            <span>Cart:</span>
            <span className="tinyNum">{totalCupcakes}</span>
            <GiCupcake size="20" />
          </TinyItem>{" "}
          <TinyItem>
            <span className="tinyNum">{totalBeverages}</span>
            <GiCoffeeCup size="20" />
            <span>${totalPrice.toFixed(2)}</span>
          </TinyItem>
          <TinyItem></TinyItem>
        </NumItems>
      </TopContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-family: "Roboto Condensed", sans-serif;
  position: sticky;
  top: 0;
  background-color: ${COLORS.background};
  color: ${COLORS.darkest};
  z-index: 10;
`;

const TopContainer = styled.div``;

const TinyItem = styled.div`
  display: flex;
  justify-content: center;

  & > span {
    font-size: 1rem;
    font-weight: normal;
    align-self: flex-end;
    margin-left: 10px;
    color: ${COLORS.darkest};
    &.tinyNum {
      color: ${COLORS.highlight};
      font-weight: bold;
      margin-right: 2px;
    }
  }
`;

const NumItems = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  margin-bottom: 20px;
`;

export default TinyCart;
