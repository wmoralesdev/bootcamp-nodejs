const { Router } = require('express');
const { login, register, requestPassword, resetPassword } = require('../controllers/auth.controller');
const upload = require('../middlewares/uploader');

const authRouter = Router();

// Create
authRouter.post('/register', upload.single('image'), register);
authRouter.post('/login', login);

authRouter.get('/forgot', requestPassword);

authRouter.patch('/reset/:token', resetPassword);

module.exports = authRouter;
