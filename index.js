// DEPENDENCIES
const express = require('express')
const mongoose = require("mongoose");
const { json } = require('express/lib/response')
const methodOverride = require('method-override');


// CONFIGURATION
const app = express()
const PORT = 3000
require('./db/connection')
// SET UP ROUTES TO ACCEPT FORMS/JSON
app.set('view engine', "ejs")
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'));




const guildRouter = require('./routes/guildRoutes.js')
const userRouter = require('./routes/userRoutes.js')
app.use('/', userRouter);
app.use('/', guildRouter);








// Listener
app.listen(PORT, () => {
    console.log('listening on port', PORT)
  })