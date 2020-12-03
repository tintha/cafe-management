import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loadingStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    dispatch(actions.requestAdminOrders());
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedAdminOrders(data.data));
      })
      .catch((err) => dispatch(actions.requestAdminOrdersError(err)));
  }, [dispatch]);

  return (
    <div>
      <h2>Orders:</h2>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {orders !== "No orders found" ? (
            orders.map((order) => {
              const items = Object.entries(order.items);
              return (
                <div key={order._id}>
                  <p>
                    {order._id} - {order.customer} - {order.total}
                  </p>
                  {items.map((item) => {
                    return (
                      <p key={item}>
                        item: {item[0]}, quantity: {item[1]}
                      </p>
                    );
                  })}
                  <Button>Update Status</Button>
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
