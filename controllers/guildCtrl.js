
const Guild = require('../models/Guild')

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

//homepage is guildselector page. can create or click exsisting guild which routes to /:guildId/Characters. character model has a guild key and any new character created has guild key filled with guild id. can search by guild IDs to manage guildmates/pages and have a hidden value on form that automatically adds guildId when creating

///  / loads login page (make the oauth redirect to /guildSelect)
///  /guildSelect goes to :
///             /:guildId/Characters/newChar --- hidden input in form with name="guildId" value="<%=guild._id%>"
///             /:guildId/Characters/:charId


const loadGuildSelector = (req,res) => {
    Guild.find({})
    .then((guilds) =>{
        res.render('guildselector', {guilds, capitalize})
    })
}

const createNewGuild = (req,res) => {
    Guild.create(req.body,(err, guild)=>{
    if(err) return err
    guild.save((err)=> {
        if(err) return err
        res.redirect('/guildSelection')
    })
})
}

module.exports = {
    loadGuildSelector,
    createNewGuild
}