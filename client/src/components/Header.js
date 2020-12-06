import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import styled from "styled-components";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.requestLogout());
    fetch(`/api/users/logout`, {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          dispatch(actions.logoutSuccess(data));
          dispatch(actions.logoutCleanOrders());
          dispatch(actions.logoutCleanProfile());
          dispatch(actions.cleanCart());
        } else {
          dispatch(actions.logoutError(data.message));
        }
      })
      .catch((error) => {
        dispatch(actions.logoutError(error));
      });
  };

  return (
    <Wrapper>
      <Logo>Logo</Logo>
      {user && <span>Welcome, {userProfile.firstName}!</span>}
      <NavMenu>
        <Navlink exact to="/">
          Home
        </Navlink>
        {user ? (
          <>
            {userProfile.isAdmin ? (
              <Navlink exact to="/admin">
                Admin Dashboard
              </Navlink>
            ) : (
              <>
                <Navlink exact to="/user/cart">
                  Your Order
                </Navlink>
                <Navlink exact to="/user/profile">
                  Profile
                </Navlink>
                <Navlink exact to="/user/orders">
                  History
                </Navlink>
              </>
            )}

            <Logout onClick={(e) => handleLogout(e)}>Sign Out</Logout>
          </>
        ) : (
          <>
            <Navlink exact to="/login">
              Sign in
            </Navlink>
          </>
        )}
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

const Logout = styled.button``;

export default Header;
