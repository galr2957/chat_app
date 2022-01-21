const router = require('express').Router()

const {update} = require('../controllers/userController')
const {validate} = require('../validators/index')
const {Auth} = require('../middleware/auth.js')
const {userFile} = require ('../middleware/fileupload')

router.post('/update',[Auth, userFile], update);

module.exports = router