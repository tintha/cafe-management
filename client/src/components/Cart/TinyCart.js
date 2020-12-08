import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TinyCartItem from "./TinyCartItem";
import { COLORS } from "../../contants";
import { RiCake3Line, RiCupLine } from "react-icons/ri";

const TinyCart = () => {
  const history = useHistory();
  const cartState = useSelector((state) => state.cart);
  const cartItems = Object.values(cartState);
  const user = useSelector((state) => state.auth.currentUser);

  let {
    totalItems,
    totalPrice,
    totalCupcakes,
    totalBeverages,
  } = cartItems.reduce(
    (acc, cur) => {
      const { quantity, price, category } = cur;
      acc.totalItems += quantity;
      acc.totalPrice += (price * quantity) / 100;
      if (category === "Cupcakes") {
        acc.totalCupcakes += quantity;
      } else if (category == "Coffee & Tea") {
        acc.totalBeverages += quantity;
      }
      return acc;
    },
    { totalItems: 0, totalPrice: 0, totalCupcakes: 0, totalBeverages: 0 }
  );

  const handlePurchase = (e) => {
    history.push("/cart");
  };

  return (
    <Wrapper>
      <TopContainer>
        <NumItems>
          {totalCupcakes} <RiCake3Line size="20" />, {totalBeverages}{" "}
          <RiCupLine size="20" /> <BoldText>${totalPrice.toFixed(2)}</BoldText>
        </NumItems>
      </TopContainer>
      {/* <TotalContainer>
        <Button onClick={(e) => handlePurchase(e)}>Buy</Button>
      </TotalContainer> */}
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
  background-color: #fff;
  z-index: 10;
`;

const TopContainer = styled.div``;

const Title = styled.h2`
  margin-bottom: 2px;
`;

const NumItems = styled.div`
  display: flex;

  align-items: center;
  padding: 6px;
  margin-bottom: 20px;
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const TotalPrice = styled.div``;

const Button = styled.button`
  position: relative;
  display: block;
  border-radius: 12px;
  background: ${COLORS.secondary};
  color: white;
  border: none;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default TinyCart;
