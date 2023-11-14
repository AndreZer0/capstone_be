/** @format */

const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('cardsModel', CardSchema, 'cardsAlbum');
