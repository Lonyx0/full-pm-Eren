import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-search">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search projects, tasks..." />
            </div>
            <div className="header-actions">
                <button className="icon-btn">
                    <FaBell />
                    <span className="badge">3</span>
                </button>
                <div className="user-profile">
                    <span className="user-name">John Doe</span>
                    <FaUserCircle className="user-avatar" />
                </div>
            </div>
        </header>
    );
};

export default Header;
