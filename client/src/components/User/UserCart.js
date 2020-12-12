import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import UserCartItem from "./UserCartItem";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const lastLocation = location.pathname;
  const cartState = useSelector((state) => state.cart);
  const cartItems = Object.values(cartState);
  const [error, setError] = useState(null);
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
        history.push("/thankyou/");
        dispatch(actions.cleanCart());
      } else if (data.status === 400) {
        setError(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShopNow = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleLogin = (e, lastLocation) => {
    e.preventDefault();
    dispatch(actions.redirectAfterLogin(lastLocation));
    history.push("/login");
  };

  return (
    <Wrapper>
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
            <PaymentForm>
              <FieldBox>
                <label>
                  <p>Credit card</p>
                  <FaCcVisa size="24" className="ccicons" />
                  <FaCcMastercard size="24" className="ccicons" />
                  <FaCcAmex size="24" className="ccicons" />
                  <Input
                    type="text"
                    name="creditCard"
                    placeholder="1234 5678 9101 1213"
                    value={newOrder.creditCard}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </FieldBox>
              <CreditCartSmall>
                <FieldBox>
                  <label>
                    <p>CVC</p>
                    <SmallInput
                      type="text"
                      name="cvc"
                      placeholder="123"
                      value={newOrder.cvc}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </FieldBox>
                <FieldBox>
                  <label>
                    <p>Expires</p>
                    <SmallInput
                      type="text"
                      name="exp"
                      placeholder="mm/yy"
                      value={newOrder.exp}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </FieldBox>
              </CreditCartSmall>
              <TotalPrice>
                Total: <BoldText>${totalPrice.toFixed(2)}</BoldText>
              </TotalPrice>
              <ButtonsBox>
                <Button onClick={(e) => handlePlaceOrder(e)}>
                  Place your order
                </Button>
                <Button onClick={() => history.push("/")}>Keep shopping</Button>
              </ButtonsBox>
              <Error>{error && <p>{error}</p>}</Error>
            </PaymentForm>
          ) : (
            <Button onClick={(e) => handleLogin(e, lastLocation)}>
              Sign in to checkout
            </Button>
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
  font-family: "Roboto Condensed", sans-serif;

  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 1000px;
    margin: auto;
    flex-direction: row;
  }
`;

const TopContainer = styled.div`
  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 450px;
    margin-right: 100px;
    margin-left: 50px;
  }
`;

const Empty = styled.div`
  margin-left: auto;
  margin-right: auto;
  .empty {
    padding: 30px;
    text-align: center;
  }
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: ${COLORS.error};
  font-weight: bold;
`;

const NumItems = styled.div`
  margin-bottom: 20px;
`;

const PaymentForm = styled.div`
  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 300px;
  }
`;

const FieldBox = styled.div`
  .ccicons {
    margin-right: 6px;
  }
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
  background-color: ${COLORS.inputBackground};
`;

const SmallInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${COLORS.inputBackground};
  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 80px;
    margin-right: 20px;
  }
`;

const CreditCartSmall = styled.div`
  @media only screen and (min-width: 992px) {
    /* desktop */
    display: flex;
  }
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  padding: 10px;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media only screen and (min-width: 992px) {
    /* desktop */
  }
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: 100%;
  background: ${COLORS.primary};
  color: #fff;
  border: none;
  padding: 8px;
  margin: 1px;
  cursor: pointer;
  font-family: "Fredericka the Great", cursive;
  :hover {
    background-color: ${COLORS.highlight};
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    /* width: 300px;
    height: 40px; */
    height: 30px;
    max-width: 170px;
    padding: 2px;
  }
`;

export default Cart;
