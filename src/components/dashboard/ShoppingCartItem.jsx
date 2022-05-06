import React from 'react';
import styled from '@emotion/styled';
import {
  AdvancedImage,
  lazyload,
  accessibility,
  responsive,
  placeholder,
} from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, thumbnail, fillPad } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

import { useShoppingCart } from 'use-shopping-cart';

const StyledCartItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 1rem 0 1rem 0;
`;

const DetailsContainer = styled.div`
  /*  width: 100%; */
  display: flex;
  flex-direction: column;
  margin: auto auto auto 1rem;
`;

const StyledTitleText = styled.h3`
  margin: auto;
`;

const StyledPriceText = styled.h3`
  color: grey;
  margin: auto;
`;

const StyledQuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto auto auto 1rem;
`;

const StyledIncrementButton = styled(IconButton)`
  margin: auto 0 auto 0;
`;

const StyledQuantityText = styled.div`
  color: white;
  margin: auto 0.5rem auto 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #404ebb;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 20%;
`;

const ShoppingCartItem = ({ item }) => {
  const {
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    clearCart,
    setItemQuantity,
  } = useShoppingCart();

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dfybtndfe',
    },
  });

  const imageWidth = 75;
  const imageHeight = 75;

  const productImage = cld.image(item.imageGallery[0]);
  productImage
    .resize(
      fillPad().width(imageWidth).height(imageHeight).gravity(autoGravity())
    )
    .quality('auto:best')
    .roundCorners(byRadius(15));
  return (
    <StyledCartItemContainer>
      <AdvancedImage style={{ paddingLeft: '1rem' }} cldImg={productImage} />
      <DetailsContainer>
        <StyledTitleText>{item.name}</StyledTitleText>
        <StyledPriceText>{item.formattedValue}</StyledPriceText>
      </DetailsContainer>
      <StyledQuantityContainer>
        <StyledIncrementButton
          onClick={() => decrementItem(item.id)}
          variant="text"
          size="small"
        >
          <RemoveOutlinedIcon />
        </StyledIncrementButton>

        <StyledQuantityText>{item.quantity}</StyledQuantityText>
        <StyledIncrementButton
          onClick={() => incrementItem(item.id)}
          variant="text"
          size="small"
        >
          <AddOutlinedIcon />
        </StyledIncrementButton>
      </StyledQuantityContainer>
    </StyledCartItemContainer>
  );
};

export default ShoppingCartItem;
