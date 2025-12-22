const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { 
        type: String, 
        enum: ['todo', 'in-progress', 'completed', 'approved', 'rejected'], 
        default: 'todo' 
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: Date,
    completedAt: Date,
    approvedAt: Date,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rejectedAt: Date,
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvalNotes: String,
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);