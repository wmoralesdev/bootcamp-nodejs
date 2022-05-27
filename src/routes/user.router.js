const { createUser, findByName, getAllUsers, getById, getOwn } = require('../controllers/user.controller');
const { Router } = require('express');
const passport = require('passport');
const { authorizeAdmin } = require('../middlewares/authorize');
const uploader = require('../middlewares/uploader');

const userRouter = Router();

// Create
userRouter.post('/create', createUser);

userRouter.get('/search', findByName);
userRouter.get('/me' ,getOwn);

userRouter.get('/:id', getById);

userRouter.get('/', authorizeAdmin, getAllUsers);

userRouter.post('/test-upload', uploader.single('profileImg'), (req, res) => {
    console.log(req.file);

    return res.status(200).json({ file: req.file });
});

module.exports = userRouter;
