import React from 'react';
import styled from '@emotion/styled';

import { useShoppingCart } from 'use-shopping-cart';

import {
  AdvancedImage,
  lazyload,
  accessibility,
  responsive,
  placeholder,
} from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const StyledCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: ${(props) => `${props.width}px`};
  height: 90%;
  margin: 2rem auto auto auto;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledTitleText = styled.h4`
  display: flex;
  margin: auto auto auto auto;
  font-size: 1.4rem;
`;

const StyledPriceText = styled.h4`
  display: flex;
  margin: 0.5rem auto auto auto;
  font-size: 1rem;
  color: grey;
`;

const DescriptionText = styled.p`
  display: flex;
  margin: 0.5rem auto auto auto;
  font-size: 1rem;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem auto 0 auto;
`;

const StyledViewButton = styled(Button)`
  margin: auto 2rem auto auto;
`;

const StyledAddButton = styled(Button)`
  margin: auto 0.5rem auto 0;
`;

const StyledIncrementButton = styled(IconButton)`
  margin: auto 0 auto 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  /* width: fit-content; */
`;

const ProductCard = ({ product }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dfybtndfe',
    },
  });

  const imageWidth = 400;
  const imageHeight = 250;

  const productImage = cld.image(product.imageGallery[0]);
  productImage.resize(fill().width(imageWidth).height(imageHeight));

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

  console.log(cartDetails);

  const checkCart = () => {
    if (cartDetails[product.id]?.quantity > 0) {
      return true;
    }
    return false;
  };
  console.log(checkCart());

  return (
    <StyledCard width={imageWidth}>
      <AdvancedImage cldImg={productImage} />
      <StyledDetailsContainer>
        <StyledTitleContainer>
          <StyledTitleText>{product.name}</StyledTitleText>
          <StyledPriceText>
            £
            {Number(product.price / 100).toLocaleString('en-GB', {
              maximumSignificantDigits: 3,
            })}
          </StyledPriceText>
        </StyledTitleContainer>
        <DescriptionText>{product.description}</DescriptionText>
        <StyledButtonContainer>
          <StyledViewButton variant="outlined">View</StyledViewButton>
          <StyledAddButton
            variant="outlined"
            startIcon={<ShoppingCartOutlinedIcon />}
            onClick={() => addItem(product)}
          >
            {checkCart() ? `✓ (${cartDetails[product.id]?.quantity})` : 'Add'}
          </StyledAddButton>
          <StyledIncrementButton
            visible={checkCart()}
            onClick={() => incrementItem(product.id)}
            variant="text"
          >
            <AddOutlinedIcon />
          </StyledIncrementButton>
          <StyledIncrementButton
            visible={checkCart()}
            onClick={() => decrementItem(product.id)}
            variant="text"
          >
            <RemoveOutlinedIcon />
          </StyledIncrementButton>
        </StyledButtonContainer>
      </StyledDetailsContainer>
    </StyledCard>
  );
};

export default ProductCard;
