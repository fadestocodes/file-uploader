const express = require('express');
const app = express();
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const bcrypt = require('bcryptjs');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('./prisma/prisma');

app.use(express.urlencoded({extended : true}));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const {indexRouter} = require('./routes/indexRouter');
const { signupRouter } = require('./routes/signup');
const {loginRouter} = require('./routes/loginRouter');
const {logoutRouter} = require('./routes/logoutRouter');
const {uploadRouter} = require('./routes/upload');
const {foldersRouter} = require('./routes/foldersRouter');

passport.use(
    new LocalStrategy (async (username,password,done)=>{
        console.log("Attempting login for user: ",username);
        try {
            const user = await prisma.user.findUnique({
                where : {username}
            });
            if (!user){
                console.log('User not found');
                return done(null, false, {message: "Incorrect username"});
            }
            console.log('Submitted Password: ', password);
            console.log('Stored hashed password: ', user.password);
            const match = await bcrypt.compare(password, user.password);
            if (!match){
                console.log('Password does not match');
                return done (null, false, {message : "Incorrect password"});
            }
            console.log('Authenticated successfully');
            return done(null, user);
        } catch (err) {
            console.log('Error in authentication: ', err);
            return done(err);
        }
    })
);

passport.serializeUser((user,done)=>{
    console.log(user);
    done(null,{userId : user.id});
});
passport.deserializeUser(async (sessionData, done)=>{
    try {
        const user = await prisma.user.findUnique({
            where : {id : sessionData.userId}
        });
        if (!user){
            console.log("uiser not found in DB");
            return done(null, false);
        }
        done(null,user);
    } catch (err) {
        done (err);
    }
});


app.use(
    session({
        cookie : {
            maxAge : 7 * 24 * 60 * 60 * 1000
        },
        secret : 'biggiethegreat',
        resave : false,
        saveUninitialized : false,
        store : new PrismaSessionStore(
            prisma,
            {
                checkPeriod : 2 * 60 * 1000,
                dbRecordIdIsSessionId : false,
            }
        )
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/upload', uploadRouter);
app.use('/folder', foldersRouter);

app.listen(3000, ()=> console.log("Express listening on Port: 3000"));