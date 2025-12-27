const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Optional for Google OAuth users
    googleId: { type: String, unique: true, sparse: true }, // Google OAuth ID
    displayName: { type: String }, // Full name from Google
    profilePicture: { type: String }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', UserSchema);

