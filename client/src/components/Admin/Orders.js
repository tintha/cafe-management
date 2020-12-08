import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";

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

  const handleChangeOrder = async (e, orderId) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ status: "completed" }),
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

  return (
    <Wrapper>
      <h2>Orders:</h2>
      {loadingStatus === "loading" && <Loading />}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {orders !== "No orders found" ? (
            orders.map((order) => {
              return (
                <SingleOrderBox key={order._id}>
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
                  <Button onClick={(e) => handleChangeOrder(e, order._id)}>
                    Mark completed
                  </Button>
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
  min-height: 100vh;
  & > h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 10px;
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
`;

const Items = styled.div`
  padding: 20px;
`;

const ItemsList = styled.ul`
  list-style-type: circle;
`;

const Button = styled.button`
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
