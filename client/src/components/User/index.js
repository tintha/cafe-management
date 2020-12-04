import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";
import Orders from "./Orders";
import Profile from "./Profile";

const User = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);
  if (!user) {
    return <Redirect to="/" />;
  } else {
    return (
      <Wrapper>
        <p>Hello {userProfile.fullName},</p>
        <p>As an customer, here you can:</p>
        <Sidebar />
        <Switch>
          <Route exact path="/user/orders">
            <Orders />
          </Route>
          <Route exact path="/user/profile">
            <Profile />
          </Route>
        </Switch>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div``;

export default User;
