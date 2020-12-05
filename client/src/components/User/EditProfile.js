import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../redux/actions";

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
    dispatch(actions.requestProfile());
    fetch(`/api/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.profileSuccess(data.data));
      })
      .catch((err) => dispatch(actions.profileError(err)));
  }, [dispatch, user]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleUpdateProfile = (e) => {
    const id = user;
    console.log(id);
    e.preventDefault();
    fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...updatedProfile }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          history.push("/user/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <H2>Profile</H2>
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
            <Button onClick={(e) => handleUpdateProfile(e)}>
              Save changes
            </Button>
          </FieldBox>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const H2 = styled.h2`
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input``;

const FieldBox = styled.div``;

const Button = styled.button``;

export default EditProfile;
