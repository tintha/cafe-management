import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const error = useSelector((state) => state.auth.registerError);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    dispatch(actions.requestRegistration());
    fetch(`/api/users/`, {
      method: "POST",
      body: JSON.stringify({ ...newUser }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          dispatch(actions.registrationError(data.message));
        } else {
          dispatch(actions.registrationSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(actions.registrationError(error));
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  if (user) {
    return <Redirect to="/user" />;
  } else {
    return (
      <Wrapper>
        <p>Register</p>
        <FieldBox>
          <label>
            First Name
            <LoginInput
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </FieldBox>
        <FieldBox>
          <label>
            Last Name
            <LoginInput
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </FieldBox>
        <FieldBox>
          <label>
            Email
            <LoginInput
              type="text"
              name="email"
              value={newUser.email}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </FieldBox>
        <FieldBox>
          <label>
            Username
            <LoginInput
              type="text"
              name="username"
              value={newUser.username}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </FieldBox>
        <FieldBox>
          <label>
            Password
            <LoginInput
              type="password"
              name="password"
              value={newUser.password}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </FieldBox>
        <FieldBox>
          <Submit type="submit" onClick={(e) => handleRegister(e)}>
            Register
          </Submit>
          {error && <p>{error}</p>}
        </FieldBox>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div``;

const FieldBox = styled.div``;

const LoginInput = styled.input`
  margin: 20px;
`;

const Submit = styled.button``;

export default Register;
