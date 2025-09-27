import express from 'express';
import {formGet, formPost} from '../controllers/signUpController.js';

const signUpRoute = express.Router();

signUpRoute.get("/", formGet);
signUpRoute.post("/", formPost);

export {signUpRoute};