import { useEffect } from "react";
import SocketIOClient from 'socket.io-client'
import { addUserToGroup, createChat, senderTyping, receviedMwssage, fetchChats, onlineFriend, onlineFriends, offlineFriend, setSocket} from '../../../store/actions/chat'

function useSocket (user, dispatch) {
    useEffect(() => {
        fetchChats(dispatch)
            .then(res => {

                const socket = SocketIOClient.connect('http://127.0.0.1:3000')

                setSocket(dispatch, socket)

                socket.emit('join', user)

                socket.on('typing', (sender) => {
                    senderTyping(dispatch, sender)
                })

                socket.on('friends', (friends) => {
                    console.log('friends' , friends)
                    onlineFriends(dispatch, friends)
                })

                socket.on('online', (user) => {
                    console.log('online' , user)
                    onlineFriend(dispatch, user)
                })

                socket.on('offline', (user) => {
                    console.log('offline' , user)
                    offlineFriend(dispatch, user)
                })

                socket.on('received', (message) => {
                    receviedMwssage(dispatch, message, user.id)
                })

                socket.on('new-chat', (chat) => {
                    console.log('new chat ' , chat)
                    createChat(dispatch, chat)
                })

                socket.on('added-user-to-group', (group) => {
                    console.log('group ' , group)
                    addUserToGroup(dispatch, group)
                })

            })
            .catch (err => console.log(err))

        }, [dispatch])
}

export default useSocket