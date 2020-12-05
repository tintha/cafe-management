import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const profile = useSelector((state) => state.profile.profile);
  const loadingStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    dispatch(actions.requestProfile());
    fetch(`/api/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(actions.profileSuccess(data.data));
      })
      .catch((err) => dispatch(actions.profileError(err)));
  }, [dispatch, user]);

  return (
    <Wrapper>
      <h2>Profile</h2>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          <p>
            Name: {profile.firstName && profile.firstName}{" "}
            {profile.lastName && profile.lastName}
          </p>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address && profile.address}</p>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Profile;
