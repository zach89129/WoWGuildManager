


//homepage is guildselector page. can create or click exsisting guild which routes to /:guildId/Characters. character model has a guild key and any new character created has guild key filled with guild id. can search by guild IDs to manage guildmates/pages and have a hidden value on form that automatically adds guildId when creating

///  / loads login page (make the oauth redirect to /guildSelect)
///  /guildSelect goes to :
///             /:guildId/Characters/newChar --- hidden input in form with name="guildId" value="<%=guild._id%>"
///             /:guildId/Characters/:charId
