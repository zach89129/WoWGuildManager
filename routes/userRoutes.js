const express = require('express')
const router = express.Router();
const controller = require('../controllers/characterCtrl')


router.get('/', controller.loadUserLogin)

router.get('/new', controller.loadNewUser)

router.post('/', controller.createNewUser)



module.exports = router