require("./connection")
const Character = require("../models/Character")
const characterSeeds = require("./seeds.json")

Character.deleteMany({})
    .then(() => {
        return Character.insertMany(characterSeeds)
    })
    .then((character) => {
            console.log(character)
        })
    .catch(err => {
            console.log("Error in seeding data !!: ")
            console.log(err)
        })
    .finally(() => {
            process.exit()
        })
