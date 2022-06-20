const express = require('express');
const { capitalize } = require('underscore');
const router = express.Router();
const controller = require('../controllers/characterCtrl')
const guildController = require('../controllers/guildCtrl')


router.get('/guildSelection', guildController.loadGuildSelector)

router.post('/guildSelection', guildController.createNewGuild)

//character routes

router.get('/:guildId/characters', controller.loadHomepage)

router.get('/:guildId/characters/new', controller.loadNewCharacter)

router.post('/:guildId/characters', controller.createNewChar )

router.get('/:guildId/characters/:charId', controller.loadCharPage)

router.get('/:guildId/characters/:charId/edit', controller.loadEditChar) 

router.put("/:guildId/characters/:charId", controller.editCharacter)

router.delete("/:guildId/characters/:charId", controller.deleteChar)

//wishlist routes

router.get('/:guildId/characters/:charId/editWishlist', controller.loadEditItemsPage)

router.post('/:guildId/characters/:charId/editWishlist', controller.postNewItem)

router.delete('/:guildId/characters/:charId/editWishlist', controller.deleteOneItem)

//materials routes
router.get("/:guildId/materialRequests", controller.loadAllMatReq)

router.get('/:guildId/characters/:charId/materialedit', controller.loadMatEditPage)

router.put('/:guildId/characters/:charId/matReq', controller.postMatEdit)



module.exports = router