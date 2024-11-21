const {Router} = require('express');
const logoutRouter = Router();

logoutRouter.get('/', (req,res,next)=>{
    console.log('trying to log out');
    req.logout ((err)=>{
        if (err){
            console.log('error logging out');
            return next(err);
        }
        req.session.destroy((err)=>{
            if (err) {
                console.log('error destroying session', err);
            }
            res.clearCookie('connect.sid');
            res.redirect('/');
        })
    });
});

module.exports = {logoutRouter};