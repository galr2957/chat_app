import React, {Fragment, useState} from "react";
import './ChatHeader.scss'
import {userStatus} from '../../../../utils/helpers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatHeader = ({chat}) => {

    const [showChatOptiones, setshowChatOptiones] = useState(false)
    const [showAddFriendModal, setshowAddFriendModal] = useState(false)
    const [showCLeaveChatModal, setshowCLeaveChatModal] = useState(false)
    const [showDeleteChatModal, setshowDeleteChatModal] = useState(false)


    return (
        <Fragment> 
            <div id="chatter">
                {chat.users.map (user =>{
                    return( 
                        <div className="chatter-info">
                            <h3> {user.firstName} {user.lastName} </h3>
                            <div className="chatter-status"> 
                                 <span className={`online-status ${userStatus(user)}`}></span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <FontAwesomeIcon 
            icon={['fas', 'ellipsis-v']} 
            className="fa-icon"
            onClick={() => setshowChatOptiones(!showChatOptiones)}
            />

            {
                showChatOptiones
                ? <div id="settings">
                    <div>
                        <FontAwesomeIcon icon= {['fas', 'user-plus']} className="fa-icon"/>
                        <p> Add user to chat </p>
                    </div>
                    {
                       chat.type ==="group"
                            ?  <div>
                                <FontAwesomeIcon icon= {['fas', 'sign-out-alt']} className="fa-icon"/>
                                <p> Leave chat </p>
                                </div>
                            : null
                    }
                    
                    <div>
                        <FontAwesomeIcon icon= {['fas', 'trash']} className="fa-icon"/>
                        <p> Delete chat </p>
                    </div>
                </div>
                :   null
            }
        </Fragment>

    )
} 

export default ChatHeader