const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}, (err) => {
  if (err) {
    console.error('Unable to connect to mongodb', err);
  } else {
    console.log('Successfully connected to mongodb');
  }
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//
//   next();
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
