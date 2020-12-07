import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { COLORS } from "../../contants";

const Cart = () => {
  const history = useHistory();
  const cartState = useSelector((state) => state.cart);
  const cartItems = Object.values(cartState);
  const user = useSelector((state) => state.auth.currentUser);

  let { totalItems, totalPrice } = cartItems.reduce(
    (acc, cur) => {
      const { quantity, price } = cur;
      acc.totalItems += quantity;
      acc.totalPrice += (price * quantity) / 100;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );

  const handlePurchase = (e) => {
    user ? history.push("/user/cart") : history.push("/login");
  };

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
              image={item.image}
            />
          );
        })}
      </TopContainer>
      <TotalContainer>
        <TotalPrice>
          Total: <BoldText>${totalPrice.toFixed(2)}</BoldText>
        </TotalPrice>
        <Button onClick={(e) => handlePurchase(e)}>Purchase</Button>
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
  font-family: "Roboto Condensed", sans-serif;
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
  background: ${COLORS.secondary};
  color: white;
  border: none;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default Cart;
