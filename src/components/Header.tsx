import React from 'react';
import { useSession } from '../hooks';
import './Header.css';
import {useNavigate} from 'react-router-dom';

export function Header(props: any) {
    const navigate = useNavigate();
    const [state] = useSession();
    const {signedIn, user} = state;

    const signOn = () => {
        navigate("/login");
    };

    const goHome = () => {
        navigate("/");
    }
    
    return (
        <div className="container-fluid header">
            <h1 className="text-left" onClick={goHome}>Library</h1>
            {
                signedIn ? 
                <p>Hello {user?.NAME}</p> :
                <button className="btn login justify-content-end" onClick={signOn}>
                    Log In
                </button>
            }
        </div>
    );
}
