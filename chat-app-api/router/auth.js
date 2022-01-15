const router = require('express').Router()

const {login, register} = require('../controllers/authControllers')
const {body} = require('express-validator')

router.post('/register', register);


router.post('/login', login);


module.exports = router