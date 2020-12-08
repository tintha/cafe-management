import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const userOrders = useSelector((state) => state.orders.orders);
  const loadingStatus = useSelector((state) => state.orders.status);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/orders/user/${user}`);
      const data = await response.json();
      dispatch(actions.receivedUserOrders(data.data));
    } catch (err) {
      dispatch(actions.requestUserOrdersError(err));
    }
  };

  return (
    <Wrapper>
      <h2>Order History:</h2>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {userOrders !== "No orders found" ? (
            userOrders.map((order) => {
              return (
                <OrderBox key={order._id}>
                  {order.status === "new" ? (
                    <p className="new">{order.status}</p>
                  ) : (
                    <p className="completed">{order.status}</p>
                  )}
                  <p>
                    <Bold>Date:</Bold> {moment(order.date).format("ll")} @{" "}
                    {moment(order.date).format("LT")}
                  </p>
                  <p>
                    <Bold>Order ID:</Bold> {order._id}
                  </p>
                  <p>
                    <Bold>Items ordered:</Bold>
                  </p>
                  {order.items.map((item) => {
                    return (
                      <p key={item._id}>
                        {item.itemName} x {item.quantity}
                      </p>
                    );
                  })}
                  <p>
                    <Bold>Total:</Bold> ${order.total}
                  </p>
                </OrderBox>
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

const Wrapper = styled.div`
  width: 100%;
  & > h2 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const OrderBox = styled.div`
  border: 1px solid gray;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 10px;
  & > p {
    margin-bottom: 10px;
  }
  .new {
    color: red;
    font-weight: bold;
    text-transform: uppercase;
  }
  .completed {
    color: green;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

export default Orders;
