import React, { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { useSession } from '../hooks';
import { login, register } from '../hooks/controller';
import './Header.css';
import {useNavigate} from 'react-router-dom';
import { User } from '../hooks/constants';

export function Login(props: any) {
    const [state, dispatch] = useSession();
    const {signedIn} = state;
    const {setSignedIn, setUser} = dispatch;
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const [loggedin, setLoggedin] = useState("login");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const changeToggle = () => {
        if(loggedin === "login") {
            setLoggedin("register");
        } else {
            setLoggedin("login");
        }
    }

    const loginCallback = (success: boolean, message: string, user: User) => {
        if(success) {
            setErrorMsg("");
            setSignedIn(true);
            setUser(user);
            navigate("/");
        } else {
            setErrorMsg(message);
        }
    }

    const registerCallback = (success: boolean, message: string) => {
        if(success) {
            setErrorMsg("");
            setLoggedin("login");
        } else {
            setErrorMsg(message);
        }
    }

    const submitLogin = () => {
        login(loginUsername, loginPassword, loginCallback);
    };

    const submitRegister = () => {
        register(registerName, registerUsername, registerPassword, registerCallback);
    };

    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="container-fluid">
                    {errorMsg && <p className="error"> {errorMsg} </p>}
                    <button className="btn btn-primary" onClick={changeToggle}>
                        {loggedin === "login" ? "Login (click to toggle to Register)" : "Register (click to toggle to Login)"}
                    </button>
                </div>
                {
                    loggedin === "login" ?
                    <div className="container-fluid">
                        <label>
                            Email: 
                            <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password: 
                            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </label>
                        <br />
                        <button className="btn btn-primary" onClick={submitLogin}>Submit</button>
                    </div> :
                    <div className="container-fluid">
                        <label>
                            Name: 
                            <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Email: 
                            <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password: 
                            <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                        </label>
                        <br />
                        <button className="btn btn-primary" onClick={submitRegister}>Submit</button>
                    </div>
                }
            </div>
            <div>

            </div>
        </div>
    );
}
