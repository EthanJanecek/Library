import './App.css';
import { Header, Home } from './components';
import { useLocation } from 'react-router-dom'
import { Books } from './components/Books';
import { useSession } from './hooks/useSession';
import { Games } from './components/Games';

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
                    {path === '/books' && <Books />}
                    {path === '/games' && <Games />}
                    {path === '/' && <Home />}
                </div>
            }
        </div>
    );
}

export default App;
