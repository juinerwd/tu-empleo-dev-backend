const { response } = require('express');
var jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {

    // Leer token
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: true,
            message: 'No hay token en la petición'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(uid);
        req.uid = uid;
        
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: true,
            message: 'Token no valido'
        });
    }
    
}

module.exports = {
    validateJWT
}