/** @format */

const express = require('express');
const cards = express.Router();
const CardsModel = require('../models/CardModel');
const NewCardsModel = require('../models/NewCardModel');

//GET alle cards con impaginazione
cards.get('/cardsPage', async (req, res) => {
  try {
    const card = await CardsModel.find();

    res.status(200).send({
      statusCode: 200,

      card,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Upload error',
    });
  }
});

//GET card tramite id
cards.get('/cards/:cardsId', async (req, res) => {
  const { cardsId } = req.params;
  try {
    const cards = await CardsModel.findById(cardsId);

    if (!cards) {
      res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        message: 'Ecco la tua card!',
        card: [cards],
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

//GET per tutte le cards
cards.get('/cards', async (req, res) => {
  try {
    const card = await CardsModel.find();

    const totalCards = CardsModel;

    res.status(200).send({
      card,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare le card',
    });
  }
});

cards.get('/cards/:cardsId', async (req, res) => {
  const { cardsId } = req.params;

  try {
    const card = await CardsModel.findById(cardsId).populate('comments');

    if (!card) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Ecco la card con i suoi commenti!',
      card,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare la card con i commenti',
      error: error.message,
    });
  }
});

//GET di un post tramite titolo(filtro per trovare solo il post con quella parola nel titolo)
cards.get('/cards/title', async (req, res) => {
  const { title } = req.query;
  try {
    const cardExists = await CardsModel.find({
      title: {
        $regex: title,
        $options: 'i',
      },
    });
    if (!cardExists) {
      res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        message: 'Ecco la tua card!',
        cardExists,
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile effettuare la ricerca',
    });
  }
});

//POST per creare nuove card
cards.post('/cards/create', async (req, res) => {
  const newCard = await CardsModel({
    title: req.body.title,
    cover: req.body.cover,
    comments: req.body.comments,
  });

  try {
    const card = await newCard.save();
    res.status(201).send({
      statusCode: 201,
      payload: card,
      message: 'Card creata con successo',
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile creare  una card',
    });
  }
});

//PATCH per modificare le card presenti
cards.patch('/cards/modify/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cardExist = await CardsModel.findById(id);

    if (!cardExist) {
      return res.status(404).send({
        statusCode: 404,
        message: 'La carta non esiste',
      });
    }

    const dataToUpdate = req.body;

    if (dataToUpdate.title) {
      cardExist.title = dataToUpdate.title;
    }
    if (dataToUpdate.cover) {
      cardExist.cover = dataToUpdate.cover;
    }

    const result = await cardExist.save();

    res.status(200).send({
      statusCode: 200,
      message: 'Card modificata con successo',
      result,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: 'Errore interno del server',
      error: e,
    });
  }
});

//DELETE per eliminare le card presenti
cards.delete('/cards/delete/:id', async (req, res) => {
  const { id } = req.params;
  const cardExists = await CardsModel.findByIdAndDelete(id);
  if (!cardExists) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Card non trovata',
    });
  }
  res.status(200).send({
    statusCode: 200,
    message: 'Card eliminato',
  });
});

module.exports = cards;
