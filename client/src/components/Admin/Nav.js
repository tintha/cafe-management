import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../contants";

const Sidebar = () => {
  return (
    <Wrapper>
      <Navlink to="/admin/orders">Orders</Navlink>
      <Navlink exact to="/admin/menu/items">
        Edit items
      </Navlink>
      <Navlink to="/admin/menu/items/add">Add an item</Navlink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${COLORS.background};
  margin-bottom: 10px;
  font-family: "Roboto Condensed", sans-serif;
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  color: ${COLORS.darkest};
  margin-left: 10px;
  margin-right: 10px;
  &.active {
    border-bottom: 2px solid ${COLORS.highlight};
  }
`;

export default Sidebar;
