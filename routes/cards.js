/** @format */

const express = require('express');
const cards = express.Router();
const CardsModel = require('../models/CardModel');
const NewCardsModel = require('../models/NewCardModel');

// GET i comic relativi a una card tramite ID
cards.get('/cards/:cardsId/comics', async (req, res) => {
  const { cardsId } = req.params;

  try {
    const card = await CardsModel.findById(cardsId);

    if (!card) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    }

    // Se la card è stata trovata, estrai l'ID della NewCard associata
    const newCardId = card.newCardId;

    // Ora puoi trovare tutti i comic relativi a quella NewCard
    const comics = await NewCardsModel.find({ newCardId });

    if (!comics || comics.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Nessun comic trovato per questa card',
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: 'Ecco i comic relativi alla card!',
      comics,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare i comic della card',
      error: error.message,
    });
  }
});

//GET alle cards con impaginazione
cards.get('/cardsPage', async (req, res) => {
  const { page = 1, pageSize = 6 } = req.query;
  try {
    const card = await CardsModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalCards = await CardsModel.count();

    res.status(200).send({
      statusCode: 200,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCards / pageSize),
      totalCards,
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

// GET i post relativi all'ID della card

cards.get('/cards/:cardsId/posts', async (req, res) => {
  const { cardsId } = req.params;

  try {
    const card = await CardsModel.findById(cardsId);

    if (!card) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Card non trovata',
      });
    }

    // Se la card è stata trovata, estrai l'ID della card associata
    const newCardId = card.newCardId;

    // Ora puoi trovare la NewCard associata usando l'ID
    const newCard = await NewCardsModel.findById(newCardId);

    if (!newCard) {
      return res.status(404).send({
        statusCode: 404,
        message: 'NewCard non trovata',
      });
    }

    // Estrai i post relativi alla NewCard
    const posts = newCard.posts; // Assumi che ci sia un campo "posts" nell'oggetto NewCard

    res.status(200).send({
      statusCode: 200,
      message: 'Ecco i post relativi alla card!',
      posts,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile recuperare i post della card',
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
