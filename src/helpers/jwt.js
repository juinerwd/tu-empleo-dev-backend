const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                reject('Error inesperado JWT');
            }else {
                resolve(token);
            }
        });
    });

}

module.exports = {
    generateJWT
}