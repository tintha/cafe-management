import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { HiOutlineTrash } from "react-icons/hi";
import { COLORS } from "../../contants";

const CartItem = ({
  _id,
  itemName,
  description,
  category,
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
          category,
          price,
          image,
          quantity: Number(e.target.value),
        })
      );
  };

  return (
    <Wrapper>
      <ItemImageDiv>
        <Image src={image} width="50" alt="" />
      </ItemImageDiv>
      <RightDiv>
        <ItemNameContainer>
          {itemName}
          <RemoveBtn onClick={() => dispatch(actions.removeItem({ itemName }))}>
            <HiOutlineTrash size="30" style={{ color: `${COLORS.darkest}` }} />
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
      </RightDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid ${COLORS.grayBorder};
  margin-bottom: 20px;
  max-height: 150px;
`;

const ItemNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

const ItemImageDiv = styled.div`
  overflow: hidden;
  width: 30%;

  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 200px;
  }
`;

const Image = styled.img`
  overflow: hidden;
  object-fit: contain;
  width: 100%;
  height: auto;

  @media only screen and (min-width: 992px) {
    /* desktop */
    width: 150px;
    height: auto;
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px;
  font-size: 1rem;
  width: 100%;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1rem;
  color: ${COLORS.darkest};
`;

const QuantityNum = styled.input`
  color: ${COLORS.darkest};
  min-width: 1.5em;
  max-width: 3em;
  text-align: center;
  font-weight: bold;
  margin-left: 5px;
  font-size: 1rem;
  border: 1px solid ${COLORS.grayBorder};
`;

const RemoveBtn = styled.button`
  border: none;
  border-radius: 6px;
  color: black;
  cursor: pointer;
  background-color: transparent;
`;

export default CartItem;
