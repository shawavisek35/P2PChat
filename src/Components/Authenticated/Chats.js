import React, { useEffect, useState } from "react";
import {db} from "../../config/firebase";
import { Link } from "react-router-dom";
import { isAuth } from "../../helper/auth";
function Chats()
{
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        db.collection("chats").onSnapshot(snap => (
            setContacts(snap.docs.map(doc => {
                if(doc.data().name1 === isAuth().email || doc.data().name2 === isAuth().email)
                {
                    console.table(doc.data());
                    return(
                        {
                            id : doc.id,
                            data : doc.data()
                        }
                    )
                }
            }))
        ));
    }, [])
    return (
        <div className="col-3 px-2 py-2">
            {
                contacts.map((contact) => {
                    if(contact!=null)
                    {
                        if(contact.data.name1 === isAuth().email)
                        {
                            return (
                                <Link  key={contact.id} to={`/chat/${contact.id}`}>
                                    <div id={contact.id} className="form-inline px-2">
                                        <img src={require("../../assets/images/pika.jpg")} alt="chat" className="chat-image mr-2 rounded-circle" />
                                        <p className="chat-contact">{contact.data.name2.split("@")[0]}</p>
                                    </div>
                                    <hr />
                                </Link>
                            )
                        }
                        else{
                            return (
                                <Link  key={contact.id} to={`/chat/${contact.id}`}>
                                    <div id={contact.id} className="form-inline px-2">
                                        <img src={require("../../assets/images/pika.jpg")} alt="" className="chat-image mr-2 rounded-circle" />
                                        <p className="chat-contact">{contact.data.name1.split("@")[0]}</p>
                                    </div>
                                    <hr />
                                </Link>
                            )
                        }
                    }
                    
                })
            }
        </div>
    )
}

export default Chats;