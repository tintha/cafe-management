import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../contants";
import { GiCoffeeCup, GiCupcake } from "react-icons/gi";
import * as actions from "../../redux/actions";

const TinyCart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleCheckout = (e) => {
    e.preventDefault();
    dispatch(actions.redirectAfterLogin("/cart"));
    history.push("/cart");
  };

  return (
    <Wrapper>
      <TinyItem>
        <span className="tinyNum">{totalCupcakes}</span>
        <GiCupcake
          size="20"
          tabIndex="0"
          onClick={(e) => handleCheckout(e)}
          aria-label="Checkout"
          role="button"
          className="tinyBtn"
        />
        <span className="tinyNum">{totalBeverages}</span>
        <GiCoffeeCup
          size="20"
          tabIndex="0"
          onClick={(e) => handleCheckout(e)}
          aria-label="Checkout"
          role="button"
          className="tinyBtn"
        />
        <span>${totalPrice.toFixed(2)} </span>
      </TinyItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-family: "Roboto Condensed", sans-serif;
  position: sticky;
  top: 0;
  color: ${COLORS.darkest};
  z-index: 10;
  background-color: ${COLORS.lightBackground};
`;

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
  .tinyBtn {
    cursor: pointer;
    :hover {
      color: ${COLORS.highlight};
    }
  }
`;

export default TinyCart;
