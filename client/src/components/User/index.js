import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";
import Orders from "./Orders";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import UserCart from "./UserCart";

const User = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);
  if (!user) {
    return <Redirect to="/" />;
  } else {
    return (
      <Wrapper>
        <LeftContainer>
          <p>{userProfile.firstName}</p>
          <Sidebar />
        </LeftContainer>
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
            <Route path="/user">
              <UserCart />
            </Route>
          </Switch>
        </RightContainer>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  padding: 30px;
`;

const LeftContainer = styled.div`
  margin-right: 30px;
`;

const RightContainer = styled.div``;

export default User;
