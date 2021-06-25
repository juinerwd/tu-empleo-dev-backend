const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getUsers, updateUser, updatePassword } = require('../controllers/users.controllers');

router.get('/', validateJWT, getUsers);

router.put('/:id', validateJWT, updateUser);

router.put('/password/:id', validateJWT, updatePassword);

// router.delete('/:id', deleteUser);

module.exports = router;

/**[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('country', 'El pais es obligatorio').not().isEmpty(),
    check('policy', 'Debes aceptar los terminos y condiciones').not().isEmpty(),
    validateFields
], */