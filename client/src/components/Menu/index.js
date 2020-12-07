import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../../redux/actions";

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
      {loadingStatus === "loading" && <p>loading...</p>}
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
                  <ItemTitle>{item.itemName}</ItemTitle>
                  <ItemDesc>{item.description}</ItemDesc>
                  <ItemCat>Category: {item.category}</ItemCat>

                  {item.image && (
                    <ItemImage src={item.image} alt={item.itemName} />
                  )}

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
                    Add to cart - {formattedPrice}
                  </AddToCartBtn>
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
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-family: "Roboto Condensed", sans-serif;
  /* border: 1px solid red; */
`;

const ItemBox = styled.div`
  width: 90%;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const ItemTitle = styled.h4`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 4px;
`;

const ItemDesc = styled.h4`
  font-size: 1rem;
  margin-bottom: 4px;
`;

const ItemCat = styled.h4`
  font-size: 1rem;
  margin-bottom: 4px;
  display: none;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  overflow: hidden;
  object-fit: cover;
  margin-bottom: 0px;
`;

const AddToCartBtn = styled.button`
  position: relative;
  display: block;
  width: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #6ec2a1;
  color: white;
  border: none;
  padding: 8px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0px;
  cursor: pointer;
`;

export default Menu;
