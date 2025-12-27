const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const projectRoleCheck = require("../middleware/projectRoleCheck");
const Task = require("../models/Task");
const Project = require("../models/Project");

//create a new task in a project (only project admin)
router.post('/create', auth, projectRoleCheck("admin"), async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, priority, dueDate } = req.body;
        //projectId doğrulaması middleware tarafından yapıldı
        const task = new Task({
            title,
            description,
            project: projectId,
            assignedTo,
            priority: priority || 'medium',
            dueDate
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get tasks assigned to current user
router.get('/my-tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id })
            .populate("project", "name")
            .populate("assignedTo", "username email");
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//get tasks for a project (only project members)
router.get('/by-project/:id', auth, projectRoleCheck(), async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.id }).populate("assignedTo", "username email");
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//update task
router.patch('/:id/update', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const project = await Project.findById(task.project);
        const member = project.members.find(m => m.user.toString() === req.user.id);
        if (!member) return res.status(403).json({ message: 'Not a project member' });

        // izin ver => güncelle
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start task (assigned user only)
router.patch('/:id/start', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Only assigned user can start
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only assigned user can start this task' });
        }

        if (task.status !== 'todo') {
            return res.status(400).json({ message: 'Task already started' });
        }

        task.status = 'in-progress';
        await task.save();
        await task.populate('assignedTo', 'username email');
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Complete task (assigned user only)
router.patch('/:id/complete', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Only assigned user can complete
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only assigned user can complete this task' });
        }

        if (task.status !== 'in-progress') {
            return res.status(400).json({ message: 'Task must be in progress to complete' });
        }

        task.status = 'completed';
        task.completedAt = new Date();
        await task.save();
        await task.populate('assignedTo', 'username email');
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve task (project admin only)
router.patch('/:id/approve', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const project = await Project.findById(task.project);
        const member = project.members.find(m => m.user.toString() === req.user.id);

        if (!member || member.role !== 'admin') {
            return res.status(403).json({ message: 'Only project admin can approve tasks' });
        }

        if (task.status !== 'completed') {
            return res.status(400).json({ message: 'Only completed tasks can be approved' });
        }

        task.status = 'approved';
        task.approvedAt = new Date();
        task.approvedBy = req.user.id;
        task.approvalNotes = req.body.notes || '';
        await task.save();
        await task.populate(['assignedTo', 'approvedBy'], 'username email');
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject task (project admin only)
router.patch('/:id/reject', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const project = await Project.findById(task.project);
        const member = project.members.find(m => m.user.toString() === req.user.id);

        if (!member || member.role !== 'admin') {
            return res.status(403).json({ message: 'Only project admin can reject tasks' });
        }

        if (task.status !== 'completed') {
            return res.status(400).json({ message: 'Only completed tasks can be rejected' });
        }

        task.status = 'rejected';
        task.rejectedAt = new Date();
        task.rejectedBy = req.user.id;
        task.approvalNotes = req.body.notes || '';
        // Reset to todo so user can work on it again
        task.status = 'todo';
        task.completedAt = null;
        await task.save();
        await task.populate(['assignedTo', 'rejectedBy'], 'username email');
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single task details
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'username email')
            .populate('approvedBy', 'username email')
            .populate('rejectedBy', 'username email');

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check if user is project member
        const project = await Project.findById(task.project);
        const member = project.members.find(m => m.user.toString() === req.user.id);
        if (!member) return res.status(403).json({ message: 'Not a project member' });

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;