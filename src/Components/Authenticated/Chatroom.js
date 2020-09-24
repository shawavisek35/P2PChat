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
        db.collection("chats").doc(chatId).onSnapshot(snap => {
            if(snap.data().name1 === isAuth().email)
            {
                setChat(snap.data().name2)
            }
            else{
                setChat(snap.data().name1)
            }
        });
        db.collection("chats").doc(chatId).collection("message").orderBy("time", "asc").onSnapshot(snap => (
            setMessage(snap.docs.map(doc => (
                doc.data()
            )))
        ));
    }, [chatId])

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
                <img src={require("../../assets/images/pika.jpg")} alt="" className="mr-3 rounded-circle" style={{width : "6%", height : "5%"}} />
                <p>{chat.split("@")[0]}</p>
            </div>
            <div className="chat-room overflow-auto">
                {
                    message.map((mes, index) => {
                        if(isAuth().email === mes.name)
                        {
                            return (
                                <div className="px-2 d-flex justify-content-end my-1" key={index}>
                                    <p className="receiver rounded-pill px-3 py-1 text-wrap">{mes.content}</p>
                                 </div>
                            )
                        }
                        else{
                            return (
                                <div className="px-2 d-flex justify-content-start my-1" key={index}>
                                    <p className={`chat-message rounded-pill px-2 py-1 text-wrap`}>{mes.content}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="chat-room-footer py-3">
                <form className="form-inline">
                    <input className="form-control message-box rounded-pill mr-2" value={newMessage} onChange={handleChange} />
                    <FaTelegramPlane size="2rem" className="send-message" onClick={sendMessage} />
                </form>
            </div>
        </div>
    )
}

export default ChatRoom;