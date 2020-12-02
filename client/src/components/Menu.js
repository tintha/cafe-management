import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestItems, receivedItems, itemsError } from "../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(requestItems());
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receivedItems(data.data));
      })
      .catch((err) => dispatch(itemsError(err)));
  }, []);

  return (
    <div>
      {menuItems &&
        menuItems.map((item) => {
          return (
            <p key={item._id}>
              {item.itemName}, {item.description}
            </p>
          );
        })}
    </div>
  );
};

export default Menu;
