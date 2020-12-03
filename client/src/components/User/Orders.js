import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const orders = useSelector((state) => state.orders.orders);
  const loadingStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    dispatch(actions.requestUserOrders());
    fetch(`/api/orders/user/${user}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedUserOrders(data.data));
      })
      .catch((err) => dispatch(actions.requestUserOrdersError(err)));
  }, [dispatch, user]);

  return (
    <div>
      <h2>Orders:</h2>
      {loadingStatus === "success" && (
        <>
          {orders !== "No orders found" && orders !== null ? (
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
                </div>
              );
            })
          ) : (
            <p>You currently have no order history.</p>
          )}
        </>
      )}
    </div>
  );
};

const Button = styled.button``;

export default Orders;
