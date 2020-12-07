import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const MenuItems = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.items.items);
  const loadingStatus = useSelector((state) => state.items.status);

  // useEffect(() => {
  //   // dispatch(actions.requestItems());
  //   fetch("/api/items")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch(actions.receivedItems(data.data));
  //     })
  //     .catch((err) => dispatch(actions.itemsError(err)));
  // }, [dispatch]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      dispatch(actions.receivedItems(data.data));
    } catch (err) {
      dispatch(actions.itemsError(err));
    }
  };

  const handleDeleteItem = (e, itemId) => {
    e.preventDefault();
    fetch(`/api/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(actions.deleteItemSuccess(json.itemId));
        }
      })
      .catch((err) => dispatch(actions.deleteItemError()));
  };

  return (
    <Wrapper>
      <p>Menu items</p>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <DisplayItemContainer>
          {menuItems === null || menuItems === undefined ? (
            <p>No item found.</p>
          ) : (
            menuItems.map((item) => {
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.price / 100);
              return (
                <ItemBox key={item._id}>
                  <p>
                    <Bold>Item name</Bold>: {item.itemName}
                  </p>
                  <p>
                    <Bold>Description</Bold>: {item.description}
                  </p>
                  <p>
                    <Bold>Category</Bold>: {item.category}
                  </p>
                  <p>
                    <Bold>Price</Bold>: {formattedPrice}
                  </p>
                  <p>
                    <Bold>Image</Bold>:{" "}
                    {item.image ? (
                      <img src={item.image} alt="" width="200" />
                    ) : (
                      "No image"
                    )}
                  </p>
                  <Button
                    onClick={() =>
                      history.push(`/admin/menu/items/${item._id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button onClick={(e) => handleDeleteItem(e, item._id)}>
                    Delete
                  </Button>
                </ItemBox>
              );
            })
          )}
        </DisplayItemContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const DisplayItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Button = styled.button``;

const ItemBox = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 230px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

export default MenuItems;
