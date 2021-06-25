const { response } = require('express');
var  bcrypt = require ( 'bcryptjs' ); 
const userCtrl = {};

const User = require('../models/User');
const Profile = require('../models/DataUser');

const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    const users = await User.find(); // {}, 'fullName email country'
    res.json({
        users
    }); // uid: req.uid
}

const updateUser = async (req, res = response) => {
    // TODO: Validar

    const userid = req.params.id;
    try {

        const userDB = await User.findById(userid);

        if(!userDB && userid !== userDB.uid) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Updates
        const updateUser = {
            ...req.body
        };

        const userUpdated = await User.findByIdAndUpdate(userid, updateUser, { new: true });

        res.json({
            ok: true,
            msg: 'Datos actualizados',
            userUpdated
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        });
    }

}

const updatePassword = async (req, res = response) => {

    const userid = req.params.id;
    let { currentPassword, password } = req.body;

    try {
        const userDB = await User.findById(userid);
        if(!userDB && userid !== userDB.uid) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        const validPassword = bcrypt.compareSync( currentPassword, userDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);

        const updateUser = {
            password
        };

        await User.findByIdAndUpdate(userid, updateUser, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada',
        });
        
    } catch (error) {
        res.status(400).json({
            ok: true,
            msg: 'Ha habido un error',
        });
        console.log(error);
    }

}

// userCtrl.deleteUser = async (req, res) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.json('Usuario eliminado exitosamente')
// }

module.exports = {
    getUsers,
    updateUser,
    updatePassword
};