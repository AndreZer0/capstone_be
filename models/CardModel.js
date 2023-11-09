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
    newCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewCardsModel',
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('cardsModel', CardSchema, 'cardsAlbum');
