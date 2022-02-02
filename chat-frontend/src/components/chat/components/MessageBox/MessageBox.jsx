import React, {useEffect,useRef, useState} from "react";
import './MessageBox.scss'
import Message from "../Chatheader/Message/Message";
import { useSelector, useDispatch } from "react-redux";
import {paginateMessages} from '../../../../store/actions/chat'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageBox = ({chat}) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)
    const msgBox = useRef(null)
    const scrollBottom = useSelector(state => state.chatReducer.scrollBottom)
    const senderTyping = useSelector(state => state.chatReducer.senderTyping)
    const[loading, setLoading] = useState(false)
    const [scrollUp, setscrollUp] = useState(0)

    const scrollManual = (value) => {
        msgBox.current.scrollTop= value
    }

    useEffect(() => {
            scrollManual(msgBox.current.scrollHeight)
        
    }, [])

    const handleInfiniteScroll = (e) => {
        if (e.target.scrollTop === 0) {
            setLoading(true)
            const pagination = chat.pagination
            const page = typeof pagination === 'undefined' ? 1 : pagination.page

            paginateMessages(dispatch, chat.id, parseInt(page)+1)
            .then(res => {
                if (res) {
                    setscrollUp(scrollUp+1)
                }
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        
        }
    }

    useEffect(() => {
        setTimeout(() => {
            scrollManual(Math.ceil(msgBox.current.scrollHeight * 0.1))
        }, 100);
    }, [scrollUp])

    useEffect(() => {
        if (senderTyping.typing && msgBox.current.scrollTop> msgBox.current.scrollHeight * 0.3) {
            setTimeout(() => {
                scrollManual(msgBox.current.scrollHeight)
            }, 100);
        }
    }, [senderTyping])

     useEffect(() => {
        if(!senderTyping.typing) {
            setTimeout(() => {
                scrollManual(msgBox.current.scrollHeight)
            }, 100);
        }
    }, [scrollBottom])
 

    return (
        <div onScroll={handleInfiniteScroll} id="msg-box" ref={msgBox} >
            {
                loading 
                ?<p className="loader m-0"> <FontAwesomeIcon icon='spinner' className='fa-spin'/> </p>
                : null
            }
            {
                chat.Messages.map((message, index) => {
                    return <Message
                              chat={chat}
                              message = {message}
                              index= {index}
                              user = {user}
                              key={message.id}/>
                })
            }
            {
                senderTyping.typing && senderTyping.chatId === chat.id
                ? <div className="message">
                    <div className="other-person">
                      <p className="m-0"> {senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName}...</p>
                    </div>
                 </div>
                 : null
            }

        </div>
    )
}

export default MessageBox