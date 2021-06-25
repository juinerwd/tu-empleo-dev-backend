const { response } = require('express');
var  bcrypt = require ( 'bcryptjs' ); 
const userCtrl = {};

const User = require('../models/User');
const Profile = require('../models/DataUser');

const { generateJWT } = require('../helpers/jwt');

const gerProfileUser = async (req, res = response) => {

    const user = req.params.id;

    try {
        const profile = await Profile.findOne({user});

        res.status(200).json({
            ok: true,
            profile
        });
    } catch (error) {
        res.status(200).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        });
    }

}

const updateProfileUser = async (req, res = response) => {
    // TODO: Validar

    const profileId = req.params.id;
    const user = req.body.user;
    console.error(user);
    try {

        const profileDB = await Profile.findById(profileId);
        const existUser = await User.findById(user);
        const existprofile = await Profile.findOne({user});

        if(!profileDB && !existprofile && !!existUser) {
            
            const newProfileUser = new Profile(req.body);

            newProfileUser.user = req.uid;
            await newProfileUser.save();

            return res.status(200).json({
                ok: true,
                msg: 'Datos actualizados',
                update: newProfileUser
            });
        }

        // console.log();
        // Updates
        const updateProfileUser = {
            ...req.body
        };

        if (!!profileDB && profileDB.user.toString() === user && !!existUser) {
            const userUpdated = await Profile.findByIdAndUpdate(profileId, updateProfileUser, { new: true });

            return res.status(200).json({
                ok: true,
                msg: 'Datos actualizados',
                userUpdated
            });
        }else {
            return res.status(403).json({
                ok: false,
                msg: 'No estás autorizado para cambiar este perfil',
            });
        }

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        });
    }

}

// userCtrl.deleteUser = async (req, res) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.json('Usuario eliminado exitosamente')
// }

module.exports = {
    updateProfileUser,
    gerProfileUser
};