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
      type: String,
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
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('NewCardsModel', NewCardSchema, 'comicsAlbum');
