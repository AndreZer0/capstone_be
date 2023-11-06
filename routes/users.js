/** @format */

const express = require('express');
const logger = require('../middlewares/logger');
const user = express.Router();
const UsersModel = require('../models/UsersModel');

const bcrypt = require('bcrypt');

//Utenti totali
user.get('/users', async (req, res) => {
  try {
    const users = await UsersModel.find();

    res.status(200).send({
      statusCode: 200,
      message: 'Ecco i tuoi autori',
      users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Errore incredibile',
    });
  }
});

//Creazione di un nuovo autore
user.post('/users/create', logger, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UsersModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    const userCreated = await newUser.save();
    res.status(201).send({
      statusCode: 201,
      payload: userCreated,
      message: 'Utente aggiunto con successo',
    });
  } catch (error) {
    console.error("Errore durante il salvataggio dell'utente:", error);
    res.status(500).send({
      statusCode: 500,
      message: 'Errore nell aggiunta di un utente',
    });
  }
});

//Modifica di un autore tramite id
user.put('/users/modify/:id', async (req, res) => {
  const { id } = req.params;
  const userExists = await UsersModel.findById(id);
  if (!userExists) {
    res.status(404).send({
      statusCode: 404,
      message: 'Utente non trovato',
    });
  }
  try {
    const userUpdate = req.body;
    const options = { new: true };
    const result = await UsersModel.findByIdAndUpdate(id, userUpdate, options);
    res.status(200).send({
      statusCode: 200,
      message: 'Autore  trovato',
      result,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Errore nella modifica dell utente',
    });
  }
});

//Cancellazione di un autore tramite id
user.delete('/users/delete/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UsersModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Utente non trovato',
    });
  }
  res.status(200).send({
    statusCode: 200,
    message: 'Utente eliminato',
  });
});

module.exports = user;
