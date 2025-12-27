const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Get current user info - MUST BE BEFORE other routes
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if (exists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await user.matchPassword(password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update User Profile
router.patch('/update', auth, async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username) {
            const exists = await User.findOne({ username, _id: { $ne: user._id } });
            if (exists) return res.status(400).json({ message: 'Username already taken' });
            user.username = username;
        }

        if (email) {
            const exists = await User.findOne({ email, _id: { $ne: user._id } });
            if (exists) return res.status(400).json({ message: 'Email already taken' });
            user.email = email;
        }

        if (profilePicture !== undefined) user.profilePicture = profilePicture;

        if (password) {
            user.password = password; // Will be hashed by pre-save hook
        }

        await user.save();

        // Return updated user info (excluding password)
        const updatedUser = await User.findById(user._id).select('-password');
        res.json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;