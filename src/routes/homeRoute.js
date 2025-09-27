import express from 'express';
import { newMessageGet, newMessagePost, listMessages } from '../controllers/homePageController.js';

const homeRoute = express.Router();

homeRoute.get("/", listMessages);
homeRoute.get("/newMessage", newMessageGet);
homeRoute.post("/newMessage", newMessagePost);

export {homeRoute}