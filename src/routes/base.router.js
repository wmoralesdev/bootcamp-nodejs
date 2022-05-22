const { Router } = require('express');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

const baseRouter = Router();

baseRouter.use('/users', userRouter);
baseRouter.use('/auth', authRouter);

module.exports = baseRouter;
