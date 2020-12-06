import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loadingStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    // dispatch(actions.requestAdminOrders());
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedAdminOrders(data.data));
      })
      .catch((err) => dispatch(actions.requestAdminOrdersError(err)));
  }, [dispatch]);

  const handleChangeOrder = (e, orderId) => {
    e.preventDefault();

    fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "completed" }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(
            actions.editOrderSuccess(json.data.orderId, json.data.status)
          );
        }
      })
      .catch((err) => dispatch(actions.editOrderError()));
  };

  return (
    <div>
      <h2>Orders:</h2>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {orders !== "No orders found" ? (
            orders.map((order) => {
              return (
                <div key={order._id}>
                  <p>
                    Received: {moment(order.date).format("ll")} @{" "}
                    {moment(order.date).format("LT")}, ID: {order._id},
                    Customer: {order.username}, Total: {order.total}, Status:
                    {order.status}
                  </p>
                  {order.items.map((item) => {
                    return (
                      <p key={item._id}>
                        item: {item.itemName}, quantity: {item.quantity}
                      </p>
                    );
                  })}
                  <Button onClick={(e) => handleChangeOrder(e, order._id)}>
                    Mark completed
                  </Button>
                </div>
              );
            })
          ) : (
            <p>There are no order history.</p>
          )}
        </>
      )}
    </div>
  );
};

const Button = styled.button``;

export default Orders;
