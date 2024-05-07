
const jwt = require('jsonwebtoken');
const db=require('../../Database/index')

const verifyToken= async (req, res, next)=>{
const token = req.header('Authorization').split(' ')[1];
if (!token) return res.status(401).json({ error: 'Access denied1' });
try {
 const decoded = jwt.verify(token,'your-secret-key');
 const user = await db.User.findOne({ where: { id:decoded.userId,'autoTokens':token } })
if(!user)throw new Error()
req.autoToken=token;
req.user = user;
 next()
 } catch (error) {
 res.status(401).send(error);
 }
 };
module.exports = verifyToken;