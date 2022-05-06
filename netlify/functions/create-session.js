const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
const validateCartItems =
  require('use-shopping-cart/utilities').validateCartItems;

/* const inventory = require('./data/products.json') */

const { dbAdmin } = require('./firebaseAdmin');

const getProducts = async () => {
  const productsSnapshot = await dbAdmin.collection('products').get();
  let tempProductList = [];
  productsSnapshot.forEach((doc) => {
    tempProductList.push(doc.data());
  });
  return tempProductList;
};

/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
exports.handler = async (event) => {
  const inventory = await getProducts();

  let product;
  try {
    product = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Received malformed JSON.',
        error: error.message,
      }),
    };
  }

  let line_items;
  try {
    line_items = validateCartItems(inventory, product);
  } catch (error) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Some of the items in your cart are invalid.',
        error: error.message,
      }),
    };
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      mode: 'payment',
      /*
       * This env var is set by Netlify and inserts the live site URL. If you want
       * to use a different URL, you can hard-code it here or check out the
       * other environment variables Netlify exposes:
       * https://docs.netlify.com/configure-builds/environment-variables/
       */
      success_url: `${process.env.URL}/success.html`,
      cancel_url: process.env.URL,
      line_items,
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'While communicating with Stripe, we encountered an error.',
        error: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  };
};
