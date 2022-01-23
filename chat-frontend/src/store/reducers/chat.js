import { FETCH_CHATS, SET_CURRENT_CHAT, FRIENDS_ONLINE, FRIEND_ONLINE, FRIEND_OFFLINE, SET_SOCKET } from "../actions/chat";


const initialState = {
    chats: [],
    currentChat: {},
    socket : {}
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
                currentChat: payload
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

        default : {
            return state
        }
    }
}

export default chatReducer