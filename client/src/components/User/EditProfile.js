import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const profile = useSelector((state) => state.profile.profile);
  const loadingStatus = useSelector((state) => state.profile.status);
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    address: profile.address,
  });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/users/${user}`);
      const data = await response.json();
      dispatch(actions.profileSuccess(data.data));
    } catch (err) {
      dispatch(actions.profileError(err));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    const id = user;
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...updatedProfile }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        history.push("/user/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/user/profile");
  };

  return (
    <Wrapper>
      <H2>Edit Profile</H2>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          <p>Username: {user}</p>
          <FieldBox>
            <label>
              First Name:{" "}
              <Input
                type="text"
                name="firstName"
                value={updatedProfile.firstName}
                onChange={handleChange}
              />
            </label>
          </FieldBox>
          <FieldBox>
            <label>
              Last Name:
              <Input
                type="text"
                name="lastName"
                value={updatedProfile.lastName}
                onChange={handleChange}
              />
            </label>
          </FieldBox>
          <FieldBox>
            <label>
              Email:
              <Input
                type="text"
                name="email"
                value={updatedProfile.email}
                onChange={handleChange}
              />
            </label>
          </FieldBox>
          <FieldBox>
            <label>
              Address:
              <Input
                type="text"
                name="address"
                value={updatedProfile.address}
                onChange={handleChange}
              />
            </label>
          </FieldBox>
          <FieldBox>
            <Buttons>
              <Button onClick={(e) => handleCancel(e)}>Cancel</Button>
              <Button onClick={(e) => handleUpdateProfile(e)}>
                Save changes
              </Button>
            </Buttons>
          </FieldBox>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Condensed", sans-serif;
  align-items: center;
  width: 100%;
  & > p {
    margin: 20px;
  }
`;

const H2 = styled.h2`
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${COLORS.secondary};
  color: white;
  padding: 14px 14px;
  margin-left: 1px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export default EditProfile;
