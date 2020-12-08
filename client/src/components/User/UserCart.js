import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UserCartItem from "./UserCartItem";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";

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
    total: totalPrice.toFixed(2),
    date: new Date(),
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({ ...newOrder }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        history.push("/thankyou");
        dispatch(actions.cleanCart());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShopNow = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleLogin = (e) => {
    history.push("/login");
  };

  return (
    <Wrapper>
      <Title>Cart</Title>

      {totalItems === 0 ? (
        <Empty>
          <p className="empty">Your cart is empty!</p>
          <Button
            onClick={(e) => {
              handleShopNow(e);
            }}
          >
            Shop now
          </Button>
        </Empty>
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
                  _id={item._id}
                  itemName={item.itemName}
                  description={item.description}
                  category={item.category}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                />
              );
            })}
          </TopContainer>
          {user ? (
            <>
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
              </TotalContainer>

              <ButtonsBox>
                <Button onClick={() => history.push("/")}>Keep shopping</Button>
                <Button onClick={(e) => handlePlaceOrder(e)}>
                  Place your order
                </Button>
              </ButtonsBox>
            </>
          ) : (
            <Button onClick={(e) => handleLogin(e)}>Sign in to continue</Button>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
  color: ${COLORS.darkest};
  min-height: 100vh;
`;

const TopContainer = styled.div``;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 2px;
`;

const Empty = styled.div`
  .empty {
    padding: 30px;
    text-align: center;
  }
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

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TotalPrice = styled.div``;

const ButtonsBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: 100%;
  border-radius: 4px;
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 1px;
  cursor: pointer;
`;

export default Cart;
