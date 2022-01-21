const jwt = require('jsonwebtoken')

const config = require('../config/app')

exports.Auth = (req, res, next) => {

    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({error: "mising token"})
    }
    jwt.verify(token, config.app_key, (err,user) =>{
        if (err) {
            return res.status(401).json({error: err})
        }

        req.user = user
    }) 

    next()
}