import React, {useState, useEffect} from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useHistory, Switch, Route } from "react-router";
import { isAuth, signout } from "../../helper/auth";
import Chats from "./Chats";
import ChatRoom from "./Chatroom";
import {TiUserAdd} from "react-icons/ti"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { db } from "../../config/firebase";
import {BiSend} from "react-icons/bi";

function Home() 
{
    const [modal, setModal] = useState(false);
    const [user, setUsers] = useState([])
    const toggle = () => setModal(!modal);
    const history = useHistory();
    const signOut = () => {
        signout(() => {
            history.push("/");
        })
    }

    const sendMessage2 = (user) => {
        db.collection("chats").add({
            name1 : isAuth().email,
            name2 : user,
        })
        .then(() => {
            console.log("user added");
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        db.collection("users").onSnapshot(snap => (
            setUsers(snap.docs.map(doc => (
                {
                    name : doc.data().name
                }
            )))
        ))
    }, [])
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light header-section">
                <div className="w-100">
                    <div className="col-6 brand-logo">
                        <p className="float-left"><FaTelegramPlane className="mx-2"/>P2P Chat</p>
                    </div>
                        <p className="px-3">
                            <FiLogOut className="float-right mx-auto my-1 log" size="5%" color="red" onClick={signOut} />
                            <img src={isAuth().photoURL} className="profile-pic rounded-circle float-right mx-4" alt="profile" />
                            <TiUserAdd className="float-right mx-auto my-1 log" size="5%" color="green" onClick={toggle} />
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Add Chat</ModalHeader>
                                <ModalBody>
                                    {
                                        user.map((u,index) => {
                                            return (
                                                <div className="px-3 my-2 alert alert-primary" key={index}>
                                                    {u.name}
                                                    <BiSend className="float-right log" size="5%" onClick={() => sendMessage2(u.name)} />
                                                </div>
                                            )
                                        })
                                    }
                                </ModalBody>
                                <ModalFooter>
                                <Button color="secondary" onClick={toggle}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </p>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <Chats />
                    <Switch>
                        <Route path="/chat/:chatId">
                            <ChatRoom />
                        </Route>
                        <Route path="/">
                            <div className="text-center float-center">
                                <img src={require("../../assets/images/chatting.svg")} style={{width : "50%"}} />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
            
        </div>
    )
}

export default Home;