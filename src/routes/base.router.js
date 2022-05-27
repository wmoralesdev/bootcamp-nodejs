const { Router } = require('express');
const passport = require('passport');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

const baseRouter = Router();

baseRouter.use('/users', passport.authenticate("jwt", { session: false }), userRouter);
baseRouter.use('/auth', authRouter);

module.exports = baseRouter;
