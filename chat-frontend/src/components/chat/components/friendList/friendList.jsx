import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from '../friend/friend'
import { setCurrentChat } from "../../../../store/actions/chat";
import './friendList.scss'

const FriendList = () => {

    const chats = useSelector(state => state.chatReducer.chats)
    const dispatch = useDispatch()

    const openChat = ( chat) => {
        setCurrentChat(dispatch, chat)
    }
    return (
        <div id="friends" className="shadow-light">
            <div id="title">
                <h3 className="m-0"> friends</h3>
                <button> ADD </button>
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
        </div>
    )
}

export default FriendList