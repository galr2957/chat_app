import { INCREMENT_SCROLL, 
        CREATE_CHAT,
        PAGINATE_MESSAGES, 
        SENDER_TYPING, 
        RECEVIED_MESSAGE, 
        FETCH_CHATS, 
        SET_CURRENT_CHAT, 
        FRIENDS_ONLINE, 
        FRIEND_ONLINE, 
        FRIEND_OFFLINE, 
        SET_SOCKET, ADD_USER_TO_GROUP,
        LEAVE_CURRENT_CHAT,
        DELETE_CHAT } from "../actions/chat";


const initialState = {
    chats: [],
    currentChat: {},
    socket : {},
    newMessage: {chatId: null, seen: null},
    scrollBottom: 0,
    senderTyping: {typing: false}
}

const chatReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case FETCH_CHATS:
            return {
                ...state,
                chats: payload
            }

        case SET_CURRENT_CHAT:
            return  {
                ...state,
                currentChat: payload,
                scrollBottom : state.scrollBottom + 1,
                newMessage: {chatId: null, seen:null}
            }

        case FRIENDS_ONLINE: {
            const chatCopy = state.chats.map(chat => {
                return{
                    ...chat,
                    users: chat.users.map(user => {
                        if (payload.includes(user.id)) {
                           return { ...user,
                            status: 'online'
                           }
                        }
                        return user
                    })
                }
            })
            return{
                ...state,
                chats:chatCopy
            }
        }

        case FRIEND_ONLINE: {
            let currentChatCopy = {...state.currentChat}

            const chatCopy = state.chats.map( chat => {
                const users = chat.users.map (user => {
                    if (user.id === parseInt(payload.id)) {
                        return {
                            ...user,
                            status: 'online'
                        }
                    }
                    return user
                })
                if (chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        users
                    }
                }
                return {
                    ...chat,
                    users
                }
            })

            return {
                ...state,
                chats: chatCopy,
                currentChat: currentChatCopy
            }
        }

        case FRIEND_OFFLINE: {
            let currentChatCopy = {...state.currentChat}

            const chatCopy = state.chats.map( chat => {
                const users = chat.users.map (user => {
                    if (user.id === parseInt(payload.id)) {
                        return {
                            ...user,
                            status: 'offline'
                        }
                    }
                    return user
                })
                if (chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        users
                    }
                }
                return {
                    ...chat,
                    users
                }
            })

            return {
                ...state,
                chats: chatCopy,
                currentChat: currentChatCopy
            }
        }
        
        case SET_SOCKET: {
            return {
                ...state,
                socket: payload
            }
        }

        case RECEVIED_MESSAGE: {
            const {userId, message} = payload
            let currentChatCopy = { ...state.currentChat }
            let newMessage = {...state.newMessage}
            let scrollBottom = state.scrollBottom

            const chatCopy = state.chats.map(chat => {
                if (message.chatId === chat.id) {

                    if (message.user.id === userId) {
                        scrollBottom++
                    } else {
                        newMessage = {
                            chatId: chat.id,
                            seen: false
                        }
                    }

                    if (message.chatId === currentChatCopy.id) {
                        currentChatCopy = {
                            ...currentChatCopy,
                            Messages: [...currentChatCopy.Messages, ...[message]]
                        }
                    }

                    return { 
                        ...chat,
                        Messages: [...chat.Messages, ...[message]]

                    }
                }
                return chat
            })
            if (scrollBottom === state.scrollBottom){
                return {
                    ...state,
                    chats: chatCopy,
                    currentChat: currentChatCopy,
                    newMessage,
                    senderTyping: {typing: false}
                }
            }
            return {
                ...state,
                chats: chatCopy,
                currentChat: currentChatCopy,
                newMessage,
                scrollBottom,
                senderTyping: {typing: false}
            }

        }
        
        case SENDER_TYPING : {
            if(payload.typing) {
                return {
                    ...state,
                    senderTyping: payload,
                    scrollBottom: state.scrollBottom +1
                }
            }
            return {
                ...state,
                senderTyping: payload,
            }
        }

        case PAGINATE_MESSAGES: {
            const {messages, id, pagination} = payload

            let currentChatCopy = {...state.currentChat}

            const chatCopy = state.chats.map(chat => {
                if (chat.id === id) {
                    const shifted = [...messages, ...chat.Messages]

                    currentChatCopy = {
                        ...currentChatCopy,
                        Messages : shifted,
                        pagination: pagination
                    }

                    return {
                        ...chat,
                        Messages: shifted,
                        pagination: pagination
                    }
                }
                return chat
            })
            return {
                ...state,
                chats : chatCopy,
                currentChat : currentChatCopy
            }
            
        }

        case INCREMENT_SCROLL:
            return {
                ...state,
                scrollBottom : state.scrollBottom +1,
                newMessage: {chatId: null, seen: true}
            }
        
        case CREATE_CHAT:
            return {
                ...state,
                chats: [...state.chats, ...[payload]]
            } 

        case ADD_USER_TO_GROUP:
            const {chat,chatters} = payload

            let exists = false

            const chatCopy = state.chats.map(chatstate => {
                if (chat.id === chatstate.id) {
                    exists = true
                    return {
                        ...chatstate,
                        users: [...chatstate.users, ...chatters],
                        type: chat.type
                    }
                }
                return chatstate
            })
            if (!exists) {
                chatCopy.push(chat)
            }
            let currentChatCopy = {...state.currentChat}

            if (Object.keys(currentChatCopy).length > 0) {
                if (chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...state.currentChat,
                        users: [
                            ...state.currentChat.users,
                            ...chatters
                        ]
                    }
                }
            }
            return{
                ...state,
                chats: chatCopy,
                currentChat: currentChatCopy
            }
        
        case LEAVE_CURRENT_CHAT: {
            const {chatId, userId,currentUserId} = payload

            if (userId === currentUserId) {
                const chatsCopy = state.chats.filter(chat=> chat.id !== chatId)

                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: state.currentChat.id === chatId ? {} : state.currentChat
                }
            } else {
                const chatsCopy = state.chats.map( chat => {
                    if (chatId === chat.id) {
                        return{
                            ...chat,
                            users: chat.users.filter(user => user.id !== userId)
                        }
                    }

                    return chat
                })

                let currentChatCopy = {...state.currentChat}
                if (currentChatCopy.id === chatId) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        users: currentChatCopy.users.filter(user => user.id !== userId)
                    }
                }
                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: currentChatCopy
            }
            }
        }

        case DELETE_CHAT: {
            return{
                ...state,
                chats: state.chats.filter(chat => chat.id !== payload),
                currentChat: state.currentChat.id === payload? {} : state.currentChat
            }
        }
            

        default : {
            return state
        }
    }
}

export default chatReducer