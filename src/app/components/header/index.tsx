import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Header = () =>{

    return (
        <header className="header-wrapper">
            <Link to="/">
            <h1 className="header-title">Movies</h1>
            </Link>
        </header>
    );
}

export default  Header;