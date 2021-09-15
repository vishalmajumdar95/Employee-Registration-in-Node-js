const jwt = require("jsonwebtoken")
require('dotenv').config()

// GenerateToken
function generateAccessToken(username) {
    return jwt.sign(username, process.env.SECRET_TOKEN, { expiresIn: '24h' });
}

// AuthenticateToken
function authenticateToken(req, res, next) {
    try {
        var authHeader = req.headers.cookie;
        // console.log(authHeader)
        var token = authHeader.split('=')[1];
        // console.log(token)
        if (token === undefined) {
            console.log({ 'errer': 'token not found!' })
            res.status(403).json({ message: 'JWT EXPIRED' })
        }
        jwt.verify(token, process.env.SECRET_TOKEN, { expiresIn: '24h' }, (err, data) => {
            if (err) return res.sendStatus(403)
            req.data = data
                // console.log(data)
            next();
        })
    } catch (err) {
        console.log({ message: err.message })
        res.send({ message: err.message })
    }

};

module.exports = { generateAccessToken, authenticateToken };