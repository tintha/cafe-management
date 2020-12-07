import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Orders from "./Orders";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import UserCart from "./UserCart";

const User = () => {
  const user = useSelector((state) => state.auth.currentUser);
  if (!user) {
    return <Redirect to="/" />;
  } else {
    return (
      <Wrapper>
        <RightContainer>
          <Switch>
            <Route path="/user/orders">
              <Orders />
            </Route>
            <Route exact path="/user/profile/edit">
              <EditProfile />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/user/cart">
              <UserCart />
            </Route>
          </Switch>
        </RightContainer>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  padding: 30px;
`;

const RightContainer = styled.div``;

export default User;
