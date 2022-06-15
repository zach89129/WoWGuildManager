const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema;



const GuildSchema = new Schema(
    {
      guildname: String,
      characters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Character',
        required: false
      }
    }
  )

  const Guild = mongoose.model("Guild", GuildSchema);

  //make this exportable to be accessed in `index.js`
  module.exports = Guild;
