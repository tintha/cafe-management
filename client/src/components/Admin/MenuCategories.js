import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const MenuCategories = () => {
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
    <div>
      Categories
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
                  <p>
                    {item.itemName}, {item.description}
                  </p>
                  <Button>Edit</Button>
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

export default MenuCategories;
