const express = require('express')
const router = express.Router();
const controller = require('../controllers/characterCtrl')


//character routes

router.get('/guild', controller.loadHomepage)

router.get('/guild/new', controller.loadNewCharacter)

router.post('/guild', controller.createNewChar )

router.get('/characters/:id', controller.loadCharPage)

router.get('/characters/:id/editCharacter', controller.loadEditChar) 

router.put("/characters/:id", controller.editCharacter)

router.delete("/characters/:id", controller.deleteChar)

//wishlist routes

router.get('/characters/:id/editWishlist', controller.loadEditItemsPage)

router.post('/characters/:id/editWishlist', controller.postNewItem)

router.delete('/characters/:id/editWishlist', controller.deleteOneItem)

//materials routes

router.get('/characters/:id/materialrequest', controller.loadMatReqPage)

router.post('/characters/:id', controller.postMatReq)

router.get('/characters/:id/materialedit', controller.loadMatEditPage)

router.put('/characters/:id', controller.postMatEdit)

router.get("/guild/matrequests", controller.loadAllMatReq)


module.exports = router