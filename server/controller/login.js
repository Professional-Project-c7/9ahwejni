// authController.js
const db = require('../Database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
    try {
        const { UserType, Email, Password, FirstName, LastName,Address,ImageUrl} = req.body;
        if (!Password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await db.User.create({

                UserType,
                ImageUrl:"https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg?w=826",
                Email,
                Password: hashedPassword,
                Address,
                FirstName,
                LastName,
                // ImageUrl
               
            
        });
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};


exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await db.User.findOne({ where: { Email:Email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!Password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.UserType,FirstName:user.FirstName  }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token, userId: user.UserType,IdUser:user.id,name: user.FirstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};