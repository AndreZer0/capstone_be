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
    frontPage: {
      type: String,
      required: true,
    },
    secondPage: {
      type: String,
      required: true,
    },
    thirdPage: {
      type: String,
      required: true,
    },
    fourthPage: {
      type: String,
      required: true,
    },
    fifthPage: {
      type: String,
      required: true,
    },
    sixthPage: {
      type: String,
      required: true,
    },
    seventhPage: {
      type: String,
      required: true,
    },
    eighthPage: {
      type: String,
      required: true,
    },
    ninthPage: {
      type: String,
      required: true,
    },
    tenthPage: {
      type: String,
      required: true,
    },
    eleventhPage: {
      type: String,
      required: true,
    },
    twelfthPage: {
      type: String,
      required: true,
    },
    thirteenthPage: {
      type: String,
      required: true,
    },
    fourteenthPage: {
      type: String,
      required: true,
    },
    fifteenthPage: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    closingPage1: {
      author: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
    closingPage2: {
      author: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
    closingPage3: {
      author: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('cardsModel', CardSchema, 'cardsAlbum');
