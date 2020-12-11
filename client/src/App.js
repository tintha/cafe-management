import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import Admin from "./components/Admin";
import ThankYou from "./components/ThankYou";
import UserCart from "./components/User/UserCart";
import ItemDetails from "./components/Menu/ItemDetails";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Route path="/cart">
              <UserCart />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/thankyou">
              <ThankYou />
            </Route>
            <Route path="/items/:id">
              <ItemDetails />
            </Route>
            <Route path="/items">
              <Home />
            </Route>
            <Route path="/">
              <Redirect to="/items" />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div``;

const Main = styled.div`
  min-height: 50vh;
`;

export default App;
