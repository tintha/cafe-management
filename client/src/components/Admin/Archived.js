import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";
import { FaTrash } from "react-icons/fa";
import Tooltip from "./Tooltip";

const Archived = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const archived = useSelector((state) => state.archived.archived);
  const loadingStatus = useSelector((state) => state.archived.status);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/orders/archived");
      const data = await response.json();
      if (data.status === 200) {
        dispatch(actions.receivedArchived(data.data));
      } else if (data.status === 404) {
        dispatch(actions.receivedArchived([]));
      }
    } catch (err) {
      dispatch(actions.requestArchivedError(err));
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
        dispatch(actions.deleteArchivedSuccess(orderId));
      }
    } catch (err) {
      dispatch(actions.deleteArchivedError(err));
    }
  };

  return (
    <Wrapper>
      {loadingStatus === "loading" && <Loading />}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          <MyButton onClick={() => history.push("/admin/orders")}>
            Current orders
          </MyButton>
          {archived.length !== 0 ? (
            archived.map((order) => {
              return (
                <SingleOrderBox key={order._id}>
                  <OrderDetails>
                    <p className="completed">{order.status}</p>

                    <p>
                      DATE: {moment(order.date).format("ll")} @{" "}
                      {moment(order.date).format("LT")}
                    </p>
                    <p>DELIVERY OPTION: {order.deliveryMethod}</p>
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
                      <Tooltip action="Delete">
                        <ActionButton
                          aria-label="Delete order"
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
                  </Buttons>
                </SingleOrderBox>
              );
            })
          ) : (
            <p>There are no archived orders.</p>
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
  padding: 30px;
  box-shadow: inset 0 0 50px #bfa984;
  box-sizing: border-box;
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
  :hover {
    background-color: ${COLORS.highlight};
  }

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

export default Archived;
