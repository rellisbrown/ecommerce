import React from 'react';
import styled from '@emotion/styled';
import { useShoppingCart } from 'use-shopping-cart';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Routes, Route, Link } from 'react-router-dom';

import { useAuth } from '../../utils/useAuth';

import ShoppingCartItem from './ShoppingCartItem';

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 400px;
    display: flex;
    flex-direction: column;
  }
`;

const StyledTitle = styled.h3`
  width: 100%;
  text-align: center;
`;

const StyledTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem auto 1rem auto;
`;

const StyledTotalText = styled.h3`
  margin: auto;
`;

const StyledCheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem auto auto auto;
`;

const StyledCheckoutButton = styled(Button)`
  margin: auto auto auto auto;
`;

const StyledSignInText = styled.p`
  font-size: 1rem;
  display: flex;
  margin: auto auto 1rem auto;
`;

const ShoppingCartDrawer = ({ drawerOpen, setDrawerOpen }) => {
  const {
    addItem,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    clearCart,
    setItemQuantity,
  } = useShoppingCart();

  const { user } = useAuth();

  console.log(user);

  const cartItems = [];

  for (const [key, value] of Object.entries(cartDetails)) {
    /* console.log(key, value); */
    cartItems.push(value);
  }

  console.log(cartItems);

  const handleSubmit = async (event) => {
    const response = await fetch('/.netlify/functions/create-session', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartDetails),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    redirectToCheckout({ sessionId: response.sessionId });
  };
  return (
    <StyledDrawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <StyledTitle>Cart</StyledTitle>
      <Divider />
      {cartItems.map((item) => (
        <ShoppingCartItem key={item.id} item={item} />
      ))}
      <Divider />
      <StyledTotalContainer>
        <StyledTotalText>Cart Total:</StyledTotalText>
        <StyledTotalText> {formattedTotalPrice}</StyledTotalText>
      </StyledTotalContainer>
      <StyledCheckoutContainer>
        {user === null ? (
          <StyledSignInText>
            Please &nbsp; <Link to="/signin">Sign In</Link> &nbsp; or &nbsp;
            <Link to="/register">Register</Link> &nbsp; to proceed
          </StyledSignInText>
        ) : (
          <></>
        )}
        <StyledCheckoutButton
          disabled={user === null}
          variant="outlined"
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={handleSubmit}
        >
          Checkout
        </StyledCheckoutButton>
      </StyledCheckoutContainer>
    </StyledDrawer>
  );
};

export default ShoppingCartDrawer;
