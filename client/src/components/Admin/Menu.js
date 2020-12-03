import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(actions.requestItems());
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedItems(data.data));
      })
      .catch((err) => dispatch(actions.itemsError(err)));
  }, [dispatch]);

  return (
    <div>
      {menuItems &&
        menuItems.map((item) => {
          return (
            <div key={item._id}>
              <p>
                {item.itemName}, {item.description}
              </p>
              <Button>Edit</Button>
            </div>
          );
        })}
    </div>
  );
};

const Button = styled.button``;

export default Menu;
