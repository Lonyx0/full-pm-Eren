import React from 'react';
import TaskBoard from '../components/Tasks/TaskBoard';
import { tasksData } from '../data/mockData';
import './Tasks.css';

const Tasks = () => {
    return (
        <div className="tasks-page">
            <div className="page-header">
                <h1>Tasks</h1>
                <button className="btn-primary">New Task</button>
            </div>
            <TaskBoard tasks={tasksData} />
        </div>
    );
};

export default Tasks;
