import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";

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
      {loadingStatus === "loading" && (
        <LoadingCentered>
          <Loading />
        </LoadingCentered>
      )}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {userOrders !== "No orders found" ? (
            userOrders.map((order) => {
              return (
                <OrderBox key={order._id}>
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
                  <p>
                    <Bold>Delivery option:</Bold> {order.deliveryMethod}
                  </p>
                  {order.deliveryMethod === "delivery" && (
                    <DeliveryAddress>
                      <div>
                        <p>
                          <Bold>Delivery Address:</Bold>
                        </p>
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
  color: ${COLORS.darkest};
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > h2 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 600px;
    margin: auto;
  }
  @media only screen and (min-width: 992px) {
    max-width: 700px;
  }
`;

const LoadingCentered = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const OrderBox = styled.div`
  border: 1px solid gray;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: inset 0 0 20px #bfa984;

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
`;

const Bold = styled.span`
  font-weight: bold;
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
