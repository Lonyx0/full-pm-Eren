import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info">
                    <div className="profile-avatar">JD</div>
                    <div className="profile-details">
                        <h1>John Doe</h1>
                        <p>Senior Developer</p>
                    </div>
                    <button className="btn-secondary">Edit Profile</button>
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h3>Personal Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            <p>John Doe</p>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <p>john.doe@example.com</p>
                        </div>
                        <div className="info-item">
                            <label>Phone</label>
                            <p>+1 234 567 890</p>
                        </div>
                        <div className="info-item">
                            <label>Location</label>
                            <p>New York, USA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
