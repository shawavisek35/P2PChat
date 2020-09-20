import React, { useEffect, useState } from "react";
import {db} from "../../config/firebase";
import { Link } from "react-router-dom";
function Chats()
{
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        db.collection("chats").onSnapshot(snap => (
            setContacts(snap.docs.map(doc => (
                {
                    id : doc.id,
                    data : doc.data()
                }
            )))
        ))
    }, [])
    return (
        <div className="col-3 px-2 py-2">
            {
                contacts.map(contact => (
                    <Link  key={contact.id} to={`/chat/${contact.id}`}>
                        <div id={contact.id} className="form-inline px-2">
                            <img src={require("../../assets/images/pika.jpg")} className="chat-image mr-2 rounded-circle" />
                            <p className="chat-contact">{contact.data.name2.split("@")[0]}</p>
                        </div>
                        <hr />
                    </Link>
                ))
            }
        </div>
    )
}

export default Chats;