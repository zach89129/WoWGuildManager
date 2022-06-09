const Character = require('../models/Character')
const User = require('../models/user')
const Item = require('../models/item')
const Material = require('../models/materials')



//user functions
const loadUserLogin = (req,res) => {
    res.render('loginPage')
}

const loadNewUser = (req,res) => {
    res.render('newUser')
}

const createNewUser = (req,res) => {
    User.create(req.body)
    .then(() =>{
        User.find({})
        .then(()=>{
            res.redirect('/')
        })
    })
}


//guild functions
const loadHomepage = (req,res) => {
    Character.find({})
  .then((characters)=>{
      console.log(characters)
      res.render('homepage', {characters} )
  })
}

const loadNewCharacter = (req,res) => {
    res.render('newCharacterPage')
}

const createNewChar = (req,res) => {
    Character.create(req.body)
    .then(() =>{
        Character.find({})
        .then(()=>{
            res.redirect('/guild')
        })
    })
}


module.exports = {
    loadUserLogin,
    loadNewUser,
    createNewUser,
    loadHomepage,
    loadNewCharacter,
    createNewChar,

}