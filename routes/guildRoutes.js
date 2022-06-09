const express = require('express')
const router = express.Router();
const controller = require('../controllers/characterCtrl')




router.get('/guild', controller.loadHomepage)

router.get('/guild/new', controller.loadNewCharacter)

router.post('/guild', controller.createNewChar )

router.get('/characters/:id', /*load character page */)

router.get('/characters/:id/editWishlist', /*load edit items*/) 

router.get('/characters/:id/editCharacter', /*load edit character page */) 

router.put("/characters/:id", /* edit character page */)

router.delete("/characters/:id", /*delete character page */)

// router.get('/guild/:id/materialrequest', /*load new material request page */)

// router.post('/guild/:id', /*posting material request */)

// router.get('/guild/:id/materialedit', /*load material request edit page */)

// router.put('/guild/:id', /*posting edit request */)

// router.get("/guild/materialrequests", /*load material request page showing all */)


module.exports = router