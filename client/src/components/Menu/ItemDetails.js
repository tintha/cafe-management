import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";
import { TiMediaPlayReverse } from "react-icons/ti";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const ItemDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const lastLocation = location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [reviewError, setReviewError] = useState(null);
  const [itemData, setItemData] = useState({});
  const user = useSelector((state) => state.auth.currentUser);

  const hasReviewed =
    itemData.reviews && itemData.reviews.find((review) => review.user === user);

  const [review, setReview] = useState({
    user: user,
    displayName: "",
    review: "",
    rating: "",
    date: new Date(),
  });

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/items/${id}`);
      const data = await response.json();
      setItemData({ ...data.data });
      setIsLoading(!isLoading);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReview({ ...review, [name]: value });
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/items/${id}/review`, {
        method: "PATCH",
        body: JSON.stringify({ ...review }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === 200) {
        window.location.reload();
      } else {
        setReviewError(data.message);
        setTimeout(() => {
          setReviewError(null);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBack = (e) => {
    history.push("/items/");
  };

  const handleKeyPressBack = (e) => {
    if (e.code === "Enter") {
      history.push("/items/");
    }
  };

  const handleRedirectReview = (e, lastLocation) => {
    e.preventDefault();
    dispatch(actions.redirectAfterLogin(lastLocation));
    history.push("/login");
  };

  return (
    <Wrapper>
      <PageTitle>
        <span>
          <TiMediaPlayReverse
            size="36"
            tabIndex="0"
            onClick={(e) => handleClickBack(e)}
            onKeyDown={(e) => handleKeyPressBack(e)}
            aria-label="Go back"
            role="button"
            className="backArrow"
          />
        </span>
        Item details
      </PageTitle>
      {isLoading && (
        <LoadingCentered>
          <Loading />
        </LoadingCentered>
      )}
      {itemData.itemName && itemData.description && (
        <Content>
          <ContentImage>
            {itemData.image && <img src={itemData.image} />}
          </ContentImage>
          <ContentDetails>
            <ItemTitle>{itemData.itemName}</ItemTitle>
            <ItemdDesc>{itemData.description}</ItemdDesc>
            <ActionBar>
              <Button
                onClick={() =>
                  dispatch(
                    actions.addItem({
                      _id: itemData._id,
                      itemName: itemData.itemName,
                      description: itemData.description,
                      category: itemData.category,
                      price: itemData.price,
                      image: itemData.image,
                    })
                  )
                }
              >
                Add to cart
              </Button>
              <Button>Add to favorites</Button>
              {!user && (
                <Button onClick={(e) => handleRedirectReview(e, lastLocation)}>
                  Review
                </Button>
              )}
            </ActionBar>
            <ReviewDisplay>
              <h6>Reviews</h6>
              {itemData.reviews ? (
                itemData.reviews.map((review) => {
                  const stars = [1, 2, 3, 4, 5];
                  return (
                    <SingleReview key={review.date}>
                      <p>{review.review}</p>
                      <p>
                        {stars.map((star) => {
                          return (
                            <span key={star}>
                              {" "}
                              {star <= review.rating ? (
                                <IoHeart />
                              ) : (
                                <IoHeartOutline />
                              )}
                            </span>
                          );
                        })}{" "}
                        <span
                          style={{ fontStyle: "italic", fontWeight: "bold" }}
                        >
                          {review.displayName}
                        </span>
                        , {moment(review.date).format("ll")}
                      </p>
                    </SingleReview>
                  );
                })
              ) : (
                <p>There are no reviews yet.</p>
              )}
            </ReviewDisplay>

            {user && (
              <ReviewForm>
                {hasReviewed && (
                  <p className="warning">You already reviewed this product.</p>
                )}
                <label>
                  <p>
                    Display Name {`(This name will be shown with your review)`}
                  </p>
                  <Input
                    type="text"
                    name="displayName"
                    value={review.displayName}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
                <label>
                  <p>Your review:</p>
                  <Textarea
                    type="text"
                    name="review"
                    value={review.review}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
                <div>
                  <p>Rating</p>
                  <input
                    type="radio"
                    value="1"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                  1
                  <input
                    type="radio"
                    value="2"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                  2
                  <input
                    type="radio"
                    value="3"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                  3
                  <input
                    type="radio"
                    value="4"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                  4
                  <input
                    type="radio"
                    value="5"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                  5
                </div>
                <Button onClick={(e) => handleAddReview(e)}>Post Review</Button>
                {reviewError && <p className="warning">{reviewError}</p>}
              </ReviewForm>
            )}
          </ContentDetails>
        </Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};

  @media only screen and (min-width: 768px) {
    /* tablet */
    max-width: 750px;
  }
  @media only screen and (min-width: 992px) {
    /* desktop */
    max-width: 1000px;
  }
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  padding-bottom: 10px;
  .backArrow {
    cursor: pointer;
    :hover {
      color: ${COLORS.highlight};
    }
    :focus {
      color: ${COLORS.highlight};
    }
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  background-color: ${COLORS.lightBackground};
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 300px auto;
    align-items: start;
    border: 1px solid ${COLORS.lightBorders};
    padding: 10px;
  }
  @media only screen and (min-width: 992px) {
    width: 1000px;
  }
`;

const ContentImage = styled.div`
  margin: auto;
  & img {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    margin: initial;
  }
  @media only screen and (min-width: 992px) {
    & > img {
      width: 300px;
    }
  }
`;

const ContentDetails = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  @media only screen and (min-width: 768px) {
  }
  @media only screen and (min-width: 992px) {
  }
`;

const LoadingCentered = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 4px;
  font-family: "Fredericka the Great", cursive;
  color: ${COLORS.highlight2};
`;

const ItemdDesc = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ActionBar = styled.div`
  display: flex;
`;

const ReviewDisplay = styled.div`
  margin-top: 20px;
  & > h6 {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const SingleReview = styled.div`
  padding: 20px;
  & > p {
    line-height: 30px;
  }
`;

const ReviewForm = styled.div`
  margin-top: 30px;
  .warning {
    color: ${COLORS.highlight};
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
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

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 1rem;
  padding: 12px 20px;
  margin: 8px 0;
  background-color: ${COLORS.inputBackground};
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 14px 20px;
  margin: 8px 2px;
  border: none;
  cursor: pointer;
  font-family: "Fredericka the Great", cursive;
  :hover {
    background-color: ${COLORS.highlight};
  }
  @media only screen and (min-width: 768px) {
    /* tablet & desktop */
    padding: 2px;
    width: 120px;
    margin: 8px 1px;
  }
`;

export default ItemDetails;
