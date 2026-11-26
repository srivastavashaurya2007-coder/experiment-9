
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Authentication routes
app.use('/auth', require('./routes/auth'));

// Protected route
const authMiddleware = require('./middleware/authMiddleware');

app.get('/profile', authMiddleware, async (req, res) => {
    res.json({
        message: "Welcome! You are authenticated.",
        userId: req.user.id
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
