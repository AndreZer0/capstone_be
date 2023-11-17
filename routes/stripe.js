/** @format */

const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const products = req.body.products;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Invalid products data' });
    }

    const line_items = products.map(product => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.title,
            images: [product.cover],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.YOUR_DOMAIN}/checkout-success`,
      cancel_url: `${process.env.YOUR_DOMAIN}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
