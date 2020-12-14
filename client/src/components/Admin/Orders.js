import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";
import { FaTrash, FaArchive } from "react-icons/fa";
import { MdFiberNew, MdLocalShipping } from "react-icons/md";
import { GiCardboardBox } from "react-icons/gi";
import { HiClipboardCheck } from "react-icons/hi";
import { IoBagHandleSharp } from "react-icons/io5";
import Tooltip from "./Tooltip";

const Orders = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const orders = useSelector((state) => state.orders.orders);
  const loadingStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      dispatch(actions.receivedAdminOrders(data.data));
    } catch (err) {
      dispatch(actions.requestAdminOrdersError(err));
    }
  };

  const handleChangeOrder = async (e, orderId, status, isArchived) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ status: status, isArchived: isArchived }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        if (isArchived === true) {
          addToast("Order archived", {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(actions.deleteOrderSuccess(orderId));
        } else {
          dispatch(
            actions.editOrderSuccess(
              data.data.orderId,
              data.data.status,
              isArchived
            )
          );
        }
      }
    } catch (err) {
      dispatch(actions.editOrderError(err));
    }
  };

  const handleDeleteOrder = async (e, orderId) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        addToast("Order deleted", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(actions.deleteOrderSuccess(orderId));
      }
    } catch (err) {
      addToast(err, {
        appearance: "error",
      });
      dispatch(actions.deleteOrderError(err));
    }
  };

  return (
    <Wrapper>
      {loadingStatus === "loading" && <Loading />}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          <MyButton onClick={() => history.push("/admin/orders/archived")}>
            Archived
          </MyButton>
          {orders !== "No orders found" || orders.length !== 0 ? (
            orders.map((order) => {
              return (
                <SingleOrderBox key={order._id}>
                  <OrderDetails>
                    {order.status === "new" && (
                      <p className="new">{order.status}</p>
                    )}
                    {order.status === "processing" && (
                      <p className="processing">{order.status}</p>
                    )}
                    {order.status === "delivered" && (
                      <p className="delivered">{order.status}</p>
                    )}
                    {order.status === "shipped" && (
                      <p className="shipped">Out for delivery</p>
                    )}
                    {order.status === "readyforpickup" && (
                      <p className="shipped">Ready for pickup</p>
                    )}
                    <p className="bolder">
                      DELIVERY OPTION: {order.deliveryMethod}
                    </p>
                    <p>
                      DATE: {moment(order.date).format("ll")} @{" "}
                      {moment(order.date).format("LT")}
                    </p>
                    <p>ORDER ID: {order._id}</p>
                    <p>CUSTOMER ID: {order.username}</p>
                    {order.deliveryMethod === "delivery" && (
                      <DeliveryAddress>
                        <div>
                          <p>DELIVERY ADDRESS:</p>
                        </div>
                        {order.useProfileAddress === "newAddress" && (
                          <Address>
                            <p>{order.address.line1}</p>
                            <p>{order.address.city}</p>
                            <p>{order.address.postalCode}</p>
                          </Address>
                        )}
                        {order.useProfileAddress === "" && (
                          <Address>
                            <p>{order.address.line1}</p>
                            <p>{order.address.city}</p>
                            <p>{order.address.postalCode}</p>
                          </Address>
                        )}
                        {order.useProfileAddress === "profileAddress" && (
                          <Address>
                            <p>{order.userProfileAddress.line1}</p>
                            <p>{order.userProfileAddress.city}</p>
                            <p>{order.userProfileAddress.postalCode}</p>
                          </Address>
                        )}
                      </DeliveryAddress>
                    )}
                    <p>TOTAL: {order.total}</p>
                    <Items>
                      <p>ITEMS ORDERED:</p>
                      <ItemsList>
                        {order.items.map((item) => {
                          return (
                            <li key={item.itemName}>
                              {item.itemName} x {item.quantity}
                            </li>
                          );
                        })}
                      </ItemsList>
                    </Items>
                  </OrderDetails>
                  <Buttons>
                    <ActionSet>
                      <Tooltip action="Mark as new">
                        {order.status === "new" ? (
                          <ActionButton
                            disabled
                            onClick={(e) =>
                              handleChangeOrder(e, order._id, "new", false)
                            }
                          >
                            <MdFiberNew size="26" />
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onClick={(e) =>
                              handleChangeOrder(e, order._id, "new", false)
                            }
                          >
                            <MdFiberNew size="26" />
                          </ActionButton>
                        )}
                      </Tooltip>
                    </ActionSet>
                    <ActionSet>
                      <Tooltip action="Mark as processing">
                        {order.status === "processing" ? (
                          <ActionButton
                            disabled
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "processing",
                                false
                              )
                            }
                          >
                            <GiCardboardBox size="26" />
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "processing",
                                false
                              )
                            }
                          >
                            <GiCardboardBox size="26" />
                          </ActionButton>
                        )}
                      </Tooltip>
                    </ActionSet>
                    <ActionSet>
                      <Tooltip action="Mark as out for delivery">
                        {order.status === "shipped" ? (
                          <ActionButton
                            disabled
                            onClick={(e) =>
                              handleChangeOrder(e, order._id, "shipped", false)
                            }
                          >
                            <MdLocalShipping size="26" />
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onClick={(e) =>
                              handleChangeOrder(e, order._id, "shipped", false)
                            }
                          >
                            <MdLocalShipping size="26" />
                          </ActionButton>
                        )}
                      </Tooltip>
                    </ActionSet>
                    <ActionSet>
                      <Tooltip action="Mark as ready for pickup">
                        {order.status === "readyforpickup" ? (
                          <ActionButton
                            disabled
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "readyforpickup",
                                false
                              )
                            }
                          >
                            <IoBagHandleSharp size="24" />
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "readyforpickup",
                                false
                              )
                            }
                          >
                            <IoBagHandleSharp size="24" />
                          </ActionButton>
                        )}
                      </Tooltip>
                    </ActionSet>
                    <ActionSet>
                      <Tooltip action="Mark as delivered">
                        {order.status === "delivered" ? (
                          <ActionButton
                            disabled
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "delivered",
                                false
                              )
                            }
                          >
                            <HiClipboardCheck size="26" />
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "delivered",
                                false
                              )
                            }
                          >
                            <HiClipboardCheck size="26" />
                          </ActionButton>
                        )}
                      </Tooltip>
                    </ActionSet>
                    <ActionSet>
                      <Tooltip action="Delete">
                        <ActionButton
                          onClick={(e) =>
                            window.confirm(
                              "This action cannot be undone! Are you sure you wish to delete this order?"
                            ) && handleDeleteOrder(e, order._id)
                          }
                        >
                          <FaTrash size="20" />
                        </ActionButton>
                      </Tooltip>
                    </ActionSet>
                    <ActionSet>
                      <Tooltip action="Archive">
                        <ActionButton
                          onClick={(e) =>
                            handleChangeOrder(e, order._id, order.status, true)
                          }
                        >
                          <FaArchive size="22" />
                        </ActionButton>
                      </Tooltip>
                    </ActionSet>
                  </Buttons>
                </SingleOrderBox>
              );
            })
          ) : (
            <p>There are no order history.</p>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  width: 100%;
  & > h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 10px;
  }

  @media only screen and (min-width: 992px) {
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
  }
