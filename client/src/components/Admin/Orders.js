import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";
import { FaTrash } from "react-icons/fa";

const Orders = () => {
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

  const handleChangeOrder = async (e, orderId, status) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ status: status }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        dispatch(actions.editOrderSuccess(data.data.orderId, data.data.status));
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
    <>
      <h2>Orders:</h2>
      <Wrapper>
        {loadingStatus === "loading" && <Loading />}
        {loadingStatus === "error" && <p>An error occurred...</p>}
        {loadingStatus === "success" && (
          <>
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
                    {order.status === "new" ? (
                      <MyButton
                        onClick={(e) =>
                          handleChangeOrder(e, order._id, "completed")
                        }
                      >
                        Mark as completed
                      </MyButton>
                    ) : (
                      <MyButton
                        onClick={(e) => handleChangeOrder(e, order._id, "new")}
                      >
                        Mark as new
                      </MyButton>
                    )}
                    <FaTrash
                      onClick={(e) =>
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        ) && handleDeleteOrder(e, order._id)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </SingleOrderBox>
                );
              })
            ) : (
              <p>There are no order history.</p>
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  width: 100%;
  min-height: 100vh;
  & > h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 10px;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
  }
`;

const SingleOrderBox = styled.div`
  border: 1px solid ${COLORS.grayBorder};
  width: 100%;
  padding: 10px;
  & > p {
    margin-bottom: 10px;
  }
  .new {
    color: red;
    font-weight: bold;
    text-transform: uppercase;
  }
  .completed {
    font-weight: bold;
    text-transform: uppercase;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 30%;
    min-height: 340px;
    display: flex;
    flex-direction: column;
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

const MyButton = styled.button`
  width: 100%;
  background-color: ${COLORS.primary};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Orders;
