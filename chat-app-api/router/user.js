const router = require('express').Router()

const {update, search} = require('../controllers/userController')
const {validate} = require('../validators/index')
const {Auth} = require('../middleware/auth.js')
const {userFile} = require ('../middleware/fileupload')

router.post('/update',[Auth, userFile], update);
router.get('/search-users', Auth, search)

module.exports = router