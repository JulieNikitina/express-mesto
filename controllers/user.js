const User = require('../models/user');

module.exports.getUsers =  (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUserInfo = (req, res) => {
  const {name, about, avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {name: name, about: about})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}));
}

module.exports.updateAvatar = (req, res) => {
  const {name, about, avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar: avatar})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}));
}