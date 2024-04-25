const db = require('../Database/index'); // Assuming db exports the Sequelize connection and User model

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        const { FirstName, LastName, Email, password, UserTypes } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const user = await db.User.create({ FirstName, LastName, Email, password: hashedPassword, UserTypes });
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }
        
    },
    login: async (req, res) => {
        try {
            const { Email, password } = req.body;
            const user = await db.User.findOne({ where: { Email } });
    
            if (!user) {
                return res.status(401).json({ error: 'Invalid user' });
            }
    
            const correctPass = await bcrypt.compare(password, user.password);
            if (!correctPass) {
                return res.status(401).json({ error: 'Wrong password' });
            }
    
            const token = jwt.sign({ id: user.id }, "mlop09", { expiresIn: "1h" });
            res.status(200).json({ token, FirstName: user.FirstName, LastName: user.LastName });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
}