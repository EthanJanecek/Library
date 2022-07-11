import React from 'react';

export function Home(props: any) {
    return (
        <div className="container-fluid d-grid">
            <div className="container-fluid d-grid">
                <button className="btn btn-primary">
                    Books
                </button>
            </div>
            <div className="container-fluid d-grid">
                <button className="btn btn-primary">
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
