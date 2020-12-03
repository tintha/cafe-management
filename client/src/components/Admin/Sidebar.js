import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Navlink to="/admin/orders">
            view all orders, change their status
          </Navlink>
        </li>
        <li>
          <Navlink to="/admin/menu">edit the menu</Navlink>
        </li>
      </ul>
    </div>
  );
};

const Navlink = styled(NavLink)`
  text-decoration: none;
  &.active {
    border-bottom: 2px solid purple;
  }
`;

export default Sidebar;
