import express from 'express';
import { loginGet, loginPost, logout } from '../controllers/loginController.js';
const loginRoute = express.Router();

loginRoute.get("/", loginGet);
loginRoute.post("/", loginPost);
loginRoute.get("/log-out", logout);

export {loginRoute};