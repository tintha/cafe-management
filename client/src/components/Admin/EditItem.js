import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { options } from "./categories";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";

const EditItem = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [itemData, setItemData] = useState({});
  const [updateData, setUpdateData] = useState({
    itemName: "",
    description: "",
    category: "Cupcakes",
    price: "",
    image: "",
  });
  const [currentImage, setCurrentImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/items/${id}`);
      const data = await response.json();
      setItemData({ ...data.data });
      setIsLoading(!isLoading);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (itemData.itemName) {
      setUpdateData({ ...itemData, itemName: itemData.itemName });
    }
    if (itemData.description) {
      setUpdateData({ ...itemData, description: itemData.description });
    }
    if (itemData.category) {
      setUpdateData({ ...itemData, description: itemData.category });
    }
    if (itemData.price) {
      setUpdateData({ ...itemData, price: itemData.price });
    }
    if (itemData.image) {
      setUpdateData({ ...itemData, image: itemData.image });
      setCurrentImage(itemData.image);
    }
  }, [itemData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdateItem = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...updateData }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === 200) {
        history.push("/admin/menu/items/edit");
        dispatch(actions.editMenuItemSuccess(id, updateData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCurrentImage(base64);
    setUpdateData({ ...updateData, image: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Wrapper>
      <h2>Edit item</h2>
      {isLoading && (
        <LoadingCentered>
          <Loading />
        </LoadingCentered>
      )}
      {itemData.itemName && itemData.description && (
        <>
          <p>Item Name:</p>
          <Input
            type="text"
            name="itemName"
            value={updateData.itemName}
            onChange={handleChange}
          />
          <p>Item description:</p>
          <Textarea
            type="text"
            name="description"
            value={updateData.description}
            onChange={handleChange}
          />
          <select
            value={updateData.category}
            onChange={(e) => handleChange(e)}
            name="category"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p>Price:</p>
          <Input
            type="text"
            name="price"
            value={updateData.price}
            onChange={handleChange}
          />
          <p>Image:</p>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <br></br>
          {currentImage && <img src={currentImage} height="200px" alt="" />}
          <br></br>
          <Button onClick={(e) => handleUpdateItem(e, id)}>Save changes</Button>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  & > h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 10px;
  }
  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 400px;
    margin: auto;
  }
`;

const LoadingCentered = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  background-color: ${COLORS.inputBackground};
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 1rem;
  padding: 12px 20px;
  margin: 8px 0;
  background-color: ${COLORS.inputBackground};
`;

const Button = styled.button`
  width: 100%;
  background-color: ${COLORS.primary};
  color: ${COLORS.inputText};
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  @media only screen and (min-width: 992px) {
    /* desktop */
    padding: 2px;
    width: 100px;
  }
`;

export default EditItem;
