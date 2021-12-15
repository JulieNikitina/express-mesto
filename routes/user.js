const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUserInfo, updateAvatar} = require('../controllers/user');

router.get('/user', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;