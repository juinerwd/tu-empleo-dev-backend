const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getCurrencies } = require('../controllers/currency.controllers');

router.get('/', getCurrencies);

module.exports = router;