const { response } = require('express');
var  bcrypt = require ( 'bcryptjs' );

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

         // Validando si el email exist
        const userDB = await User.findOne({ email });
        if(!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'Correo electrónico o la contraseña incorrecta'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Correo electrónico o la contraseña incorrecta'
            });
        }

        // Generar un TOKEN ---- JWT
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            uid: userDB.id,
            name: userDB.fullName,
            message: 'Bienvenido usuario',
            token: token
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }

}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const existEmail = await User.findOne({ email });

        // Validando si el email exist
        if(existEmail) {
            return res.status(400).json({
                ok: false,
                message: 'The email already exist'
            });
        }

        const newUser = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        // Guardar usario en la base de datos
        await newUser.save();

        // Generar un TOKEN ---- JWT
        const token = await generateJWT(newUser.id);

        res.json({
            ok: true,
            uid: newUser.id,
            name: newUser.fullName,
            token: token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Hubo un error inesperado'
        });

    }
}

const revalidateToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar un nuevo TOKEN ---- JWT
    const token = await generateJWT(uid);
    res.json({
        ok: false,
        token
    });
}

module.exports = {
    login,
    createUser,
    revalidateToken
}