const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.use((req, res, next) => {
  req.user = {
    _id: '61bb73c6002a7567b5a7d1a8',
  };
  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res) => {
  res.status(404).send({ message: 'Пока запрашиваемой вами страницы нет, но не отчаивайтесь, возмоно она появится' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
