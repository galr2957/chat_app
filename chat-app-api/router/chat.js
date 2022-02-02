const router = require('express').Router()
const {index, create, messages, deleteChat, imageUpload, addUserToGroup} = require('../controllers/chatController')
const {validate} = require('../validators/index')
const {Auth} = require('../middleware/auth')
const {chatFile} = require('../middleware/fileupload')

router.get('/',[Auth], index);
router.post('/create',[Auth], create);
router.get('/messages',[Auth], messages);
router.delete('/:id',[Auth], deleteChat);
router.post('/upload-image',[Auth, chatFile], imageUpload);
router.post('/add-user-to-group',Auth, addUserToGroup);

module.exports = router
