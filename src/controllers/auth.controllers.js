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
                message: 'Correo electrónico o contraseña incorrecta'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Correo electrónico o contraseña incorrecta'
            });
        }

        // Generar un TOKEN ---- JWT
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            uid: userDB.id,
            name: userDB.name,
            lastname: userDB.lastname,
            email: userDB.email,
            phone_number: userDB.phone_number,
            company: userDB.company,
            country: userDB.country,
            profile_photo: userDB.profile_photo,
            role: userDB.role,
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
                message: 'EL email ya existe'
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
            name: newUser.name,
            lastname: newUser.lastname,
            email: newUser.email,
            company: newUser.company,
            country: newUser.country,
            profile_photo: newUser.profile_photo,
            role: newUser.role,
            token: token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Hubo un error inesperado'
        });
        console.log(error);
    }
}

const revalidateToken = async (req, res = response) => {

    const {uid} = req;
    const userDB = await User.findById(uid);
    // console.log(req);
    // Generar un nuevo TOKEN ---- JWT
    const token = await generateJWT(uid);
    res.json({
        ok: true,
        uid,
        name: userDB.name,
        lastname: userDB.lastname,
        email: userDB.email,
        phone_number: userDB.phone_number,
        company: userDB.company,
        country: userDB.country,
        profile_photo: userDB.profile_photo,
        role: userDB.role,
        token
    });
}

module.exports = {
    login,
    createUser,
    revalidateToken
}