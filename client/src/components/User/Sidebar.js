import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Navlink to="/user/orders">view your orders history</Navlink>
        </li>
        <li>
          <Navlink to="/user/profile">edit your profile</Navlink>
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
