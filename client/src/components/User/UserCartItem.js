import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { cancelCircle } from "react-icons-kit/icomoon";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const CartItem = ({ _id, itemName, description, price, quantity, image }) => {
  const dispatch = useDispatch();

  const handleChangeQuantity = (e) => {
    !isNaN(e.target.value) &&
      dispatch(
        actions.updateQuantity({
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
          <Icon icon={cancelCircle} size={32} />
        </RemoveBtn>
      </ItemNameContainer>
      <ItemDescription>{description}</ItemDescription>
      <ItemImage>
        <img src={image} width="50" alt="" />
      </ItemImage>
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
const ItemImage = styled.div``;

const ItemDescription = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 1rem;
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

export default CartItem;
