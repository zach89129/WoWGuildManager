// db/connection.js
// Require Mongoose:
const mongoose = require('mongoose')
const db = mongoose.connection


//connect to database
mongoose.connect('mongodb://localhost:27017/wow-guild-manager', {
    useNewUrlParser: true
})





//mongoose errors
db.on("error", err => console.log(err.message + " is MongoDB not running?"));
db.on("disconnected", () => console.log("MongoDB disconnected"));

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})