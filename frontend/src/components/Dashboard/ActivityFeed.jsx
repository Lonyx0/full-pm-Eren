import React from 'react';
import './ActivityFeed.css';

const ActivityFeed = ({ activities }) => {
    return (
        <div className="activity-feed">
            <div className="feed-header">
                <h3>Recent Activity</h3>
                <button className="view-all-btn">View All</button>
            </div>
            <div className="feed-list">
                {activities.map((activity) => (
                    <div key={activity.id} className="feed-item">
                        <div className="feed-avatar">
                            {activity.user.charAt(0)}
                        </div>
                        <div className="feed-content">
                            <p>
                                <span className="feed-user">{activity.user}</span> {activity.action} <span className="feed-target">{activity.target}</span>
                            </p>
                            <span className="feed-time">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;
