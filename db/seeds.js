require("./connection")
const Character = require("../models/Character")
const User = require("../models/user")
const characterSeeds = require("./seeds.json")
const userSeeds = require("./userSeeds.json")

Character.deleteMany({})
    .then(() => {
        return Character.insertMany(characterSeeds)
    })
    .then(() => {
           return User.deleteMany({})
            .then(()=>{
                return User.insertMany(userSeeds)
            })
        })
    .catch(err => {
            console.log("Error in seeding data !!: ")
            console.log(err)
        })
    .finally(() => {
            process.exit()
        })
