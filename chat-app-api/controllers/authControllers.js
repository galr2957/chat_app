const config = require ('../config/app')

const user = require('../models').user

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const {app_key} = require('../config/app')


exports.login = async (req,res) => {
    const {email, password} = req.body;

    try {

        // find the user
        const userinfo = await user.findOne({ 
            where: {
                email
            } 
        })
        if (!userinfo) {
            return res.status(401).json({error : 'wrong email and/or password!'})
        }

        //check password match
        if (!bcrypt.compareSync(password, userinfo.password)) {
            console.log('wrong password');
            return res.status(401).json({error : 'wrong password!'}) 
        }

        //generate auth token
        const userWithToken = generatToken(userinfo.dataValues);

        if (userWithToken.avatar.split('-')[0] == 'avatar') {
            const url = `${config.app_url}:${config.app_port}`
            const avatarFileName = userWithToken.avatar
            const id = userWithToken.id

            userWithToken.avatar = `${url}/user/${id}/${avatarFileName}`
        }

        return res.send(userWithToken);

    } catch (e) {
        return res.status(500).json({message : 'wrong email and/or password'})
        
    }
}

exports.register = async (req,res) => {

    try {
        const userData = req.body
        userData.avatar = `${config.app_url}:${config.app_port}/${userData.gender}.svg`
        const userinfo = await user.create(userData)
        const userWithToken = await generatToken(userinfo.dataValues);
        return res.send(userWithToken);

    } catch (e) {
        return res.status(500).json({message : 'email already exist'})
    }

    
}

const generatToken = (user) => {
    delete user.password;

    const token = jwt.sign(user, app_key, {expiresIn: 86400})

    return {...user, ... {token}}
}