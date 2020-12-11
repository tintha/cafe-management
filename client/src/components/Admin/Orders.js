import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";
import { MdCheckBox } from "react-icons/md";
import { FaTrashAlt, FaArchive } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";

const Orders = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
        dispatch(actions.deleteOrderSuccess(orderId));
      }
    } catch (err) {
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
          {orders !== "No orders found" ? (
            orders.map((order) => {
              return (
                <SingleOrderBox key={order._id}>
                  <OrderDetails>
                    {order.status === "new" ? (
                      <p className="new">{order.status}</p>
                    ) : (
                      <p className="completed">{order.status}</p>
                    )}
                    <p>
                      DATE: {moment(order.date).format("ll")} @{" "}
                      {moment(order.date).format("LT")}
                    </p>
                    <p>ORDER ID: {order._id}</p>
                    <p>CUSTOMER ID: {order.username}</p>
                    <p>TOTAL: {order.total}</p>
                    <Items>
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
                    {order.status === "new" ? (
                      <>
                        <ActionSet>
                          <ActionButton
                            onClick={(e) =>
                              handleChangeOrder(
                                e,
                                order._id,
                                "completed",
                                false
                              )
                            }
                          >
                            <MdCheckBox size="30" />
                          </ActionButton>
                          Mark as completed
                        </ActionSet>
                      </>
                    ) : (
                      <ActionSet>
                        <ActionButton
                          onClick={(e) =>
                            handleChangeOrder(e, order._id, "new", false)
                          }
                        >
                          <MdFiberNew size="30" />
                        </ActionButton>
                        Mark as new
                      </ActionSet>
                    )}
                    <ActionSet>
                      <ActionButton
                        onClick={(e) =>
                          window.confirm(
                            "This action cannot be undone! Are you sure you wish to delete this order?"
                          ) && handleDeleteOrder(e, order._id)
                        }
                      >
                        <FaTrashAlt size="24" />
                      </ActionButton>
                      Delete
                    </ActionSet>
                    <ActionSet>
                      <ActionButton
                        onClick={(e) =>
                          handleChangeOrder(e, order._id, order.status, true)
                        }
                      >
                        <FaArchive size="24" />
                      </ActionButton>
                      Archive
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
    /* desktop */
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
  }
`;

const SingleOrderBox = styled.div`
  border: 1px solid ${COLORS.lightBorders};
  width: 100%;
  padding: 10px;
  & > p {
    margin-bottom: 10px;
  }
  .new {
    color: ${COLORS.highlight2};
    font-weight: bold;
    text-transform: uppercase;
  }
  .completed {
    font-weight: bold;
    text-transform: uppercase;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    display: flex;
    justify-content: space-between;
  }
`;

const OrderDetails = styled.div`
  & > p {
    margin-bottom: 10px;
  }
`;

const Items = styled.div`
  padding: 20px;
`;

const ItemsList = styled.ul`
  list-style-type: circle;
`;

const Buttons = styled.div`
  display: flex;

  @media only screen and (min-width: 992px) {
    /* desktop */
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
  @media only screen and (min-width: 992px) {
    /* desktop */
    padding: 2px;
    width: 100px;
  }
`;

const ActionButton = styled.button`
  border: none;
  background-color: ${COLORS.background};
  color: ${COLORS.darkest};
  cursor: pointer;
  :hover {
    color: ${COLORS.highlight2};
  }
`;

export default Orders;
