/** @format */

const express = require('express');
const comments = express.Router();
const CommentModel = require('../models/CommentModel'); // Assicurati che il nome del modello corrisponda al nome del file del modello
const CardsModel = require('../models/CardModel');

// Commenti a un singolo post
comments.get('/cards/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comm = await CommentModel.find({ code: id }).populate('code');
    if (!comm) {
      res.status(404).send({
        statusCode: 404,
        message: 'Commento non trovato',
      });
    }

    res.status(200).send({
      comm,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Errore nel caricamento dei commenti',
    });
  }
});

// Creazione di un commento
comments.post('/cards/:id/comment/create', async (req, res) => {
  const { id } = req.params;

  try {
    const newComment = new CommentModel({
      username: req.body.username,
      content: req.body.content,
      code: id,
    });
    const comm = await newComment.save();
    res.status(201).send({
      statusCode: 201,
      payload: comm,
      message: 'Commento aggiunto con successo',
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Impossibile aggiungere il commento',
    });
  }
});

// Modifica di un commento tramite id
comments.put('/cards/:id/comments/:commentId/modify', async (req, res) => {
  const { id, commentId } = req.params;
  const updateData = req.body;

  try {
    const comment = await CommentModel.findByIdAndUpdate(
      commentId,
      updateData,
      { new: true }
    );
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Commento non trovato',
      });
    }

    res.status(200).send({
      comment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore nell'aggiornamento del commento",
    });
  }
});

// Cancellazione di un commento tramite id
comments.delete('/cards/:id/comments/:commentId/delete', async (req, res) => {
  const { id, commentId } = req.params;
  const comm = await CommentModel.findByIdAndDelete(commentId);
  if (!comm) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Commento non trovato',
    });
  }
  res.status(200).send({
    statusCode: 200,
    message: 'Commento eliminato',
  });
});

// Commento singolo
comments.get('/comments/getById/:commentId', async (req, res) => {
  const { commentId } = req.params;
  try {
    const comm = await CommentModel.findById(commentId);
    if (!comm) {
      res.status(404).send({
        statusCode: 404,
        message: 'Commento non trovato',
      });
    }

    res.status(200).send({
      comm,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Errore nel caricamento dei commenti',
    });
  }
});

module.exports = comments;
