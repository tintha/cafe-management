import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import MenuItems from "./MenuItems";
import EditItem from "./EditItem";
import AddItem from "./AddItem";

const Menu = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/admin/menu/items/add">
          <AddItem />
        </Route>
        <Route path="/admin/menu/items/:id">
          <EditItem />
        </Route>
        <Route path="/admin/menu/items">
          <MenuItems />
        </Route>
      </Switch>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Menu;
