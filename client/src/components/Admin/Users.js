import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";
import { FaTrash } from "react-icons/fa";

const Users = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const users = useSelector((state) => state.users.users);
  const loadingStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      dispatch(actions.receivedUsers(data.data));
    } catch (err) {
      dispatch(actions.requestUsersError(err));
    }
  };

  const handleDeleteUser = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        addToast("User deleted", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(actions.deleteUsersSuccess(userId));
      }
    } catch (err) {
      dispatch(actions.deleteUsersError(err));
    }
  };

  return (
    <Wrapper>
      {loadingStatus === "loading" && <Loading />}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {users !== "No user found" ? (
            users.map((user) => {
              return (
                <SingleUserBox key={user._id}>
                  <UserElement>
                    <p>
                      <Bold>Username</Bold>: {user._id}
                    </p>
                  </UserElement>
                  <UserElement>
                    <p>
                      <Bold>Full Name</Bold>: {user.firstName} {user.lastName}
                    </p>
                  </UserElement>
                  <UserElement>
                    <p>
                      <Bold>Email</Bold>: {user.email}
                    </p>
                  </UserElement>
                  <UserElement>
                    <p>
                      <Bold>Address</Bold>: {user.address.line1}{" "}
                      {user.address.city} {user.address.postalCode}
                    </p>
                  </UserElement>
                  <Actions>
                    <ActionButton
                      onClick={(e) =>
                        window.confirm(
                          "This action cannot be undone! Are you sure you wish to delete this user?"
                        ) && handleDeleteUser(e, user._id)
                      }
                    >
                      <FaTrash />
                    </ActionButton>
                  </Actions>
                </SingleUserBox>
              );
            })
          ) : (
            <p>There are no registered users.</p>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  width: 100%;
  & > h2 {
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 10px;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
  }
`;

const SingleUserBox = styled.div`
  border: 1px solid ${COLORS.lightBorders};
  width: 100%;
  padding: 10px;
  box-shadow: inset 0 0 10px #bfa984;
  & > p {
    margin-bottom: 10px;
  }
  .new {
    color: ${COLORS.highlight2};
    font-weight: bold;
    text-transform: uppercase;
  }
  .completed {
    font-weight: bold;
    text-transform: uppercase;
  }

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 160px 200px 200px auto 30px;
    justify-items: start;
  }
`;

const UserElement = styled.div``;

const Actions = styled.div``;

const Bold = styled.span`
  font-weight: bold;
`;

const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${COLORS.darkest};
  cursor: pointer;
  :hover {
    color: ${COLORS.highlight2};
  }
`;

export default Users;
