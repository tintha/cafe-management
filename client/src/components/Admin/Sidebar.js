import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../contants";

const Sidebar = () => {
  return (
    <Wrapper>
      <Navlink to="/admin/orders">Orders</Navlink>

      <Navlink exact to="/admin/menu/items">
        Edit/Delete items
      </Navlink>

      <Navlink to="/admin/menu/items/add">Add an item</Navlink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${COLORS.logo};
  width: 100%;
  margin-bottom: 10px;
  border-top: 1px solid #fff;
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  &.active {
    border-bottom: 2px solid #fff;
  }
`;

export default Sidebar;
