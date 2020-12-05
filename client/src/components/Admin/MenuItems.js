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

  useEffect(() => {
    dispatch(actions.requestItems());
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedItems(data.data));
      })
      .catch((err) => dispatch(actions.itemsError(err)));
  }, []);

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
                <ItemBox key={item._id}>
                  <p>
                    <Bold>Item name</Bold>: {item.itemName}
                  </p>
                  <p>
                    <Bold>Description</Bold>: {item.description}
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
        </>
      )}
    </div>
  );
};

const Button = styled.button``;

const Input = styled.input``;

const ItemBox = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

export default MenuItems;
