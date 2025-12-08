import React from 'react';
import { FaPlus } from 'react-icons/fa';
import ProjectCard from '../components/Projects/ProjectCard';
import { projectsData } from '../data/mockData';
import './Projects.css';

const Projects = () => {
    return (
        <div className="projects-page">
            <div className="page-header">
                <h1>Projects</h1>
                <button className="btn-primary">
                    <FaPlus /> New Project
                </button>
            </div>

            <div className="projects-grid">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
