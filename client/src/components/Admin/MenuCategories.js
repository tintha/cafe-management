import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const MenuCategories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((state) => state.categories.categories);
  const loadingStatus = useSelector((state) => state.categories.status);
  const [newCategory, setNewCategory] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // dispatch(actions.requestItems());
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.receivedCategories(data.data));
      })
      .catch((err) => dispatch(actions.categoriesError(err)));
  }, [dispatch, reload]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    fetch("/api/categories/", {
      method: "POST",
      body: JSON.stringify({ categoryName: newCategory }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setReload(!reload);
        setNewCategory("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCategory = (e, categoryId) => {
    e.preventDefault();
    fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setReload(!reload);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <Wrapper>
      <p>Categories</p>
      <>
        <Input
          type="text"
          name="categoryName"
          value={newCategory}
          onChange={handleChange}
        />
        <Button onClick={(e) => handleAddCategory(e)}>Add new category</Button>
      </>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {categories === undefined ? (
            <p>No categories found.</p>
          ) : (
            categories.map((category) => {
              return (
                <CategoryBox key={category._id}>
                  <p>{category.categoryName}</p>
                  <Button
                    onClick={() =>
                      history.push(`/admin/menu/categories/${category._id}`)
                    }
                  >
                    Rename
                  </Button>{" "}
                  <Button
                    onClick={(e) => handleDeleteCategory(e, category._id)}
                  >
                    Delete
                  </Button>
                </CategoryBox>
              );
            })
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CategoryBox = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px;
`;

const Button = styled.button``;

const Input = styled.input``;

export default MenuCategories;
