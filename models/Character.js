const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor
//const ItemSchema = require('./item')
// const MaterialSchema = require('./materials.js')

const ItemSchema = new Schema(
  {
    name: String,
    link: String,
    boss: String,
    slot: String,
    material: String,
    priority: {
        type: Number,
        min: [1, 'That"s not an option!'],
        max: [3, 'You can only have 3 items!!'],
    },
  }
);


const MaterialSchema = new Schema(
  {
    gemColor_1: String,
    gemAmt_1: Number,
    gemColor_2: String,
    gemAmt_2: Number,
    sunmoteAmt: Number
  }
);

const CharacterSchema = new Schema(
  {
    name: String,
    class: String,
    specialization: String,
    profession_1: String,
    recipe_1: [String],
    profession_2: String,
    recipe_2: [String],
    materialReq: MaterialSchema,
    items: [ItemSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    guild: ""
  }
);


const Character = mongoose.model("Character", CharacterSchema);

//make this exportable to be accessed in `index.js`
module.exports = Character;