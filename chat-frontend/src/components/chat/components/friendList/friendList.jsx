import React, {useState, Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from '../friend/friend'
import { setCurrentChat } from "../../../../store/actions/chat";
import Modal from '../../../modal/modal'
import ChatService from "../../../../services/chatService";
import './friendList.scss'

const FriendList = () => {

    const chats = useSelector(state => state.chatReducer.chats)
    const socket = useSelector(state => state.chatReducer.socket)
    const dispatch = useDispatch()
    const [showFriendsModal, setshowFriendsModal] = useState(false)
    const [suggestions, setsuggestions] = useState([])

    const openChat = ( chat) => {
        setCurrentChat(dispatch, chat)
    }

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
        .then(res => {
            setsuggestions(res)
        })
    }
    const addNewFriend = (id) => {
        ChatService.createChat(id)
        .then(chats => {
            socket.emit('add-friend',chats)
            setshowFriendsModal(false)
        })
        .catch(err => console.log(err))
    }
    return (
        <div id="friends" className="shadow-light">
            <div id="title">
                <h3 className="m-0"> friends</h3>
                <button onClick={() => setshowFriendsModal(true)}> ADD </button>
            </div>

            <hr/>

            <div id="friends-box">
                {
                    chats.length > 0 
                        ? chats.map (chat => {
                            return <Friend click={()=> openChat(chat)}chat={chat} key={chat.id}/>
                        })
                        :<p id="no-chat"> No friends added</p>
                }
            </div>
            {
                showFriendsModal
                ? <Modal click={() => setshowFriendsModal(false)}> 
                    <Fragment key='header'>
                        <h3 className="m-0">
                            creats new chats
                        </h3>
                    </Fragment>

                    <Fragment key='body'>
                        <p>
                            find friends by typing their name
                        </p>
                        <input  onChange={e => searchFriends(e)} 
                                type='text' 
                                placrholder='search...'/>
                        <div id="suggestions">
                            {
                                suggestions.map(user=> {
                                    return (
                                    <div key={user.id} className="suggestion">
                                        <p className="m-0"> {user.firstName} {user.lastName} </p> 
                                        <button onClick={() => addNewFriend(user.id)}>ADD</button>

                                    </div>)
                                })
                            }
                        </div>
                    </Fragment>
                </Modal>
                :null
            }
        </div>
    )
}

export default FriendList