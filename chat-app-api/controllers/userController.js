const user = require('../models').user
const sequelize = require('sequelize')
const config = require('../config/app')

exports.update = async (req, res) => {
    if (req.file) {
        req.body.avatar = req.file.filename
    }

    try {
        // find if user trying to change to an email that already
        // exist i the database and its not his email
        const userinfo = await user.findOne({ 
            where: {
                email: req.body.email
            } 
        })
        if (userinfo && req.user.email != req.body.email) {
            return res.status(401).json({error : 'email already exist'})
        }

        //
        const [rows, result] = await user.update(req.body,
            {
                where : {
                    id: req.user.id
                },
                returning: true,
                individualHooks: true
            })
            const newUserinfo = result[0]
            
            if (newUserinfo.dataValues.avatar.split('-')[0] == 'avatar') {
                const url = `${config.app_url}:${config.app_port}`
                const avatarFileName = newUserinfo.dataValues.avatar
                const id = newUserinfo.dataValues.id

                newUserinfo.dataValues.avatar = `${url}/user/${id}/${avatarFileName}`
            }
            

            return res.send(newUserinfo.dataValues)

    } catch (e) {
        return res.status(500)
    }
    return res.send("update")
}