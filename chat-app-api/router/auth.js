const router = require('express').Router()

const {body} = require('express-validator');

const {login, register} = require('../controllers/authControllers')
const {validate} = require('../validators/index')
const {rules: registerRules} = require('../validators/auth/register')
const {rules: loginRules} = require('../validators/auth/login')

router.post('/register', [registerRules, validate],register);

router.post('/login',[loginRules, validate], login);

module.exports = router