import {pool} from '../db/pool.js';

export const newMessageGet = (req, res)=>{
    if (!req.isAuthenticated()){
        return res.redirect("/log-in");
    }
    res.render("new-message");
};

export const newMessagePost = async (req, res, next) =>{
    if (!req.isAuthenticated()){
        return res.redirect("/log-in");
    }

    try{
        const {title, text} = req.body;
        const userId = req.user.id;
        await pool.query(
            "INSERT INTO messages(title, text, timestamp, userid) VALUES ($1, $2, NOW(), $3)", [title, text, userId] );
            res.redirect("/");
    }
    catch (error){
        console.error(error);
        return res.status(500).send('Server error');
    }
};