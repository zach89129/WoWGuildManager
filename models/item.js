const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
const ItemSchema = new Schema(
  {
    name: String,
    link: String,
    boss: String,
    type: {
        slot: String,
        material: String,
    },
    priority: {
        type: Number,
        min: [1, 'That"s not an option!'],
        max: [3, 'You can only have 3 items!!']
    },
  }
);


const Item = mongoose.model("Item", ItemSchema);

//make this exportable to be accessed in `index.js`
module.exports = Item;