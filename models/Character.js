const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor
const ItemSchema = require('./item')
const MaterialSchema = require('./materials')




const CharacterSchema = new Schema(
  {
    name: String,
    class: String,
    specialization: String,
    profession_1: String,
    recipe_1: [String],
    profession_2: String,
    recipe_2: [String],
    // materialReq: MaterialSchema,
    // items: [ItemSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
  }
);



const Character = mongoose.model("Character", CharacterSchema);

//make this exportable to be accessed in `index.js`
module.exports = Character;