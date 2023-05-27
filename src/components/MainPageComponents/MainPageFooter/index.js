import React from 'react';
import { Link } from 'react-router-dom';
import './MainPageFooter.css';

const MainPageFooter = () => {
    return (
        <footer className="footer">
            <Link to='/rules&terms' className="footerLink">Правила та умови</Link>
            <Link to='/security' className="footerLink">Безпека</Link>
        </footer>
    );
}

export default MainPageFooter;
