import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const orders = useSelector((state) => state.orders.orders);
  const loadingStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    // dispatch(actions.requestUserOrders());
    fetch(`/api/orders/user/${user}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedUserOrders(data.data));
      })
      .catch((err) => dispatch(actions.requestUserOrdersError(err)));
  }, [dispatch, user]);

  return (
    <Wrapper>
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
                    ID: {order._id}, Total: {order.total}, Status:
                    {order.status}, Date: {moment(order.date).format("ll")} @{" "}
                    {moment(order.date).format("LT")}
                  </p>
                  <div>
                    <p>Items ordered:</p>
                    {order.items.map((item) => {
                      return (
                        <p key={item._id}>
                          {item.category}: {item.itemName} x {item.quantity}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <p>You currently have no order history.</p>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Orders;
