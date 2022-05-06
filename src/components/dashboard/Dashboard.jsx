import React from 'react';
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

import { db, auth, app } from '../../utils/firebaseClient';

import useProducts from '../../utils/useProducts';

import ProductList from './ProductList';

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

  async function handleSubmit(event) {
    event.preventDefault();

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
  }
  for (const [key, value] of Object.entries(cartDetails)) {
    /*  console.log(key, value); */
  }

  return (
    <div>
      <button type="button" onClick={() => clearCart()}>
        Clear
      </button>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <ProductList productList={productList} />
    </div>
  );
};

export default Dashboard;
