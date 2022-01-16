const {body} = require('express-validator');

exports.rules = (() => {
    return [
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('password').isLength({ min : 8}),
        body('email').isEmail(),
        body('gender').notEmpty()
    ]
})()