const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51HpSfiJIJycQ8Om9ZEbl8RiwdzzdLzh1xxyZfmMA5ASsWYkjEFWdwEVvZR4z897i80iyqnY9Hy0BspJB89MhUxwW00hgoFrNoR");

// eslint-disable-next-line object-curly-spacing
app.use(cors({ origin: true }));
app.use(express.json());
app.post('/payments/create', async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: 'usd'
    });

    res
      .status(200)
      .send(paymentIntent.client_secret);

  } catch (err) {
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
})
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});
exports.api = functions.https.onRequest(app);
