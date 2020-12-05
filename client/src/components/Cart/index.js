import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const cartState = useSelector((state) => state.cart);
  const cartItems = Object.values(cartState);

  let { totalItems, totalPrice } = cartItems.reduce(
    (acc, cur) => {
      const { quantity, price } = cur;
      acc.totalItems += quantity;
      acc.totalPrice += (price * quantity) / 100;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );

  return (
    <Wrapper>
      <TopContainer>
        <Title>Your Cart</Title>
        <NumItems>
          {totalItems} {totalItems <= 1 ? "item" : "items"}
        </NumItems>
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.itemName}
              id={item._id}
              itemName={item.itemName}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
      </TopContainer>
      <TotalContainer>
        <TotalPrice>
          Total: <BoldText>${totalPrice.toFixed(2)}</BoldText>
        </TotalPrice>
        <Button>Purchase</Button>
      </TotalContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
`;

const TopContainer = styled.div``;

const Title = styled.h2`
  margin-bottom: 2px;
`;

const NumItems = styled.div`
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
  width: 100%;
  border-radius: 12px;
  background: #ff406e;
  color: white;
  border: none;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default Cart;
