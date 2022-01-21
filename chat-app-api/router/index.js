const router = require('express').Router()

router.get('/home', (req,res) => {
    return res.send('home page');
})

router.use('/', require('./auth.js'));
router.use('/users', require('./user.js'));
router.use('/chats', require('./chat.js'))

module.exports = router