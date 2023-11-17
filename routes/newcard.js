/** @format */

const express = require('express');
const newCards = express.Router();
const NewCardsModel = require('../models/NewCardModel');

// POST COMIC
newCards.post('/cards/:cardsId/comic/create', async (req, res) => {
  const { cardsId } = req.params;
  const newCard = await NewCardsModel({
    title: req.body.title,
    cover: req.body.cover,
    price: req.body.price,
    author: req.body.author,
    year: req.body.year,
    images: req.body.images,
    newCardId: cardsId,
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

//PUT
newCards.patch('/comic/:comicId/modify', async (req, res) => {
  const { comicId } = req.params;
  const updateFields = req.body;

  try {
    const comics = await NewCardsModel.findById(comicId);

    if (!comics) {
      res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    } else {
      await comics.updateOne(updateFields);

      const updatedComics = await NewCardsModel.findById(comicId);

      res.status(200).send({
        statusCode: 200,
        message: 'Card aggiornata!',
        comic: [updatedComics],
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile aggiornare la card',
      error: error.message,
    });
  }
});

newCards.get('/cards/:cardsId/comics', async (req, res) => {
  const { cardsId } = req.params;
  try {
    const comics = await NewCardsModel.find({ newCardId: cardsId }).populate(
      'newCardId'
    );

    if (!comics) {
      res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Ecco la tua card!',

      comics,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare la card',
      error: error.message,
    });
  }
});

module.exports = newCards;
