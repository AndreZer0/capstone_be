/** @format */

const mongoose = require('mongoose');

const NewCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    cover: {
      type: String,
    },
    price: {
      type: Number,
    },
    author: {
      type: String,
    },
    year: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    newCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cardsModel',
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('NewCardsModel', NewCardSchema, 'comicsAlbum');
