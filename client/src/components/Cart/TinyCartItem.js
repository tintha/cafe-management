import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { HiOutlineTrash } from "react-icons/hi";

const TinyCartItem = ({
  _id,
  itemName,
  description,
  price,
  quantity,
  image,
}) => {
  const dispatch = useDispatch();

  const handleChangeQuantity = (e) => {
    !isNaN(e.target.value) &&
      dispatch(
        actions.updateQuantity({
          _id,
          itemName,
          description,
          price,
          image,
          quantity: Number(e.target.value),
        })
      );
  };

  return (
    <Wrapper>
      <ItemNameContainer>
        {itemName}
        <RemoveBtn onClick={() => dispatch(actions.removeItem({ itemName }))}>
          <HiOutlineTrash size="20" />
        </RemoveBtn>
      </ItemNameContainer>
      <QuantityContainer>
        <label htmlFor="quantity">Quantity:</label>
        <QuantityNum
          name="quantity"
          itemName="quantity"
          type="text"
          value={quantity}
          onChange={(e) => handleChangeQuantity(e)}
        />
      </QuantityContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid gray;
  margin-bottom: 20px;
`;

const ItemNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 1.3rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 10px;
  font-size: 1rem;
`;

const QuantityNum = styled.input`
  background-color: white;
  color: rgba(0, 0, 0);
  min-width: 1.5em;
  max-width: 3em;
  text-align: center;
  font-weight: bold;
  margin-left: 5px;
  font-size: 1rem;
`;

const RemoveBtn = styled.button`
  border: none;
  border-radius: 6px;
  color: black;
  cursor: pointer;
  background-color: transparent;
`;

export default TinyCartItem;
