import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";

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

  const handleRegister = async (e) => {
    dispatch(actions.requestRegistration());
    try {
      const response = await fetch(`/api/users/`, {
        method: "POST",
        body: JSON.stringify({ ...newUser }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 500) {
        dispatch(actions.registrationError(data.message));
        setTimeout(() => {
          dispatch(actions.clearRegistrationError());
        }, 2000);
      } else {
        dispatch(actions.registrationSuccess(data.data));
      }
    } catch (err) {
      dispatch(actions.registrationError(err));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  if (user) {
    return <Redirect to="/user/profile" />;
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
          <Error>{error && <p>{error}</p>}</Error>
        </FieldBox>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Condensed", sans-serif;
  align-items: center;
  & > p {
    margin: 20px;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 400px;
    margin: auto;
  }
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  color: ${COLORS.error};
  font-weight: bold;
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const LoginInput = styled.input`
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

const Submit = styled.button`
  width: 100%;
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  font-family: "Fredericka the Great", cursive;
  :hover {
    background-color: ${COLORS.highlight};
  }
  @media only screen and (min-width: 992px) {
    /* desktop */
    padding: 2px;
    width: 100px;
  }
`;

export default Register;
