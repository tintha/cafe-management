import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Navlink to="/admin/orders">Manage Orders</Navlink>
        </li>
        <li>
          <Navlink exact to="/admin/menu/items">
            Edit/Delete items
          </Navlink>
        </li>
        <li>
          <Navlink to="/admin/menu/items/add">Add an item</Navlink>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 250px;
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  &.active {
    border-bottom: 2px solid purple;
  }
`;

export default Sidebar;
