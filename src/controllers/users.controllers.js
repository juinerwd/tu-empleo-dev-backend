const { response } = require('express');
var  bcrypt = require ( 'bcryptjs' ); 
const userCtrl = {};

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find(); // {}, 'fullName email country'
    res.json({
        users,
        
    }); // uid: req.uid
}

userCtrl.updateUser = async (req, res = response) => {
    // TODO: Validar

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'The user not exist'
            });
        }

        // Updates
        const {password, policy, email, ...fields} = req.body;

        if (userDB.email !== email) {
            const existEmail = await User.findOne({ email });
            // Validando si el email exist
            if(existEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'The email already exist'
                });
            }
        }
        fields.email = email;
        const userUpdated = await User.findOneAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            UserUpdated: userUpdated
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Hubo un error inesperado'
        });
    }

}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('User Deleted')
}

module.exports = userCtrl;