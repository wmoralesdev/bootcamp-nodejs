const { Router } = require('express');
const { login, register, requestPassword, resetPassword } = require('../controllers/auth.controller');

const authRouter = Router();

// Create
authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/forgot', requestPassword);

authRouter.patch('/reset/:token', resetPassword);

module.exports = authRouter;
