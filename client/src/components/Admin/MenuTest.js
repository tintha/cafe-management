import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import MenuItems from "./MenuItems";
import MenuCategories from "./MenuCategories";
import EditItem from "./EditItem";

const Menu = () => {
  return (
    <Wrapper>
      <MenuSidebar>
        <ul>
          <li>
            <Navlink to="/admin/menu/categories">Edit categories</Navlink>
          </li>
          <li>
            <Navlink to="/admin/menu/items">Edit items</Navlink>
          </li>
        </ul>
      </MenuSidebar>
      <MenuContent>
        <Switch>
          <Route exact path="/admin/menu/categories">
            <MenuCategories />
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
`;

const MenuContent = styled.div``;

const Navlink = styled(NavLink)`
  &.active {
    color: red;
  }
`;

export default Menu;