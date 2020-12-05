import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const error = useSelector((state) => state.auth.loginError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.requestLogin());
    fetch(`/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 401) {
          dispatch(actions.loginError(data.message));
        } else {
          dispatch(actions.loginSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(actions.loginError(error));
      });
  };

  return (
    <div>
      {user ? (
        <>
          {userProfile.isAdmin === true ? (
            <Redirect to="/admin" />
          ) : (
            <Redirect to="/user/cart" />
          )}
        </>
      ) : (
        <>
          <p>
            Don't have an account? You can create one{" "}
            <Link to="/register">here</Link>.
          </p>
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
          <Submit type="submit" onClick={(e) => handleSubmit(e)}>
            Login
          </Submit>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

const LoginInput = styled.input`
  margin: 20px;
`;

const Submit = styled.button``;

export default Login;
