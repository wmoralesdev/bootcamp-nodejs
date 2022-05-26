const { createUser, findByName, getAllUsers, getById, getOwn } = require('../controllers/user.controller');
const { Router } = require('express');
const passport = require('passport');

const userRouter = Router();

// Create
userRouter.post('/create', createUser);

userRouter.get('/search', findByName);
userRouter.get('/me', passport.authenticate("jwt", { session: false }) ,getOwn);
userRouter.get('/:id', getById);

userRouter.get('/', passport.authenticate("jwt", { session: false }), getAllUsers);

module.exports = userRouter;
