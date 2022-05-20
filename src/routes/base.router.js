const { Router } = require('express');
const userRouter = require('./user.router');

const baseRouter = Router();

baseRouter.use('/users', userRouter);

module.exports = baseRouter;
