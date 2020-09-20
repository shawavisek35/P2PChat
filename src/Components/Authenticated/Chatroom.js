import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import {FaTelegramPlane} from "react-icons/fa";
import { isAuth } from "../../helper/auth";

function ChatRoom()
{
    const [message, setMessage] = useState([]);
    const [chat, setChat] = useState("");
    const {chatId} = useParams();
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        db.collection("chats").doc(chatId).onSnapshot(snap => (
            setChat(snap.data().name2)
        ));
        db.collection("chats").doc(chatId).collection("message").orderBy("time", "asc").onSnapshot(snap => (
            setMessage(snap.docs.map(doc => (
                doc.data()
            )))
        ));
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("chats").doc(chatId).collection("message").add(
            {
                name : isAuth().email,
                content : newMessage,
                time : Date.now()
            }
        )
        setNewMessage("")
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
        
    }

    return (
        <div className="col-9">
            <div className="chat-room-header px-2 py-1 align-middle form-inline">
                <img src={require("../../assets/images/pika.jpg")} className="mr-3 rounded-circle" style={{width : "5%", height : "5%"}} />
                <p>{chat}</p>
            </div>
            <div className="chat-room overflow-auto">
                {
                    message.map(mes => (
                        <>
                        <div className="px-2">
                            <p className={`chat-message rounded-pill text-center ${isAuth().email === mes.name && "receiver"}`}>{mes.content}</p>
                        </div>
                        <br />
                        </>
                    ))
                }
            </div>
            <div className="chat-room-footer row px-2 py-1">
                <form className="form-inline">
                    <input className="form-control message-box rounded-pill px-3 mr-5" value={newMessage} onChange={handleChange} />
                    <FaTelegramPlane size="2rem" className="send-message" onClick={sendMessage} />
                </form>
            </div>
        </div>
    )
}

export default ChatRoom;