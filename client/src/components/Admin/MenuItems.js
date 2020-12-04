import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const MenuItems = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.items.items);
  const loadingStatus = useSelector((state) => state.items.status);

  useEffect(() => {
    dispatch(actions.requestItems());
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedItems(data.data));
      })
      .catch((err) => dispatch(actions.itemsError(err)));
  }, [dispatch]);

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
    <div>
      Menu items
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {menuItems === null || menuItems === undefined ? (
            <p>No item found.</p>
          ) : (
            menuItems.map((item) => {
              return (
                <div key={item._id}>
                  <p>Item name: {item.itemName}</p>
                  <p>Description: {item.description}</p>
                  <p>Image: {item.image ? item.image : "No image"}</p>
                  <Button>Edit</Button>
                  <Button onClick={(e) => handleDeleteItem(e, item._id)}>
                    Delete
                  </Button>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

const Button = styled.button``;

export default MenuItems;
