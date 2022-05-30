const { Router } = require('express');
const {
    findByName, getAllUsers, getById, getOwn, updateUser, deleteUser,
} = require('../controllers/user.controller');
const { authorizeAdmin } = require('../middlewares/authorize');

const userRouter = Router();

userRouter.get('/search', findByName);
userRouter.get('/me', getOwn);

userRouter.get('/:id', authorizeAdmin, getById);

userRouter.get('/', getAllUsers);

userRouter.patch('/update', updateUser);

userRouter.delete('/delete', deleteUser);

module.exports = userRouter;
