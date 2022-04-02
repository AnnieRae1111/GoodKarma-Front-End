import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import Hamburger from './Hamburger';
import '../css/Header.css';


const Header = () => {
const[showMenu, setShowMenu]=useState(false)

return (
    <div className="header-container">
    <p className="good-karma-logo">GoodKarma</p>
    <Link className="signup-link" to="/signup">
        Sign Up
    </Link>
    <Link className="signin-link" to="/signin">
        Sign In
    </Link>
    <Link className="good-karma-link" to="/">
        Home
    </Link>
    <Link className="feature-link" to="/donate">
        Donate
    </Link>
    <Link className="feature-link" to="/about">
        About
    </Link>

    <NavItem className="hambgurger">
        <NavLink onClick={() => setShowMenu(!showMenu)}>
            <Hamburger />
        </NavLink>
        </NavItem>
        <div className="hamburger-menu">
        {showMenu && (
        <div className="hamburger-links">
        <Link className="ham-link" to="/signup">
            Sign Up
        </Link>
        <Link className="ham-link" to="/signin">
            Sign In
        </Link>
        <Link className="ham-link" to="/">
            Home
        </Link>
        <Link className="ham-link" to="/donate">
            Donate
        </Link>
        <Link className="ham-link"to="/about">
            About
        </Link>
        </div>
    )}
    </div>

    </div>
);
};

export default Header;
