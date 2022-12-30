import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header, Home } from './components';
import { useLocation } from 'react-router-dom'
import { Books } from './components/Books';
import { useSession } from './hooks/useSession';

function App() {
    const location = useLocation();
    const path = location.pathname;

    const [state] = useSession();
    const {signedIn} = state;

    return (
        <div className="App container-fluid">
            <Header />
            {signedIn &&
                <div>
                    {path == '/' && <Home />}
                    {path == '/books' && <Books />}
                </div>
            }
        </div>
    );
}

export default App;
