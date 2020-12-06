import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UserCartItem from "./UserCartItem";
import * as actions from "../../redux/actions";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
  const [newOrder, setNewOrder] = useState({
    username: user,
    items: cartItems,
    creditCard: "",
    cvc: "",
    exp: "",
    total: totalPrice,
    date: new Date(),
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ ...newOrder }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          history.push("/thankyou");
          dispatch(actions.cleanCart());
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Title>Cart</Title>

      {totalItems === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <TopContainer>
            <NumItems>
              {totalItems} {totalItems <= 1 ? "item" : "items"}
            </NumItems>
            {cartItems.map((item) => {
              return (
                <UserCartItem
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
          <FieldBox>
            <label>
              Credit card
              <Input
                type="text"
                name="creditCard"
                value={newOrder.creditCard}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <br></br>
            <label>
              CVC
              <Input
                type="text"
                name="cvc"
                value={newOrder.cvc}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <br></br>
            <label>
              Expiration date
              <Input
                type="text"
                name="exp"
                value={newOrder.exp}
                onChange={(e) => handleChange(e)}
              />
            </label>
          </FieldBox>
          <TotalContainer>
            <TotalPrice>
              Total: <BoldText>${totalPrice.toFixed(2)}</BoldText>
            </TotalPrice>
            <Button onClick={() => history.push("/")}>Keep shopping</Button>
            <Button onClick={(e) => handlePlaceOrder(e)}>Confirm</Button>
          </TotalContainer>
        </>
      )}
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

const FieldBox = styled.div``;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const Input = styled.input``;

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
