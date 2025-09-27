import express from 'express';
import path from 'path';
import url from 'url';
import {pool} from './db/pool.js';
import session from 'express-session';
import passport from 'passport';
import {Strategy as LocalStrategy} from "passport-local";
import './passportConfig.js';
import {signUpRoute} from './routes/signUpRoute.js';
import {loginRoute} from "./routes/logInRoute.js";
import {homeRoute} from "./routes/homeRoute.js";

const app = express();
const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));

app.use(session({secret:"cats", resave: false, saveUninitialized: false}));
app.use(passport.session());

app.use("/", homeRoute);
app.use("/sign-up",signUpRoute);
app.use("/log-in", loginRoute);


app.listen(PORT, (error)=>{
    if (error){
        throw new error;
    }
    console.log(`app listening on ${PORT}`);
});