import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import styled from "styled-components";
import { COLORS } from "../contants";
import TinyCart from "../components/Cart/TinyCart";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(actions.requestLogout());
      const response = await fetch(`/api/users/logout`, {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        dispatch(actions.logoutSuccess(data));
        dispatch(actions.logoutCleanOrders());
        dispatch(actions.logoutCleanProfile());
        dispatch(actions.cleanCart());
        dispatch(actions.logoutCleanUsers());
        dispatch(actions.cleanPath());
      } else {
        dispatch(actions.logoutError(data.message));
      }
    } catch (error) {
      dispatch(actions.logoutError(error));
    }
  };

  return (
    <>
      <Wrapper>
        <Logo>Coffee & Cupcakes</Logo>
        <SecondDiv>
          <NavMenu>
            {!userProfile.isAdmin || (user && user !== "admin") ? (
              <Navlink to="/items">Shop</Navlink>
            ) : null}

            {!user && (
              <Navlink exact to="/cart">
                Cart
              </Navlink>
            )}

            {user ? (
              <>
                {userProfile.isAdmin || user === "admin" ? (
                  <>
                    <Navlink exact to="/admin/">
                      Stats
                    </Navlink>
                    <Navlink to="/admin/orders">Orders</Navlink>
                    <Navlink to="/admin/menu/items/edit/">Edit items</Navlink>
                    <Navlink exact to="/admin/menu/items/add">
                      Add an item
                    </Navlink>
                    <Navlink exact to="/admin/users">
                      Users
                    </Navlink>
                  </>
                ) : (
                  <>
                    <Navlink exact to="/cart">
                      Cart
                    </Navlink>
                    <Navlink strict to="/user/profile">
                      Account
                    </Navlink>
                    <Navlink exact to="/user/orders">
                      Order History
                    </Navlink>
                  </>
                )}
              </>
            ) : (
              <>
                <Navlink exact to="/login">
                  Sign in
                </Navlink>
                <Navlink exact to="/register">
                  Register
                </Navlink>
              </>
            )}
          </NavMenu>
          {user && <Logout onClick={(e) => handleLogout(e)}>SIGN OUT</Logout>}
        </SecondDiv>
      </Wrapper>
      <TinyCartContainer>
        {!userProfile.isAdmin && <TinyCart />}
      </TinyCartContainer>
    </>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Condensed", sans-serif;
  width: 100%;
  background-color: ${COLORS.background};
  z-index: 10;

  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 1000px;
    margin: auto;
  }
`;

const TinyCartContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  margin: auto;
  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 1000px;
  }
`;

const SecondDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  background-color: ${COLORS.background};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fredericka the Great", cursive;
  font-size: 2rem;
  font-weight: bold;
  padding: 20px;
  color: ${COLORS.darkest};
  & > p {
    margin-top: 10px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Roboto Condensed", sans-serif;
  background-color: ${COLORS.background};
  color: #fff;
  padding: 20px;
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  margin-right: 20px;
  color: ${COLORS.darkest};
  &:hover {
    border-bottom: 2px solid ${COLORS.darkest};
  }
  &.active {
    color: ${COLORS.darkest};
    border-bottom: 2px solid ${COLORS.highlight};
  }
`;

const Logout = styled.button`
  background-color: ${COLORS.secondary};
  color: white;
  /* padding: 14px 20px;
  margin: 8px 0; */
  height: 20px;
  border: none;
  background-color: ${COLORS.darkest};
  cursor: pointer;
  align-self: center;
  color: #fff;
  font-family: "Fredericka the Great", cursive;
  :hover {
    background-color: ${COLORS.highlight};
  }
`;

export default Header;
