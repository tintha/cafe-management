import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const EditItem = () => {
  let { id } = useParams();
  const [itemData, setItemData] = useState({});
  const [updateData, setUpdateData] = useState({
    itemName: "",
    description: "",
    image: "",
  });
  const [baseImage, setBaseImage] = useState("");

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItemData({ ...data.data }))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (itemData.itemName) {
      setUpdateData({ ...itemData, itemName: itemData.itemName });
    }
    if (itemData.description) {
      setUpdateData({ ...itemData, description: itemData.description });
    }
    if (itemData.image) {
      setUpdateData({ ...itemData, image: itemData.image });
    }
  }, [itemData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdateItem = (e, id) => {
    e.preventDefault();
    fetch(`/api/items/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...updateData }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          console.log("success");
        }
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
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
  console.log(updateData);
  return (
    <Wrapper>
      Edit item here
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
          <p>Image:</p>

          <input
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <br></br>
          <img src={baseImage} height="200px" alt="" />

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
