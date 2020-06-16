const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    let token = req.headers['x-access-token'] || req.headers["authorization"];
    const checkBearer = 'Bearer ';
    
    if (token) {
        if (token.startsWith(checkBearer)) {
            token = token.slice(checkBearer.length, token.length);
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Неуспешна аутентикация'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.json({
            success: false,
            message: "No token provided"
        })
    }
}