import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.items.items);
  const loadingStatus = useSelector((state) => state.items.status);

  useEffect(() => {
    // dispatch(actions.requestItems());
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedItems(data.data));
      })
      .catch((err) => dispatch(actions.itemsError(err)));
  }, [dispatch]);

  return (
    <Wrapper>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {menuItems === null || menuItems === undefined ? (
            <p>No item found.</p>
          ) : (
            menuItems.map((item) => {
              const { _id, itemName, description, price } = item;
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.price / 100);
              return (
                <ItemBox key={item._id}>
                  <ItemTitle>{item.itemName}</ItemTitle>
                  <p>{item.description}</p>
                  {item.image && (
                    <img src={item.image} alt={item.itemName} width="200" />
                  )}
                  <br></br>
                  <AddToCartBtn
                    onClick={() =>
                      dispatch(
                        actions.addItem({ _id, itemName, description, price })
                      )
                    }
                  >
                    Add to Cart — {formattedPrice}
                  </AddToCartBtn>
                </ItemBox>
              );
            })
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const ItemBox = styled.div`
  border: 1px solid gray;
  padding: 10px;
  margin: 10px;
`;

const ItemTitle = styled.h4`
  font-weight: bold;
  font-size: 1.5rem;
`;

const AddToCartBtn = styled.button``;

export default Menu;
