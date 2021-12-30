require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {login, createUser} = require("./controllers/user");
const auth = require('./middlewares/auth');

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

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'))

app.use((req, res) => {
  res.status(404).send({ message: 'Пока запрашиваемой вами страницы нет, но не отчаивайтесь, возмоно она появится' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
