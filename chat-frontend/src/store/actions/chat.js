import ChatService from "../../services/chatService";
export const FETCH_CHATS = 'FETCH_CHATS'
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT'
export const FRIENDS_ONLINE = 'FRIENDS_ONLINE'
export const FRIEND_ONLINE = 'FRIEND_ONLINE'
export const FRIEND_OFFLINE = 'FRIEND_OFFLINE'
export const SET_SOCKET = 'SET_SOCKET'

export const fetchChats = (dispatch) => {
    return ChatService.fetchChats()
        .then(data => {
            data.forEach(chat => {
                chat.users.forEach(user => {
                    user.status = 'offline'  
                })
                chat.Messages.reverse()
            })
            dispatch ({type : FETCH_CHATS, payload: data})
            return data
        })
        .catch (err =>{
            throw err
        })
}

export const setCurrentChat = (dispatch,chat) => {
    dispatch({type: SET_CURRENT_CHAT, payload: chat})
}

export const onlineFriends = (dispatch,friends) => {
    dispatch({type: FRIENDS_ONLINE, payload: friends})
}

export const onlineFriend = (dispatch,friend) => {
    dispatch({type: FRIEND_ONLINE, payload: friend})
}

export const offlineFriend = (dispatch,friend) => {
    dispatch({type: FRIEND_OFFLINE, payload: friend})
}

export const setSocket = (dispatch,socket) => {
    dispatch({type: SET_SOCKET, payload: socket})
}