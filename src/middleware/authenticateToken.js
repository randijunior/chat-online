const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()


module.exports = function authenticateToken(req, res, next) {
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1]
    if(token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET,function(err, decoded) {
        if(err) res.sendStatus(403);
        req.user = decoded;
        next();
    })
  }