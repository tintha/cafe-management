import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import { GrFormCheckmark } from "react-icons/gr";

const Login = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const lastLocation = useSelector((state) => state.location.path);
  const redirectUser = lastLocation ? lastLocation : "/items";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(actions.requestLogin());
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 401) {
        dispatch(actions.loginError(data.message));
        setTimeout(() => {
          dispatch(actions.loginClearError());
        }, 2000);
        addToast(data.message, {
          appearance: "error",
        });
      } else {
        dispatch(actions.loginSuccess(data.data));
      }
    } catch (err) {
      dispatch(actions.loginError(err));
    }
  };

  return (
    <Wrapper>
      {user ? (
        <>
          {userProfile.isAdmin === true ? (
            <Redirect to="/admin/orders" />
          ) : (
            <Redirect to={redirectUser} />
          )}
        </>
      ) : (
        <>
          <LeftCol>
            <p>
              Don't have an account? You can create one{" "}
              <Link to="/register">here</Link>.
            </p>
            <p className="bold">Benefits of signing in:</p>
            <p>
              <GrFormCheckmark />
              Faster checkout
            </p>
            <p>
              <GrFormCheckmark />
              Leave reviews and ratings
            </p>
            <p>
              <GrFormCheckmark />
              Track your orders
            </p>
            <p>
              <GrFormCheckmark />
              View your order history
            </p>
          </LeftCol>
          <RightCol>
            <FieldBox>
              <label htmlFor="username">
                *Username<br></br>
                <LoginInput
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </FieldBox>
            <FieldBox>
              <label htmlFor="password">
                *Password<br></br>
                <LoginInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </FieldBox>
            <FieldBox>
              <Submit type="submit" onClick={(e) => handleSubmit(e)}>
                Login
              </Submit>
            </FieldBox>
          </RightCol>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  align-items: center;
  & > p {
    margin: 20px;
  }

  @media only screen and (min-width: 768px) {
    margin: auto;
    max-width: 1000px;
    display: grid;
    grid-template-columns: 250px 400px;
    justify-content: center;
    align-items: start;
  }
`;

const LeftCol = styled.div`
  padding-bottom: 20px;
  .bold {
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  @media only screen and (min-width: 768px) {
    padding-right: 20px;
  }
`;

const RightCol = styled.div``;

const LoginInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${COLORS.inputBackground};
  font-size: 1rem;
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  color: ${COLORS.error};
  font-weight: bold;
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
    padding: 2px;
    width: 100px;
  }
`;

export default Login;
