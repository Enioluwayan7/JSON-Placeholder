import React from "react";
import { BookOpen } from 'lucide-react';
import '../css/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <BookOpen className="header-icon" size={40} color="#4A90E2" />
                <h1 className="header-title">JSON PlaceHolder Project (Olabanji Enioluwayan)</h1>
            </div>
            <p className="header-description">A react Application for exploring posts and User from JSON placeholder API</p>
        </header>
    );
}

export default Header;