import React from 'react';
import './TaskCard.css';

const TaskCard = ({ title, priority, assignee }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'var(--danger-color)';
            case 'High': return '#F97316'; // Orange
            case 'Medium': return 'var(--accent-color)';
            case 'Low': return 'var(--secondary-color)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <span className="task-priority" style={{ color: getPriorityColor(priority), borderColor: getPriorityColor(priority) }}>
                    {priority}
                </span>
            </div>
            <h4 className="task-title">{title}</h4>
            <div className="task-footer">
                <div className="task-assignee" title={assignee}>
                    {assignee.charAt(0)}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
