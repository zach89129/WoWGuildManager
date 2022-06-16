const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema;



const GuildSchema = new Schema(
    {
      guildname: String, 
    }
  )

const Guild = mongoose.model("Guild", GuildSchema);

//make this exportable to be accessed in `index.js`
module.exports = Guild;
