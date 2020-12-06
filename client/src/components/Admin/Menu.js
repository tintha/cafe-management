import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import MenuItems from "./MenuItems";
import EditItem from "./EditItem";
import AddItem from "./AddItem";

const Menu = () => {
  return (
    <Wrapper>
      <MenuSidebar>
        <ul>
          <li>
            <Navlink to="/admin/menu/items">Edit items</Navlink>
          </li>
          <li>
            <Navlink to="/admin/menu/items/add">Add an item</Navlink>
          </li>
        </ul>
      </MenuSidebar>
      <MenuContent>
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
      </MenuContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const MenuSidebar = styled.div`
  margin-right: 20px;
  width: 150px;
`;

const MenuContent = styled.div``;

const Navlink = styled(NavLink)`
  &.active {
    color: red;
  }
`;

export default Menu;
