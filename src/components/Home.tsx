import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Stages, useSession } from '../hooks/useSession';

export function Home(props: any) {
    const [, dispatch] = useSession();
    const {setStage} = dispatch;
    const navigate = useNavigate();

    const navigateToBooks = () => {
        setStage(Stages.VIEWING);
        navigate("/books");
    };

    const navigateToGames = () => {
        console.log("Going to games");
        setStage(Stages.VIEWING);
        navigate("/games");
    };

    return (
        <div className="container-fluid d-grid">
            <div className="container-fluid d-grid">
                <button className="btn btn-primary" onClick={navigateToBooks}>
                    Books
                </button>
            </div>
            <div className="container-fluid d-grid">
                <button className="btn btn-primary" onClick={navigateToGames}>
                    Video Games
                </button>
            </div>
            <div className="container-fluid d-grid">
                <button className="btn btn-primary">
                    Music/TV
                </button>
            </div>
            <div className="container-fluid d-grid">
                <button className="btn btn-primary">
                    Music
                </button>
            </div>
        </div>
    );
}
