import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Orders from "./Orders";
import Menu from "./Menu";

const Admin = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!user || (user && userProfile.isAdmin !== true)) {
    return <Redirect to="/" />;
  } else {
    return (
      <Wrapper>
        <LeftContainer>
          <p>Hello {userProfile.fullName},</p>
          <p>As an administrator, here you can:</p>
          <Sidebar />
        </LeftContainer>
        <RightContainer>
          <Switch>
            <Route path="/admin/orders">
              <Orders />
            </Route>
            <Route path="/admin/menu">
              <Menu />
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

export default Admin;
