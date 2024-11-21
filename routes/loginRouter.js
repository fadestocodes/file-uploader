const {Router} = require('express');
const loginRouter = Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

loginRouter.get('/', (req,res)=>{
    res.render('loginRouter');
});


loginRouter.post('/', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login'    
    })
);

module.exports = {loginRouter};