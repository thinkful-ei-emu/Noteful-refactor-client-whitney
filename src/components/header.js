import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css'

function Header () {


    return (
        <div className="header-container">
            <Link to='/' style={{ textDecoration: 'none' }}>
            <h1>Noteful</h1>
            </Link>
        </div>
    )
}

export default Header;