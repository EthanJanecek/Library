import React from 'react';
import './Header.css';

export function Header(props: any) {
    return (
        <div className="container-fluid header">
            <h1 className="text-left">Library</h1>
            <button className="btn login justify-content-end">
                Log In
            </button>
        </div>
    );
}
