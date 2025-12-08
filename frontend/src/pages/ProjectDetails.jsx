import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUsers, FaTasks } from 'react-icons/fa';
import { projectsData, tasksData } from '../data/mockData';
import TaskBoard from '../components/Tasks/TaskBoard';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === parseInt(id));

    if (!project) {
        return <div>Project not found</div>;
    }

    // Mock tasks for this project
    const projectTasks = tasksData; // In real app, filter by project ID

    return (
        <div className="project-details-page">
            <div className="details-header">
                <Link to="/projects" className="back-link"><FaArrowLeft /> Back to Projects</Link>
                <div className="project-title-section">
                    <h1>{project.title}</h1>
                    <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
                </div>
                <p className="project-description">{project.description}</p>

                <div className="project-meta">
                    <div className="meta-item">
                        <FaCalendarAlt />
                        <span>Due: {project.dueDate}</span>
                    </div>
                    <div className="meta-item">
                        <FaUsers />
                        <span>{project.members.length} Members</span>
                    </div>
                    <div className="meta-item">
                        <FaTasks />
                        <span>{projectTasks.length} Tasks</span>
                    </div>
                </div>
            </div>

            <div className="details-content">
                <h2>Project Tasks</h2>
                <TaskBoard tasks={projectTasks} />
            </div>
        </div>
    );
};

export default ProjectDetails;
