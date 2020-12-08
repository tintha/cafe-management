import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { options } from "./categories";
import { COLORS } from "../../contants";

const AddItem = () => {
  const history = useHistory();
  const [updateData, setUpdateData] = useState({
    itemName: "",
    description: "",
    category: "Cupcakes",
    price: "",
    image: "",
  });
  const [currentImage, setCurrentImage] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/items/", {
        method: "POST",
        body: JSON.stringify({ ...updateData }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        history.push("/admin/menu/items");
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
      <h2>Add a new item</h2>
      <FieldBox>
        <p>Item Name:</p>
        <Input
          type="text"
          name="itemName"
          value={updateData.itemName}
          onChange={(e) => handleChange(e)}
        />
      </FieldBox>
      <FieldBox>
        <p>Item description:</p>
        <Textarea
          type="text"
          name="description"
          value={updateData.description}
          onChange={(e) => handleChange(e)}
        />
      </FieldBox>
      <FieldBox>
        <label htmlFor="categories">Choose a category:</label>
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
      </FieldBox>
      <FieldBox>
        <p>Price:</p>
        <Input
          type="text"
          name="price"
          value={updateData.price}
          onChange={(e) => handleChange(e)}
        />
      </FieldBox>
      <FieldBox>
        <p>Image:</p>
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        {currentImage && <img src={currentImage} height="200px" alt="" />}
      </FieldBox>
      <Button onClick={(e) => handleAddItem(e)}>Add item</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  width: 100%;
  min-height: 100vh;
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

const FieldBox = styled.div``;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
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
`;

const Button = styled.button`
  width: 100%;
  background-color: ${COLORS.primary};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default AddItem;
