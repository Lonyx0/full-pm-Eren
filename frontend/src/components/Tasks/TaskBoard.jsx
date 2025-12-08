import React from 'react';
import TaskCard from './TaskCard';
import './TaskBoard.css';

const TaskBoard = ({ tasks }) => {
    const columns = ['To Do', 'In Progress', 'Done'];

    return (
        <div className="task-board">
            {columns.map(column => (
                <div key={column} className="task-column">
                    <div className="column-header">
                        <h3>{column}</h3>
                        <span className="task-count">{tasks.filter(t => t.status === column).length}</span>
                    </div>
                    <div className="column-content">
                        {tasks.filter(t => t.status === column).map(task => (
                            <TaskCard key={task.id} {...task} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskBoard;
