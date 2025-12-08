const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
}));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: process.env.FRONTEND_URL || 'http://localhost:5173/login',
        session: false 
    }),
    (req, res) => {
        try {
            // Generate JWT token
            const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            
            // Redirect to frontend with token
            const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
            res.redirect(`${frontendURL}/auth/callback?token=${token}`);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=auth_failed`);
        }
    }
);

module.exports = router;
