import React, { useState } from 'react';
import styled from '@emotion/styled';

import { useShoppingCart } from 'use-shopping-cart';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDocs,
  DocumentData,
  doc,
  where,
} from 'firebase/firestore';

import Fab from '@mui/material/Fab';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { db, auth, app } from '../../utils/firebaseClient';

import useProducts from '../../utils/useProducts';

import ProductList from './ProductList';
import ShoppingCartDrawer from './ShoppingCartDrawer';

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 4rem;
`;

const StyledFABContainer = styled.div`
  position: fixed;
  top: 150px;
  right: 5%;
  width: 70px;
  height: 70px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const StyledFAB = styled(Fab)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledCartCountFab = styled(Fab)`
  margin: 0;
  top: 0;
  right: 0;
  color: white;
  width: 30px;
  height: 30px;
  min-height: 30px;
  position: absolute;
`;

const Dashboard = () => {
  const {
    addItem,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    clearCart,
    setItemQuantity,
  } = useShoppingCart();
  console.log('cartDetails', cartDetails);

  const productList = useProducts();
  console.log('Product List', productList);

  /* const fakeData = [
    {
      name: 'Bananas',
      id: 'test1',
      price: 400,
      image: 'https://i.imgur.com/AUJQtJC.jpg',
      currency: 'USD',
    },
    {
      name: 'Tangerines',
      id: 'test2',
      price: 100,
      image: 'https://i.imgur.com/4rVhatT.jpg',
      currency: 'USD',
    },
  ]; */

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <StyledDashboardContainer>
      {/* <button type="button" onClick={() => clearCart()}>
        Clear
      </button> */}

      <ProductList productList={productList} />
      <StyledFABContainer visible={cartCount > 0}>
        <StyledFAB
          onClick={() => setDrawerOpen(true)}
          color="primary"
          aria-label="add"
        >
          <ShoppingCartOutlinedIcon />
        </StyledFAB>
        <StyledCartCountFab size="small" color="error">
          {cartCount}
        </StyledCartCountFab>
      </StyledFABContainer>
      <ShoppingCartDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </StyledDashboardContainer>
  );
};

export default Dashboard;
