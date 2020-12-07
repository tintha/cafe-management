import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import styled from "styled-components";
import { GiCupcake } from "react-icons/gi";
import { BsHouse } from "react-icons/bs";
import { BiLogOut, BiUser } from "react-icons/bi";
import { IoCartOutline, IoClipboardOutline } from "react-icons/io5";
import { COLORS } from "../contants";

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
      <Logo>
        <GiCupcake style={{ color: `${COLORS.logo}` }} size="50" />
      </Logo>

      <NavMenu>
        <Navlink exact to="/">
          Home
        </Navlink>
        {user ? (
          <>
            {userProfile.isAdmin ? (
              <Navlink strict to="/admin">
                Admin Dashboard
              </Navlink>
            ) : (
              <>
                <Navlink exact to="/user/cart">
                  Cart
                </Navlink>
                <Navlink exact to="/user/profile">
                  Profile
                </Navlink>
                <Navlink exact to="/user/orders">
                  History
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
      {user && <Logout onClick={(e) => handleLogout(e)}>Sign Out</Logout>}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Condensed", sans-serif;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-family: "Euphoria Script", cursive; */
  /* font-family: "Sacramento", cursive; */
  font-family: "Roboto Condensed", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  & > p {
    margin-top: 10px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Roboto Condensed", sans-serif;
  background-color: ${COLORS.logo};
  color: #fff;
  padding: 20px;
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  margin-right: 20px;
  color: #fff;
  &:hover {
    border-bottom: 2px solid ${COLORS.lightGray};
  }
  &.active {
    color: ${COLORS.lightmint};
    border-bottom: 2px solid ${COLORS.lightmint};
  }
`;

const Logout = styled.button`
  width: 100%;
  background-color: ${COLORS.secondary};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Header;
