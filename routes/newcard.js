/** @format */

const express = require('express');
const newCards = express.Router();
const NewCardsModel = require('../models/NewCardModel');

newCards.post('/comic/create', async (req, res) => {
  const newCard = await NewCardsModel({
    title: req.body.title,
    cover: req.body.cover,
    price: req.body.price,
    author: req.body.author,
    year: req.body.year,
    images: req.body.images,
  });

  try {
    const card = await newCard.save();
    res.status(201).send({
      statusCode: 201,
      payload: card,
      message: 'Comic creato con successo',
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile creare  un fumetto',
    });
  }
});

newCards.get('/comic/:comicId', async (req, res) => {
  const { comicId } = req.params;
  try {
    const comics = await NewCardsModel.findById(comicId);

    if (!comics) {
      res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        message: 'Ecco la tua card!',
        comic: [comics],
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare la card',
      error: error.message,
    });
  }
});

newCards.get('cards/:cardsId/comic', async (req, res) => {
  const { cardsId } = req.params;
  try {
    const comics = await NewCardsModel.findById(cardsId);

    if (!comics) {
      res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        message: 'Ecco la tua card!',
        comic: [comics],
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare la card',
      error: error.message,
    });
  }
});

module.exports = newCards;
