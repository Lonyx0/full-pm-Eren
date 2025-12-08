import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaCalendarAlt, FaUser, FaCog, FaChartBar } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { path: '/', name: 'Dashboard', icon: <FaHome /> },
        { path: '/projects', name: 'Projects', icon: <FaProjectDiagram /> },
        { path: '/tasks', name: 'Tasks', icon: <FaTasks /> },
        { path: '/calendar', name: 'Calendar', icon: <FaCalendarAlt /> },
        { path: '/reports', name: 'Reports', icon: <FaChartBar /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>ProManage</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                <span className="icon">{item.icon}</span>
                                <span className="label">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <NavLink to="/profile" className="nav-link">
                    <span className="icon"><FaUser /></span>
                    <span className="label">Profile</span>
                </NavLink>
                <NavLink to="/settings" className="nav-link">
                    <span className="icon"><FaCog /></span>
                    <span className="label">Settings</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
