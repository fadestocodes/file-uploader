const {Router} = require('express');
const signupRouter = Router();
const bcrypt = require('bcryptjs');
const {addUser, addSession} = require('../services/indexServices');
const passport = require('passport')

signupRouter.get('/',(req,res)=>{
    res.render('signup');
});

signupRouter.post('/', async (req,res,next)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await addUser( username, hashedPassword, email );
        console.log(newUser);;

        req.login(newUser, (err)=>{
            if (err) {
                return next (err);
            }
            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
});


module.exports = {signupRouter};