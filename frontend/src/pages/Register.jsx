import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Reuse Login styles

const Register = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>ProManage</h2>
                    <p>Create your account</p>
                </div>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="••••••••" />
                    </div>
                    <button className="btn-primary full-width">Sign Up</button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
