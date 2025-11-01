const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be at most 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    mobile: {
        type: String,
        trim: true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    dob: {
        type: Date,
        trim: true,
        required: [true, "Date of birth is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        lowercase: true,
        trim: true,
        enum: {
            values: ["student", "creator", "admin"],
            message: "Role must be either 'student', 'creator', or 'admin']"
        },
        default: "student"
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Password must be at least 6 characters"]
    },
    confirmPassword: {
        type: String,
        trim: true,
        minlength: [6, "Confirm Password must be at least 6 characters"]
    },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// method for compare password during login
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// method for compare generate during registration & login
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
};


const User = mongoose.model("User", userSchema);
module.exports = User;
