require("./connection")
const Character = require("../models/Character")
const User = require("../models/user")
const Guild = require('../models/Guild')
const characterSeeds = require("./seeds.json")
const userSeeds = require("./userSeeds.json")
const guildSeeds = require('./guildSeeds.json')

Character.deleteMany({})
    .then(() => {
        return Character.insertMany(characterSeeds)
    })
    .then(() => {
           return Guild.deleteMany({})
            .then(()=>{
                return Guild.insertMany(guildSeeds)
            })
        })
    .catch(err => {
            console.log("Error in seeding data !!: ")
            console.log(err)
        })
    .finally(() => {
            process.exit()
        })
