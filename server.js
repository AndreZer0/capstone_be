/** @format */

const express = require('express');
const mongoose = require('mongoose');
const cardsRoute = require('./routes/cards');
const loginRoute = require('./routes/login');
const usersRoute = require('./routes/users');
const signupRoute = require('./routes/signup');
const commentsRoute = require('./routes/comment');
const newCardRoute = require('./routes/newcard');
const stripeRoute = require('./routes/stripe');
require('dotenv').config();
const PORT = 6161;
const cors = require('cors');
const logger = require('./middlewares/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', cardsRoute);
app.use('/', newCardRoute);
app.use('/', loginRoute);
app.use('/', usersRoute);
app.use('/', signupRoute);
app.use('/', commentsRoute);
app.use('/stripe', stripeRoute);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during db connection'));
db.once('open', () => {
  console.log('Database successfully conected!');
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
