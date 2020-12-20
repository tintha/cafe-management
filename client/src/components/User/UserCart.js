import React, { useState, useEffect } from "react";
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
  const [isDelivery, setIsDelivery] = useState(false);
  const [useProfileAddress, setUseProfileAddress] = useState(true);
  const user = useSelector((state) => state.auth.currentUser);
  const profile = useSelector((state) => state.auth.userProfile);
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
    deliveryMethod: "",
    useProfileAddress: "",
    address: {
      line1: "",
      city: "",
      postalCode: "",
    },
    userProfileAddress: {
      line1: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (user) {
      const userAddress = {
        ...newOrder.userProfileAddress,
        line1: profile.address.line1,
        city: profile.address.city,
        postalCode: profile.address.postalCode,
      };
      setNewOrder({ ...newOrder, userProfileAddress: { ...userAddress } });
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "deliveryMethod" && value === "delivery") {
      setIsDelivery(true);
    } else if (name === "deliveryMethod" && value === "pickup") {
      setIsDelivery(false);
    }
    if (name === "useProfileAddress" && value === "profileAddress") {
      setUseProfileAddress(true);
    } else if (name === "useProfileAddress" && value === "newAddress") {
      setUseProfileAddress(false);
    }
    if (name === "line1" || name === "city" || name === "postalCode") {
      const newAddress = { ...newOrder.address, [name]: value };
      setNewOrder({ ...newOrder, address: { ...newAddress } });
    } else {
      setNewOrder({ ...newOrder, [name]: value });
    }
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
    dispatch(actions.redirectAfterLogin("/items"));
    history.push("/items");
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
                <RadioBox>
                  <div className="radios">
                    <DeliveryMethod
                      type="radio"
                      value="pickup"
                      name="deliveryMethod"
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="pickup">Pickup</label>
                  </div>
                  <div className="radios">
                    <DeliveryMethod
                      type="radio"
                      value="delivery"
                      name="deliveryMethod"
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="delivery">Delivery</label>
                  </div>
                </RadioBox>
              </FieldBox>
              {isDelivery && (
                <>
                  {profile.address.line1 ? (
                    <>
                      <FieldBox>
                        <RadioBox>
                          <ProfileAddressBox>
                            <div>
                              <DeliveryMethod
                                type="radio"
                                value="profileAddress"
                                name="useProfileAddress"
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                            <div>
                              <label htmlFor="profileAddress">
                                Select this address:{" "}
                                <p>{profile.address.line1}</p>
                                <p>{profile.address.city}</p>
                                <p>{profile.address.postalCode}</p>
                              </label>
                            </div>
                          </ProfileAddressBox>
                          <ProfileAddressBox>
                            <div>
                              <DeliveryMethod
                                type="radio"
                                value="newAddress"
                                name="useProfileAddress"
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                            <div>
                              <label htmlFor="newAddress">
                                Enter a new address
                              </label>
                            </div>
                          </ProfileAddressBox>
                        </RadioBox>
                      </FieldBox>
                      {!useProfileAddress && profile.address.line1 && (
                        <>
                          <FieldBox>
                            <label htmlFor="address">
                              Address:
                              <Input
                                id="address"
                                type="text"
                                name="line1"
                                value={newOrder.address.line1}
                                onChange={(e) => handleChange(e)}
                              />
                            </label>
                          </FieldBox>
                          <FieldBox>
                            <label htmlFor="city">
                              City:
                              <Input
                                id="city"
                                type="text"
                                name="city"
                                value={newOrder.address.city}
                                onChange={(e) => handleChange(e)}
                              />
                            </label>
                          </FieldBox>
                          <FieldBox>
                            <label htmlFor="postalCode">
                              Postal Code:
                              <Input
                                id="postalCode"
                                type="text"
                                name="postalCode"
                                value={newOrder.address.postalCode}
                                onChange={(e) => handleChange(e)}
                              />
                            </label>
                          </FieldBox>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <FieldBox>
                        <label htmlFor="address">
                          Address:
                          <Input
                            id="address"
                            type="text"
                            name="line1"
                            value={newOrder.address.line1}
                            onChange={(e) => handleChange(e)}
                          />
                        </label>
                      </FieldBox>
                      <FieldBox>
                        <label htmlFor="city">
                          City:
                          <Input
                            id="city"
                            type="text"
                            name="city"
                            value={newOrder.address.city}
                            onChange={(e) => handleChange(e)}
                          />
                        </label>
                      </FieldBox>
                      <FieldBox>
                        <label htmlFor="postalCode">
                          Postal Code:
                          <Input
                            id="postalCode"
                            type="text"
                            name="postalCode"
                            value={newOrder.address.postalCode}
                            onChange={(e) => handleChange(e)}
                          />
                        </label>
                      </FieldBox>
                    </>
                  )}
                </>
              )}

              <FieldBox>
                <label htmlFor="creditCard">
                  <p>Credit card</p>
                  <FaCcVisa size="24" className="ccicons" />
                  <FaCcMastercard size="24" className="ccicons" />
                  <FaCcAmex size="24" className="ccicons" />
                  <Input
                    id="creditCard"
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
                  <label htmlFor="cvc">
                    <p>CVC</p>
                    <SmallInput
                      id="cvc"
                      type="text"
                      name="cvc"
                      placeholder="123"
                      value={newOrder.cvc}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </FieldBox>
                <FieldBox>
                  <label htmlFor="expires">
                    <p>Expires</p>
                    <SmallInput
                      id="expires"
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
    max-width: 1000px;
    margin: auto;
    flex-direction: row;
  }
`;

const TopContainer = styled.div`
  @media only screen and (min-width: 992px) {
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
    width: 300px;
  }
`;

const FieldBox = styled.div`
  .ccicons {
    margin-right: 6px;
  }

  .radioContainer {
    display: flex;
    padding: 20px;
    justify-content: space-evenly;
    align-content: flex-start;
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
    width: 80px;
    margin-right: 20px;
  }
`;

const CreditCartSmall = styled.div`
  @media only screen and (min-width: 992px) {
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
    height: 30px;
    max-width: 170px;
    padding: 2px;
  }
`;
const DeliveryMethod = styled.input``;

const RadioBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
`;

const ProfileAddressBox = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
`;

export default Cart;
