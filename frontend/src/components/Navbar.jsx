import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">WhisperBox</Link>
            <div className="nav-links">
                <Link to="/submit" className="nav-link">Send Feedback</Link>
                {user ? (
                    <>
                        {user.role === 'ADMIN' ? (
                            <Link to="/admin" className="nav-link">Admin Dashboard</Link>
                        ) : (
                            <Link to="/dashboard" className="nav-link">My Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
