const { Router } = require('express');
const { check } = require('express-validator');
const { login, createUser, revalidateToken } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe contener maás de 8 caracteres').isLength({ min: 8 }),
    validateFields
], login);

router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe contener maás de 8 caracteres').isLength({ min: 8 }),
    check('country', 'El pais es obligatorio').not().isEmpty(),
    check('policy', 'Debes aceptar los terminos y condiciones').not().isEmpty(),
    validateFields,
], createUser);

router.get('/renew', validateJWT, revalidateToken);




module.exports = router;