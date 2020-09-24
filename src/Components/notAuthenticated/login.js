import React from "react";
import {
    auth,
    db,
    provider,
    
} from "../../config/firebase";

import {useHistory} from "react-router-dom";

import {
    authenticate,
    
} from "../../helper/auth";
import {
    FcGoogle
} from "react-icons/fc"
import { FaTelegramPlane } from "react-icons/fa";


const Login = () => {
    const history = useHistory();
    const signIn = (e) => {
        e.preventDefault();        

        auth.signInWithPopup(provider)
        .then((response) => {

            db.collection("users").doc(response.user.email).set({
                name : response.user.email
            })
            .then(() => {
                console.log("User registered.");
                authenticate(response, () => {
                    history.push("/");
                });
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
          
    }

    return (
        <div className="row">
            <div className="col-sm-12 col-md-6 py-5">
                <img src={require("../../assets/images/login.svg")} alt="login" className="img-fluid" />
            </div>
            <div className="col-sm-12 col-md-6 py-5">
                <div className="card card-login text-center my-5 mx-5 border-0" style={{width : "20rem"}} >
                    <div className="card-body">
                        <p className="text-center"><FaTelegramPlane size="3rem"/></p>
                        <h2 className="text-center card-p">P2P Chat</h2>
                        <button type="button" className="mt-5 btn btn-outline-danger" onClick={signIn}>
                        <FcGoogle size="2rem" className="mr-3" />Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;