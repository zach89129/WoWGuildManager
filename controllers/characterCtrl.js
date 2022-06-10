const Character = require('../models/Character')
const User = require('../models/user')
//const Item = require('../unused/item')
//const Material = require('../unused/materials')



//user functions
const loadUserLogin = (req,res) => {
    User.findOne({username : req.body.username})
    .then((user) =>{
        res.render('loginPage', {user})
    })
    
}

const loadNewUser = (req,res) => {
    res.render('newUser')
}

const createNewUser = (req,res) => {
    User.create(req.body)
    .then((user) =>{
        Character.find({})
            .then((characters)=>{
            console.log(characters)
            res.render('homepage', {characters, user} )
  })
})
}


//guild functions
const loadHomepage = (req,res) => {
    Character.find({})
  .then((characters)=>{
      console.log("this is the real one", characters)
      res.render('homepage', {characters} )
  })
}

const loadNewCharacter = (req,res) => {
    res.render('newCharacterPage')
}

const createNewChar = (req,res) => {
    Character.create(req.body,(err, character)=>{
        if(err) return err
        character.owner = req.user._id
        character.save((err)=> {
            if(err) return err
            res.redirect('/guild')
        })
    })
}


const loadCharPage = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        res.render('characterPage', {singleChar})
    })
    .catch(err => {
        console.log(err)
    })
}

const loadNewItemPage = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        res.render('newItemPage', {singleChar})
    })
    .catch(err => {
        console.log(err)
    })
}

const postNewItem = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        singleChar.items.push(req.body)
        singleChar.save()
        res.redirect(`/characters/${req.params.id}`)
    })
    .catch(err => {
        console.log(err)
    })
}

// const deleteItem = (req, res) =>{
//     Character.findById({_id : req.params.id})
//     .then((singleChar)=>{
//         singleChar.items.splice()
//         singleChar.save()
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

const loadEditItemsPage = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        let items = singleChar.items
        res.render('editItemsPage', {items})
    })
    .catch(err => {
        console.log(err)
    })
}
    // //DELETE BUTTONS
    //         const delete_1 = ()=>{
    //             Character.findById({_id : req.params.id})
    //             .then((singleChar)=>{
    //                 singleChar.items.splice(0, 1)
    //                 singleChar.save()
    //                 res.redirect(`/characters/${req.params.id}/editWishlist`)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         }
    //         const delete_2 = ()=>{
    //             Character.findById({_id : req.params.id})
    //             .then((singleChar)=>{
    //                 singleChar.items.splice(1, 1)
    //                 singleChar.save()
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         }
    //         const delete_3 = ()=>{
    //             Character.findById({_id : req.params.id})
    //             .then((singleChar)=>{
    //                 singleChar.items.splice(2, 1)
    //                 singleChar.save()
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         }

module.exports = {
    loadUserLogin,
    loadNewUser,
    createNewUser,
    loadHomepage,
    loadNewCharacter,
    createNewChar,
    loadCharPage,
    loadNewItemPage,
    postNewItem,
    loadEditItemsPage,
    // delete_1,
    // delete_2,
    // delete_3

}