require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const regExp = require('./utils/regexp');
const NotFoundError = require('./errors/not-found-error');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.error('Unable to connect to mongodb', err);
  }
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }).unknown(true),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regExp).required(),
    }).unknown(true),
  }),
  createUser,
);
app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res, next) => {
  next(new NotFoundError('Пока запрашиваемой вами страницы нет, но не отчаивайтесь, возмоно она появится'));
});

app.use(errors());

app.use((err, req, res, next) => {
  // Прописываем дефолты на случай если внезапно прилетело что-то неожиданное
  res.status(err.statusCode || 500);
  res.send({ message: err.message || 'Неизвестная ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
