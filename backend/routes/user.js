const express = require('express');
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../middleware');
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcrypt');

const router = express.Router();

// A quick test route to verify it's wired up correctly
router.get('/', (req, res) => {
    res.send('User route is working!');
});

// Define Zod schema for Signup validation
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

// Define Zod schema for updating details (all fields are optional)
const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
    // 1. Validate input using Zod
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    // 3.0. Hashing...
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Create the user in the database
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;

    // --- Optional but usually required for this assignment ---
    // Give the user a random initial balance between 1 and 10000 (represented in integers)
    await Account.create({
        userId,
        balance: 1 + Math.floor(Math.random() * 10000) 
    });
    // ---------------------------------------------------------

    // 4. Generate JWT
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

router.post("/signin", async (req, res) => {
    // 1. Validate input using Zod
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    // 2. Check if user already exists
    const user = await User.findOne({ username: req.body.username
     });
    
    if (!user) {
        return res.status(411).json({
            message: 'User not found'
        });    
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if(isPasswordValid){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            token: token
        });
    }

    res.status(411).json({ 
        message: "Error while logging in"
    });
});



router.put("/", authMiddleware, async (req, res) => {
    // Validate input
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    try {
        // req.userId comes from your authMiddleware!
        await User.updateOne({ _id: req.userId }, req.body);
        
        res.json({
            message: "Updated successfully"
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/bulk', async(req, res) => {
    // Get the filter query parameter, default to an empty string if not provided
    const filter = req.query.filter || "";

    // Search the database
    // $or means: match if firstName matches the regex OR lastName matches the regex
    // $options: "i" makes the search case-insensitive
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    // Map over the results to return only the necessary data (never return passwords!)
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

// Export the router
module.exports = router;