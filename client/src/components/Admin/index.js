import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Orders from "./Orders";
import Menu from "./Menu";
import Archived from "./Archived";

const Admin = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);

  if (
    !user ||
    (user && userProfile.isAdmin !== true) ||
    (user && user !== "admin")
  ) {
    return <Redirect to="/" />;
  } else {
    return (
      <Wrapper>
        <LeftContainer></LeftContainer>
        <RightContainer>
          <Switch>
            <Route path="/admin/orders/archived">
              <Archived />
            </Route>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 1000px;
    margin: auto;
  }
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  padding: 20px;
`;

export default Admin;
