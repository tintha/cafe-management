import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Profile = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.userProfile);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {userProfile.fullName && userProfile.fullName}</p>
      <p>Username: {user}</p>
      <p>Email: {userProfile.email && userProfile.email}</p>
      <p>Address: {userProfile.address && userProfile.address}</p>
    </div>
  );
};

export default Profile;
