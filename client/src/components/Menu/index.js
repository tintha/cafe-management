import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
            <p key={item._id}>
              {item.itemName}, {item.description}
            </p>
          );
        })}
    </div>
  );
};

export default Menu;
