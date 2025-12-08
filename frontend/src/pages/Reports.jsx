import React from 'react';
import { FaDownload } from 'react-icons/fa';
import ProgressChart from '../components/Dashboard/ProgressChart';
import { chartData } from '../data/mockData';
import './Reports.css';

const Reports = () => {
    return (
        <div className="reports-page">
            <div className="page-header">
                <h1>Reports</h1>
                <button className="btn-secondary">
                    <FaDownload /> Export PDF
                </button>
            </div>

            <div className="reports-grid">
                <div className="report-card">
                    <h3>Project Completion Rate</h3>
                    <div className="report-chart">
                        <ProgressChart data={chartData} />
                    </div>
                </div>

                <div className="report-card">
                    <h3>Task Distribution</h3>
                    <div className="report-summary">
                        <div className="summary-item">
                            <span className="summary-label">Total Tasks</span>
                            <span className="summary-value">45</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Completed</span>
                            <span className="summary-value">28</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Overdue</span>
                            <span className="summary-value">3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
