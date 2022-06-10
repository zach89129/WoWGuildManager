const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
const MaterialSchema = new Schema(
  {
    gemColor_1: String,
    gemAmt_1: Number,
    gemColor_2: String,
    gemAmt_2: Number,
    sunmoteAmt: Number
  }
);


const Material = mongoose.model("Material", MaterialSchema);

//make this exportable to be accessed in `index.js`
module.exports = Material;