`;

const SingleOrderBox = styled.div`
  border: 1px solid ${COLORS.lightBorders};
  width: 100%;
  padding: 30px;
  box-shadow: inset 0 0 30px #bfa984;
  box-sizing: border-box;
  & > p {
    margin-bottom: 10px;
  }
  .new {
    color: ${COLORS.highlight};
    font-weight: bold;
    text-transform: uppercase;
  }
  .delivered {
    color: #28634f;
    font-weight: bold;
    text-transform: uppercase;
  }

  .processing {
    color: #c96406;
    font-weight: bold;
    text-transform: uppercase;
  }

  .shipped {
    color: #1384a1;
    font-weight: bold;
    text-transform: uppercase;
  }

  @media only screen and (min-width: 992px) {
    display: flex;
    justify-content: space-between;
  }
`;

const OrderDetails = styled.div`
  & > p {
    margin-bottom: 10px;
    &.bolder {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: start;
`;

const ItemsList = styled.ul`
  list-style-type: circle;
  margin-left: 30px;
`;

const Buttons = styled.div`
  display: flex;

  @media only screen and (min-width: 992px) {
    height: 40px;
  }
`;

const ActionSet = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const MyButton = styled.button`
  background-color: ${COLORS.primary};
  color: #fff;
  margin-right: 0;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  font-family: "Fredericka the Great", cursive;

  :hover {
    background-color: ${COLORS.highlight};
  }

  @media only screen and (min-width: 992px) {
    padding: 2px;
    width: 100px;
  }
`;

const ActionButton = styled.button`
  border: none;
  color: ${COLORS.darkest};
  background-color: transparent;
  cursor: pointer;
  outline: none;
  :hover {
    color: ${COLORS.highlight2};
  }
  :disabled {
    cursor: not-allowed;
    border-bottom: 2px solid ${COLORS.darkest};
  }
`;

const DeliveryAddress = styled.div`
  display: flex;
  justify-content: start;
`;

const Address = styled.div`
  & > p {
    margin-bottom: 10px;
    margin-left: 10px;
  }
`;

export default Orders;
