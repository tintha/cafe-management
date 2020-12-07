import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { options } from "./categories";
import * as actions from "../../redux/actions";

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

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/items/${id}`);
      const data = await response.json();
      setItemData({ ...data.data });
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
        history.push("/admin/menu/items");
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
      Edit single item here
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
          <Textarea
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

          <Button onClick={(e) => handleUpdateItem(e, id)}>Save changes</Button>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

export default EditItem;
