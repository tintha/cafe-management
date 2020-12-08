import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import { RiAccountBoxLine } from "react-icons/ri";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const profile = useSelector((state) => state.profile.profile);
  const loadingStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      dispatch(actions.requestProfile());
      const response = await fetch(`/api/users/${user}`);
      const data = await response.json();
      dispatch(actions.profileSuccess(data.data));
    } catch (err) {
      dispatch(actions.profileError(err));
    }
  };

  return (
    <Wrapper>
      {loadingStatus === "loading" && <p>loading...</p>}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          <TopDiv>
            <RiAccountBoxLine size="100" />
            <h3>
              {profile.firstName} {profile.lastName}
            </h3>
          </TopDiv>
          <FieldBox>First Name: {profile.firstName}</FieldBox>
          <FieldBox>Last Name: {profile.lastName}</FieldBox>
          <FieldBox>Username: {user}</FieldBox>
          <FieldBox>Address: {profile.address}</FieldBox>
          <FieldBox>
            <Button onClick={() => history.push("/user/profile/edit")}>
              Edit
            </Button>
          </FieldBox>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  border: 1px solid ${COLORS.lightmint};
  border-radius: 4px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  & > h3 {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const FieldBox = styled.div`
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${COLORS.secondary};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export default Profile;
