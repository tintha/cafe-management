import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import { COLORS } from "../../contants";
import Loading from "../Loading";

const Menu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.items.items);
  const loadingStatus = useSelector((state) => state.items.status);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      dispatch(actions.receivedItems(data.data));
    } catch (err) {
      dispatch(actions.itemsError(err));
    }
  };

  return (
    <Wrapper>
      {loadingStatus === "loading" && <Loading />}
      {loadingStatus === "error" && <p>An error occurred...</p>}
      {loadingStatus === "success" && (
        <>
          {menuItems.length === 0 ? (
            <p>No item found.</p>
          ) : (
            menuItems.map((item) => {
              const {
                _id,
                itemName,
                description,
                category,
                price,
                image,
              } = item;
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.price / 100);
              return (
                <ItemBox key={item._id}>
                  <ItemImageBox>
                    {item.image && (
                      <ItemImage src={item.image} alt={item.itemName} />
                    )}
                  </ItemImageBox>
                  <ItemInfoDiv>
                    <ItemTextBox>
                      <ItemTitle>{item.itemName}</ItemTitle>
                      <ItemDesc>{item.description}</ItemDesc>
                    </ItemTextBox>
                    <ItemCat>Category: {item.category}</ItemCat>
                    <PriceDiv>
                      <Price>{formattedPrice}</Price>
                      <AddToCartBtn
                        onClick={() =>
                          dispatch(
                            actions.addItem({
                              _id,
                              itemName,
                              description,
                              category,
                              price,
                              image,
                            })
                          )
                        }
                      >
                        Add to cart
                      </AddToCartBtn>
                    </PriceDiv>
                  </ItemInfoDiv>
                </ItemBox>
              );
            })
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 10px;
  font-family: "Roboto Condensed", sans-serif;
  color: ${COLORS.darkest};
  min-height: 100vh;

  @media only screen and (min-width: 768px) {
    /* tablet */
    justify-content: flex-start;
    min-height: initial;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    justify-content: space-between;
    max-width: 1000px;
  }
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 20px;
  border: 1px solid ${COLORS.lightpink};
  padding: 10px;

  @media only screen and (min-width: 768px) {
    /* tablet */
    width: 45%;
  }

  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 300px;
    flex-direction: column;
  }
`;

const ItemImageBox = styled.div`
  width: 100px;

  @media only screen and (min-width: 992px) {
    /* desktop */
    width: initial;
    text-align: center;
  }
`;

const ItemInfoDiv = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media only screen and (min-width: 992px) {
    /* desktop */
    padding-left: initial;
    padding-top: 10px;
    height: 120px;
  }
`;

const ItemTextBox = styled.div``;

const ItemTitle = styled.h4`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const ItemDesc = styled.h4`
  font-size: 1rem;
  margin-bottom: 4px;
`;

const ItemCat = styled.h4`
  font-size: 1rem;
  margin-bottom: 4px;
  height: 50px;
  display: none;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  overflow: hidden;
  object-fit: cover;
  margin-bottom: 0px;

  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 294px;
    height: 294px;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const AddToCartBtn = styled.button`
  position: relative;
  display: block;
  width: 50%;
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 8px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0px;
  cursor: pointer;
`;

export default Menu;
