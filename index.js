// DEPENDENCIES
const express = require('express')
const mongoose = require("mongoose");
const { json } = require('express/lib/response')
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()

// CONFIGURATION
const app = express()
const PORT = 3000
require('./db/connection')
require('./db/passport');
// SET UP ROUTES TO ACCEPT FORMS/JSON
app.set('view engine', "ejs")
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(session({
  secret: 'fds51kdas2',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
  res.locals.user = req.user;
  console.log("this is the drone youre looking for",res.locals, req.user)
  next();
});


const guildRouter = require('./routes/guildRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const googleAuth = require('./routes/index.js')
app.use(userRouter);
app.use(guildRouter);
app.use(googleAuth)








// Listener
app.listen(PORT, () => {
    console.log('listening on port', PORT)
  })