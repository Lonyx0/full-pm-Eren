import React from 'react';
import { FaProjectDiagram, FaTasks, FaClipboardList, FaUsers } from 'react-icons/fa';
import StatCard from '../components/Dashboard/StatCard';
import ProgressChart from '../components/Dashboard/ProgressChart';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import { statsData, chartData, activitiesData } from '../data/mockData';
import './Dashboard.css';

const iconMap = {
    FaProjectDiagram: <FaProjectDiagram />,
    FaTasks: <FaTasks />,
    FaClipboardList: <FaClipboardList />,
    FaUsers: <FaUsers />,
};

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="date-filter">
                    <span>Last 30 Days</span>
                </div>
            </div>

            <div className="stats-grid">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        {...stat}
                        icon={iconMap[stat.icon]}
                    />
                ))}
            </div>

            <div className="dashboard-content">
                <div className="chart-section">
                    <ProgressChart data={chartData} />
                </div>
                <div className="activity-section">
                    <ActivityFeed activities={activitiesData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
