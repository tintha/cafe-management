import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import { FaUser } from "react-icons/fa";
import Loading from "../Loading";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const profile = useSelector((state) => state.auth.userProfile);
  const loadingStatus = useSelector((state) => state.auth.status);
  // const profile = useSelector((state) => state.profile.profile);
  // const loadingStatus = useSelector((state) => state.profile.status);

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = async () => {
  //   try {
  //     const response = await fetch(`/api/users/${user}`);
  //     const data = await response.json();
  //     dispatch(actions.profileSuccess(data.data));
  //   } catch (err) {
  //     dispatch(actions.profileError(err));
  //   }
  // };

  return (
    <Wrapper>
      {loadingStatus === "loading" && (
        <LoadingCentered>
          <Loading />
        </LoadingCentered>
      )}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <Content>
          <TopDiv>
            <FaUser size="60" style={{ color: `${COLORS.darkest}` }} />
            <h3>
              {profile.firstName} {profile.lastName}
            </h3>
          </TopDiv>
          <FieldBox>First Name: {profile.firstName}</FieldBox>
          <FieldBox>Last Name: {profile.lastName}</FieldBox>
          <FieldBox>Username: {user}</FieldBox>
          <FieldBox>
            <AddressBox>
              <div>Address:</div>
              <div>
                <p>{profile.address.line1}</p>
                <p>{profile.address.city}</p>
                <p>{profile.address.postalCode}</p>
              </div>
            </AddressBox>
          </FieldBox>
          <FieldBox>
            <Button onClick={() => history.push("/user/profile/edit")}>
              Edit
            </Button>
          </FieldBox>
        </Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
`;

const LoadingCentered = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLORS.darkest};
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  & > h3 {
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const FieldBox = styled.div`
  font-size: 1rem;
  margin-top: 20px;
`;

const Button = styled.button`
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

  @media only screen and (min-width: 768px) {
    /* tablet and desktop */
    max-width: 100px;
    padding: 2px;
  }
`;

const AddressBox = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
`;

export default Profile;
