import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ id, title, description, status, progress, dueDate, members, priority }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'var(--primary-color)';
            case 'Completed': return 'var(--secondary-color)';
            case 'Planning': return 'var(--accent-color)';
            default: return 'var(--text-secondary)';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'var(--danger-color)';
            case 'Medium': return 'var(--accent-color)';
            case 'Low': return 'var(--secondary-color)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <Link to={`/projects/${id}`} className="project-card" style={{ textDecoration: 'none' }}>
            <div className="project-header">
                <span className="project-priority" style={{ color: getPriorityColor(priority), borderColor: getPriorityColor(priority) }}>
                    {priority}
                </span>
                <span className="project-status" style={{ backgroundColor: `${getStatusColor(status)}20`, color: getStatusColor(status) }}>
                    {status}
                </span>
            </div>
            <h3 className="project-title">{title}</h3>
            <p className="project-desc">{description}</p>

            <div className="project-progress">
                <div className="progress-info">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: getStatusColor(status) }}></div>
                </div>
            </div>

            <div className="project-footer">
                <div className="project-members">
                    {members.slice(0, 3).map((member, index) => (
                        <div key={index} className="member-avatar" title={member}>
                            {member.charAt(0)}
                        </div>
                    ))}
                    {members.length > 3 && (
                        <div className="member-more">+{members.length - 3}</div>
                    )}
                </div>
                <div className="project-date">
                    <FaCalendarAlt />
                    <span>{dueDate}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
