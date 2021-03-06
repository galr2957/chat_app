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
                const url = `${config.app_url}`
                const avatarFileName = newUserinfo.dataValues.avatar
                const id = newUserinfo.dataValues.id

                newUserinfo.dataValues.avatar = `${url}/user/${id}/${avatarFileName}`
            }
            

            return res.send(newUserinfo.dataValues)

    } catch (e) {
        return res.status(500).json({'message' : e})
    }
}

exports.search = async (req, res) => {

    try{
        const users = await user.findAll({
            where: {
                [sequelize.Op.or]: {
                    nameConcated : sequelize.where(
                        sequelize.fn('concat', sequelize.col('firstName'), ' ', sequelize.col('lastName')),
                        {
                          [sequelize.Op.iLike] : `%${req.query.term}%`  
                        }
                    ),
                    email: {
                        [sequelize.Op.iLike] : `%${req.query.term}%`
                    }
                },
                [sequelize.Op.not] : {
                    id: req.user.id
                }
            },
            limit: 10
        })
        return res.json(users)
    } catch (e) {
        return res.status(500).json({error : e.message})
    }
}