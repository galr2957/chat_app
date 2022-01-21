const router = require('express').Router()
const {index, create, messages, deleteChat} = require('../controllers/chatController')
const {validate} = require('../validators/index')
const {Auth} = require('../middleware/auth')


router.get('/',[Auth], index);
router.post('/create',[Auth], create);
router.get('/messages',[Auth], messages);
router.delete('/:id',[Auth], deleteChat);

module.exports = router
