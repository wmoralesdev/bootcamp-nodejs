const { createUser, findByName, getAllUsers, getById } = require('../controllers/user.controller');
const { Router } = require('express');

const userRouter = Router();

// Create
userRouter.post('/create', createUser);

userRouter.get('/search', findByName);
userRouter.get('/:id', getById);
userRouter.get('/', getAllUsers);

module.exports = userRouter;
