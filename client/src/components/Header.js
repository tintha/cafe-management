import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Logo>Logo</Logo>

      <NavMenu>
        <Navlink exact to="/">
          Home
        </Navlink>
        <Navlink exact to="/login">
          Login
        </Navlink>
      </NavMenu>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  border: 1px solid black;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div``;

const NavMenu = styled.div``;

const Navlink = styled(NavLink)`
  text-decoration: none;
  margin-right: 20px;
  &.active {
    text-decoration: underline;
  }
`;

export default Header;
