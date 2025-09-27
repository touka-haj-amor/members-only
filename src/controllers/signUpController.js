import bcrypt from 'bcryptjs';
import {pool} from '../db/pool.js';

export const formGet = (req, res)=>{
    res.render("sign-up", {errors: []});
}

import {body, validationResult} from 'express-validator';

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10";

const validateUser = [
    body("firstname").trim()
    .matches(/^[A-Za-z\s]+$/).withMessage(`first name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`first name ${lengthErr}`),
    body("lastname").trim()
    .matches(/^[A-Za-z\s]+$/).withMessage(`last name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`last name ${lengthErr}`),
    body("username").isEmail().withMessage('Valid email required').normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('validatepassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })

];

export const formPost = [
    validateUser,
    async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).render("sign-up", {errors: errors.array()});
        }

        try{
         const hashedPassword = await bcrypt.hash(req.body.password, 10);
         await pool.query(`INSERT INTO users(firstname, lastname, username, password) VALUES ($1, $2, $3, $4)`, [req.body.firstname,req.body.lastname,req.body.username, hashedPassword]);
         res.redirect("/log-in");
        }
        catch (error){
          console.error(error);
          return res.status(500).send('Server error');
        }
},];