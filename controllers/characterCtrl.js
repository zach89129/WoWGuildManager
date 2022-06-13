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
      res.render('homepage', {characters} )
  })
}

const loadNewCharacter = (req,res) => {
    res.render('newCharacterPage')
}

const createNewChar = (req,res) => {
    //prepping recipes
    const str1 = req.body.recipe_1
    const recipes1arr = str1.split(",")
    const str2 = req.body.recipe_2
    const recipes2arr = str2.split(",")
    req.body.recipe_1 = recipes1arr
    req.body.recipe_2 = recipes2arr

    Character.create(req.body,(err, character)=>{
        if(err) return err
        character.owner = req.user._id
        character.materialReq = req.body
        character.save((err)=> {
            if(err) return err
            res.redirect('/guild')
        })
    })
}

const loadEditChar = (req, res)=>{
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        res.render('editCharacterPage', {singleChar})
    }) 
};

const editCharacter = (req,res)=>{
    const str1 = req.body.recipe_1
    const recipes1arr = str1.split(",")
    const str2 = req.body.recipe_2
    const recipes2arr = str2.split(",")
    req.body.recipe_1 = recipes1arr
    req.body.recipe_2 = recipes2arr

    Character.findOneAndUpdate({_id : req.params.id}, req.body)
    .then(()=>{
        Character.find({})
        .then(()=>{
            res.redirect(`/characters/${req.params.id}`)
        })
    })
};

const deleteChar = (req,res)=>{
    Character.findOneAndDelete({_id : req.params.id})
    .then(()=>{
        Character.find({})
        .then(()=>{
            res.redirect(`/guild`)
        })
    })
};


const loadCharPage = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        res.render('characterPage', {singleChar})
    })
    .catch(err => {
        console.log(err)
    })
}


const postNewItem = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        let prioArr = singleChar.items.map((item)=>{
            return item.priority
        })

        if (prioArr.includes(parseInt(req.body.priority))){
            res.redirect(`/characters/${req.params.id}/editWishlist?invalid=true`)
            res.end()
        } else {
            singleChar.items.push(req.body)
            singleChar.items = singleChar.items.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
            singleChar.save()
            setTimeout(() => {
                res.redirect(`/characters/${req.params.id}/editWishlist`)
              }, "650")
        }
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteOneItem = (req, res) =>{
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
            let index = parseInt(req.body.wishlistIndex)
            singleChar.items.splice(index, 1)
            singleChar.save()
    })
    .then(()=>{
        setTimeout(() => {
            res.redirect(`/characters/${req.params.id}/editWishlist`)
          }, "650")
    })
    
    
    .catch(err => {
        console.log(err)
    })
}

const loadEditItemsPage = (req,res) => {
    let invalid = req.url.split("=")[1]
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        let items = singleChar.items
        res.render('editItemsPage', {singleChar, items, invalid})
    })
    .catch(err => {
        console.log(err)
    })
}

const loadMatReqPage = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        console.log(singleChar.materialReq)
        res.render('matRequestForm', {singleChar})
    })
    .catch(err => {
        console.log(err)
    })
}

const postMatReq = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        singleChar.materialReq = req.body
        singleChar.save((err)=>{
            res.redirect(`/characters/${req.params.id}`)
        })
    })
}

const loadMatEditPage = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        res.render('editMatRequest', {singleChar})
    })
    .catch(err => {
        console.log(err)
    })
}

const postMatEdit = (req,res) => {
    Character.findById({_id : req.params.id})
    .then((singleChar)=>{
        singleChar.materialReq = req.body
        singleChar.save((err)=>{
            res.redirect(`/characters/${req.params.id}`)
        })
    })
}

const loadAllMatReq = (req,res) => {
    Character.find({})
    .then((characters)=>{
        res.render('allRequests', {characters})
    })
}

module.exports = {
    loadUserLogin,
    loadNewUser,
    createNewUser,
    loadHomepage,
    loadNewCharacter,
    createNewChar,
    loadCharPage,
    postNewItem,
    loadEditItemsPage,
    deleteOneItem,
    loadEditChar,
    editCharacter,
    deleteChar,
    loadMatEditPage,
    loadMatReqPage,
    postMatReq,
    postMatEdit,
    loadAllMatReq
}