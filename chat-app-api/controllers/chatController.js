const models = require('../models');
const User = models.user;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const {Op} = require('sequelize');
const { sequelize } = require('../models');
const e = require('express');

exports.index = async (req,res) => {
    const user = await User.findOne ({
        where: {
            id: req.user.id
        },
        include : [
            {
                model:Chat,
                include :[
                    {
                        model:User,
                        where : {
                            [Op.not] : {
                                id: req.user.id
                            }
                        }
                    },
                    {
                        model:Message,
                        include : [
                            {
                                model: User
                            }
                        ],
                        limit: 20,
                        order:[['id', 'DESC']] 
                    }
                  
                ]
            }
        ]
    })
 
    return res.json(user.Chats)
}

exports.create = async (req, res) => {

    const {partnerId}  = req.body
    const t = await sequelize.transaction()

    try {
        const user = await User.findOne ({
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: Chat,
                    where: {
                        type: 'dual'
                    },
                    include: [
                        {
                            model:ChatUser,
                            where : {
                                userId: partnerId
                            }
                        }
                    ]
                }
            ]
        })
        
        if (user && user.Chats.length >0) {
            return res.status(403).json({status:'Error', message: 'chat with this user already exists'})
        }
        const chat = await Chat.create({type: 'dual'}, {transaction: t})

        await ChatUser.bulkCreate([
            {
                chatId: chat.id,
                userId: req.user.id
            },
            {
                chatId: chat.id,
                userId: partnerId
            }
        ], {transaction: t})

        await t.commit()
        

        const creator = await User.findOne ({
            where: {
                id: req.user.id
            }
        })

        const partner = await User.findOne ({
            where: {
                id: partnerId
            }
        })

        const forCreator = {
            id: chat.id,
            type: 'dual',
            users : [partner],
            Messages: []
        }
       
        const forReciver = {
            id: chat.id,
            type: 'dual',
            users : [creator],
            Messages: []
        }

        return res.json([forCreator, forReciver])
    } catch (e) {
        // await t.rollback();
        console.log(e)
        return res.status(500).json({status:'Error', message: e.message})
    }
}

exports.messages = async (req, res) => {
    
    const limit = 10
    const page = req.query.page || 1
    const offset = page > 1 ? page * limit : 0

    const messages = await Message.findAndCountAll ({
        where : {
            chatId: req.query.id
        },
        include : [
            {
                model: User
            }
        ],
        limit,
        offset,
        order: [['id', 'DESC']]
    })

    const totalpages = Math.ceil(messages.count / limit)

    if (page > totalpages) return res.json({data: {messages: [] } })

    const result = {
        messages: messages.rows,
        pagination : {
            page,
            totalpages
        }
    }
    return res.json(result)
}

exports.imageUpload = (req,res) => {
    if(req.file ) {
        return res.json({url: req.file.filename})
    }

    return res.status(500).json('not a file')
}

exports.addUserToGroup = async(req, res) => {
    try {
        const {chatId, userId} = req.body

        const chat = await Chat.findOne({
            where: {
                id: chatId
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Message,
                    include :[
                        {
                            model: User
                        }
                    ],
                    limit: 20,
                    order : [['id', 'DESC']]
                }
            ]
        })

        chat.Messages.reverse()

        chat.users.forEach(user => {
            if (user.id === userId) {
                return res.status(403).json({message: 'User already in the group'})
            }
        })

        await ChatUser.create({chatId,userId})

        const newChatter = await User.findOne({
            where: {
                id: userId
            }
        })

        if (chat.type === "dual") {
            chat.type = 'group'
            chat.save()
        }

        return res.json({chat, newChatter})


    }catch (e) { console.log(e)
        // /return res.status(500).json({status:'Error', message: e.message})
    }
}

exports.deleteChat = async (req, res) => {
    try {
         const chat = await Chat.findOne ({
            where: {
                id: req.params.id
            },
            include : [
                {
                    model: User
                }
            ]
           })
           const notifyUsers = chat.users.map(user => user.id)
        
           await chat.destroy()

        return res.json({chatId: req.params.id, notifyUsers})
    } catch (e) {
        return res.status(500).json({status: 'Error', message: `can't delete chat ${req.params.id}`})

    }
}

exports.leaveCurrentChat = async(req, res) => {
    try {
        const {chatId} = req.body
    const chat = await Chat.findOne({
        where : {
            id: chatId
        },
        include: [
            {
                model: User
            }
        ]

    })
    if (chat.users.length === 2) {
        return res.status(403).json({status: "error", message: "you cannot leave this chat"})
    }
    if (chat.users.length === 3) {
        chat.type = 'dual'
        chat.save()
    }

    await ChatUser.destroy({
        where: {
            chatId,
            userId: req.user.id
        }
    })

    await Message.destroy({
        where : {
            chatId,
            fromUserId: req.user.id
        }
    })

    const notifyUsers = chat.users.map(user => user.id)

    return res.json({chatId: chat.id, userId: req.user.id, currentUserId: req.user.id, notifyUsers})


    }
    catch (e) {
        return res.status(500).json({status: "error", message: e.message})
    }

}