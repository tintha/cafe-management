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
        <p>Hello {userProfile.fullName},</p>
        <p>As an administrator, here you can:</p>
        <Sidebar />
        <Switch>
          <Route path="/admin/orders">
            <Orders />
          </Route>
          <Route path="/admin/menu">
            <Menu />
          </Route>
        </Switch>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div``;

export default Admin;
