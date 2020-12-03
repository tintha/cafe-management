import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const error = useSelector((state) => state.auth.registerError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    dispatch(actions.requestRegistration());
    fetch(`/api/users/`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
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

  if (user) {
    return <Redirect to="/user" />;
  } else {
    return (
      <div>
        <p>Register</p>
        <LoginInput
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Submit type="submit" onClick={(e) => handleRegister(e)}>
          Register
        </Submit>
        {error && <p>{error}</p>}
      </div>
    );
  }
};

const LoginInput = styled.input`
  margin: 20px;
`;

const Submit = styled.button``;

export default Register;
