import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const AddItem = () => {
  const history = useHistory();
  const [updateData, setUpdateData] = useState({
    itemName: "",
    description: "",
    price: "",
    image: "",
  });
  const [currentImage, setCurrentImage] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    fetch("/api/items/", {
      method: "POST",
      body: JSON.stringify({ ...updateData }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          history.push("/admin/menu/items");
        }
      })
      .catch((err) => console.log(err));
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
      Add item here
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
      <Button onClick={(e) => handleAddItem(e)}>Add item</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

export default AddItem;
