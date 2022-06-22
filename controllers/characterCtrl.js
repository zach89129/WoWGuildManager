const Character = require('../models/Character')
const User = require('../models/user')
//const Item = require('../unused/item')
//const Material = require('../unused/materials')



//user functions
const loadUserLogin = (req,res) => {
    User.findOne({username : req.body.username})
    .then((user) =>{
        res.render('loginPage', {user, capitalize})
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
            res.render('guildHomepage', {characters, user, capitalize} )
  })
})
}


//guild functions
const loadHomepage = (req,res) => {
    Character.find({ guild: ` ${req.params.guildId} `})
  .then((characters)=>{
      res.render('guildHomepage', {characters, capitalize, guild : req.params.guildId} )
  })
}

const loadNewCharacter = (req,res) => {
    res.render('newCharacterPage', {capitalize, guild : req.params.guildId})
}

const createNewChar = (req,res) => {
    //prepping recipes
    const str1 = req.body.recipe_1
    const recipes1arr = str1.split(", ")
    const str2 = req.body.recipe_2
    const recipes2arr = str2.split(", ")
    req.body.recipe_1 = recipes1arr
    req.body.recipe_2 = recipes2arr

    Character.create(req.body,(err, character)=>{
        if(err) return err
        character.owner = req.user._id
        character.materialReq = req.body
        character.guild = req.body.guildId
        character.save((err)=> {
            if(err) return err
            res.redirect(`/${req.params.guildId}/characters`)
        })
    })
}

const loadEditChar = (req, res)=>{
    Character.findById({_id : req.params.charId})
    .then((singleChar)=>{
        res.render('editCharacterPage', {guild: req.params.guildId, singleChar, capitalize})
    }) 
};

const editCharacter = (req,res)=>{
    const str1 = req.body.recipe_1
    const recipes1arr = str1.split(", ")
    const str2 = req.body.recipe_2
    const recipes2arr = str2.split(", ")


    req.body.recipe_1 = recipes1arr
    req.body.recipe_2 = recipes2arr

    Character.findOneAndUpdate({_id : req.params.charId}, req.body)
    .then(()=>{
        Character.find({})
        .then(()=>{
            res.redirect(`/${req.params.guildId}/characters/${req.params.charId}`)
        })
    })
};

const deleteChar = (req,res)=>{
    Character.findOneAndDelete({_id : req.params.charId})
    .then(()=>{
        Character.find({})
        .then(()=>{
            res.redirect(`/${req.params.guildId}/characters`)
        })
    })
};


const loadCharPage = (req,res) => {
    Character.findById({_id : req.params.charId})
    .populate('owner')
    .then((singleChar)=>{
        res.render('characterPage', {guild: req.params.guildId ,singleChar, deletable : singleChar.owner._id.equals(req.user._id), capitalize})
    })
    .catch(err => {
        console.log(err)
    })
}


const postNewItem = (req,res) => {
    Character.findById({_id : req.params.charId})
    .then((singleChar)=>{
        let prioArr = singleChar.items.map((item)=>{
            return item.priority
        })

        if (prioArr.includes(parseInt(req.body.priority))){
            res.redirect(`/${req.params.guildId}/characters/${req.params.charId}/editWishlist?invalid=true`)
            res.end()
        } else {
            singleChar.items.push(req.body)
            singleChar.items = singleChar.items.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
            singleChar.save()
            setTimeout(() => {
                res.redirect(`/${req.params.guildId}/characters/${req.params.charId}/editWishlist`)
              }, "650")
        }
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteOneItem = (req, res) =>{
    Character.findById({_id : req.params.charId})
    .then((singleChar)=>{
            let index = parseInt(req.body.wishlistIndex)
            singleChar.items.splice(index, 1)
            singleChar.save()
    })
    .then(()=>{
        setTimeout(() => {
            res.redirect(`/${req.params.guildId}/characters/${req.params.charId}/editWishlist`)
          }, "650")
    })
    
    
    .catch(err => {
        console.log(err)
    })
}

const loadEditItemsPage = (req,res) => {
    let invalid = req.url.split("=")[1]
    Character.findById({_id : req.params.charId})
    .then((singleChar)=>{
        let items = singleChar.items
        res.render('editItemsPage', {guild : req.params.guildId, singleChar, items, invalid, capitalize})
    })
    .catch(err => {
        console.log(err)
    })
}

// const loadMatReqPage = (req,res) => {
//     Character.findById({_id : req.params.id})
//     .then((singleChar)=>{
//         console.log(singleChar.materialReq)
//         res.render('matRequestForm', {singleChar})
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

// const postMatReq = (req,res) => {
//     Character.findById({_id : req.params.id})
//     .then((singleChar)=>{
//         singleChar.materialReq = req.body
//         singleChar.save((err)=>{
//             res.redirect(`/characters/${req.params.id}`)
//         })
//     })
// }

const loadMatEditPage = (req,res) => {
    Character.findById({_id : req.params.charId})
    .then((singleChar)=>{
        res.render('editMatRequest', {guild: req.params.guildId, singleChar, capitalize})
    })
    .catch(err => {
        console.log(err)
    })
}

const postMatEdit = (req,res) => {
    Character.findById({_id : req.params.charId})
    .then((singleChar)=>{
        singleChar.materialReq = req.body
        singleChar.save((err)=>{
            res.redirect(`/${req.params.guildId}/characters/${req.params.charId}`)
        })
    })
}

const loadAllMatReq = (req,res) => {
    Character.find({guild: ` ${req.params.guildId} `})
    .then((characters)=>{
        res.render('allRequests', {guild: req.params.guildId, characters, capitalize})
    })
}


// const searchRecipes = (req,res) => {
//     Character.find({guild: ` ${req.params.guildId} `, recipe_1 : req.body, recipe_2 : req.body})
//     .then((characters)=>{
//         res.render('recipeSearch', {guild: req.params.guildId, characters, capitalize})
//     })

//grammar helpers
let makeString = function (object) {
    if (object == null) return '';
    return '' + object;
};

let capitalize = function (str, lowercaseRest) {
    str = makeString(str);
    var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();
  
    return str.charAt(0).toUpperCase() + remainingChars;
};



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
    // loadMatReqPage,
    // postMatReq,
    postMatEdit,
    loadAllMatReq,
    capitalize
}