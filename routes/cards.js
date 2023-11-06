/** @format */

const express = require('express');
const cards = express.Router();
const CardsModel = require('../models/CardModel');

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
    frontPage: req.body.frontPage,
    secondPage: req.body.secondPage,
    thirdPage: req.body.thirdPage,
    fourthPage: req.body.fourthPage,
    fifthPage: req.body.fifthPage,
    sixthPage: req.body.sixthPage,
    seventhPage: req.body.seventhPage,
    eighthPage: req.body.eighthPage,
    ninthPage: req.body.ninthPage,
    tenthPage: req.body.tenthPage,
    eleventhPage: req.body.eleventhPage,
    twelfthPage: req.body.twelfthPage,
    thirteenthPage: req.body.thirteenthPage,
    fourteenthPage: req.body.fourteenthPage,
    fifteenthPage: req.body.fifteenthPage,
    name: req.body.name,
    information: req.body.information,
    closingPage1: {
      author: req.body.closingPage1.author,
      year: req.body.closingPage1.year,
      price: req.body.closingPage1.price,
    },
    closingPage2: {
      author: req.body.closingPage2.author,
      year: req.body.closingPage2.year,
      price: req.body.closingPage2.price,
    },
    closingPage3: {
      author: req.body.closingPage3.author,
      year: req.body.closingPage3.year,
      price: req.body.closingPage3.price,
    },
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
    if (dataToUpdate.frontPage) {
      cardExist.frontPage = dataToUpdate.frontPage;
    }
    if (dataToUpdate.secondPage) {
      cardExist.secondPage = dataToUpdate.secondPage;
    }
    if (dataToUpdate.thirdPage) {
      cardExist.thirdPage = dataToUpdate.thirdPage;
    }
    if (dataToUpdate.fourthPage) {
      cardExist.fourthPage = dataToUpdate.fourthPage;
    }
    if (dataToUpdate.fifthPage) {
      cardExist.fifthPage = dataToUpdate.fifthPage;
    }
    if (dataToUpdate.sixthPage) {
      cardExist.sixthPage = dataToUpdate.sixthPage;
    }
    if (dataToUpdate.seventhPage) {
      cardExist.seventhPage = dataToUpdate.seventhPage;
    }
    if (dataToUpdate.eighthPage) {
      cardExist.eighthPage = dataToUpdate.eighthPage;
    }
    if (dataToUpdate.ninthPage) {
      cardExist.ninthPage = dataToUpdate.ninthPage;
    }
    if (dataToUpdate.tenthPage) {
      cardExist.tenthPage = dataToUpdate.tenthPage;
    }
    if (dataToUpdate.eleventhPage) {
      cardExist.eleventhPage = dataToUpdate.eleventhPage;
    }
    if (dataToUpdate.twelfthPage) {
      cardExist.twelfthPage = dataToUpdate.twelfthPage;
    }
    if (dataToUpdate.thirteenthPage) {
      cardExist.thirteenthPage = dataToUpdate.thirteenthPage;
    }
    if (dataToUpdate.fourteenthPage) {
      cardExist.fourteenthPage = dataToUpdate.fourteenthPage;
    }
    if (dataToUpdate.fifteenthPage) {
      cardExist.fifteenthPage = dataToUpdate.fifteenthPage;
    }
    if (dataToUpdate.name) {
      cardExist.name = dataToUpdate.name;
    }
    if (dataToUpdate.information) {
      cardExist.information = dataToUpdate.information;
    }
    if (dataToUpdate.closingPage1) {
      cardExist.closingPage1 = dataToUpdate.closingPage1;
    }
    if (dataToUpdate.closingPage2) {
      cardExist.closingPage2 = dataToUpdate.closingPage2;
    }
    if (dataToUpdate.closingPage3) {
      cardExist.closingPage3 = dataToUpdate.closingPage3;
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
