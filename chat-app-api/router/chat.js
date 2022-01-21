const router = require('express').Router()
const {index} = require('../controllers/chatController')
const {validate} = require('../validators/index')
const {Auth} = require('../middleware/auth')


router.get('/',[Auth], index);

module.exports = router
