import express from 'express';
import { deleteAccount, login, logout, profile, signup } from '../controllers/administer.controller.js';
import { isAuthorized, loginMiddleware, signupMiddleware } from '../middlewares/administer.middleware.js';

const administerRouter = express.Router();

administerRouter.post('/signup',signupMiddleware, signup);
administerRouter.post('/login',loginMiddleware, login);
administerRouter.post('/logout', logout);
administerRouter.get('/profile', isAuthorized, profile);
administerRouter.delete('/delete', isAuthorized, deleteAccount);

export default administerRouter;