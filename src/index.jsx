import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from 'use-shopping-cart';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider
        mode="payment"
        cartMode="checkout-session"
        stripe={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        billingAddressCollection={false}
        successUrl="https://stripe.com"
        cancelUrl="https://twitter.com/dayhaysoos"
        currency="GBP"
      >
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
