const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controllers');

router.get('/', validateJWT, getUsers);

router.put('/:id',[
    validateJWT,
    check('fullName', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('country', 'El pais es obligatorio').not().isEmpty(),
    check('policy', 'Debes aceptar los terminos y condiciones').not().isEmpty(),
    validateFields
], updateUser);

router.route('/:id')
    .get((req, res) => res.json({
        message: 'Get User unique'
    }))
    .delete(deleteUser)

module.exports = router;