import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Main>
          <Switch>
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  border: 1px solid red;
`;

const Main = styled.div`
  border: 1px solid blue;
  padding: 20px;
`;

export default App;
