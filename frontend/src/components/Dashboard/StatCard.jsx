import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, trend, trendValue, color }) => {
    return (
        <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${color}20`, color: color }}>
                {icon}
            </div>
            <div className="stat-info">
                <h3 className="stat-title">{title}</h3>
                <div className="stat-value">{value}</div>
                {trend && (
                    <div className={`stat-trend ${trend}`}>
                        <span>{trend === 'up' ? '↑' : '↓'} {trendValue}</span>
                        <span className="stat-trend-label">vs last month</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
