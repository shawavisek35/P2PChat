import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router";
import { isAuth, signout } from "../../helper/auth";
import Chats from "./Chats";
import ChatRoom from "./Chatroom";

function Home() 
{
    const history = useHistory();
    const signOut = () => {
        signout(() => {
            history.push("/");
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light header-section">
                <div className="w-100">
                    <div className="col-6 brand-logo">
                        <p className="float-left"><FaTelegramPlane className="mx-2"/>P2P Chat</p>
                    </div>
                        <p className="px-3">
                            <FiLogOut className="float-right mx-auto my-1 log" size="2rem" color="red" onClick={signOut} />
                            <img src={isAuth().photoURL} className="profile-pic rounded-circle float-right mx-4" alt="profile" />
                        </p>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <Chats />
                    <ChatRoom />
                </div>
            </div>
            
        </div>
    )
}

export default Home;