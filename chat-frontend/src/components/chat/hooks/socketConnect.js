import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SocketIOClient from 'socket.io-client'
import {fetchChats, onlineFriend, onlineFriends, offlineFriend, setSocket} from '../../../store/actions/chat'

function useSocket (user, dispatch) {
    useEffect(() => {
        fetchChats(dispatch)
            .then(res => {

                const socket = SocketIOClient.connect('http://127.0.0.1:3000')

                setSocket(dispatch, socket)

                socket.emit('join', user)

                socket.on('typing', (user) => {
                    console.log('event' , user)
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

            })
            .catch (err => console.log(err))

        }, [dispatch])
}

export default useSocket