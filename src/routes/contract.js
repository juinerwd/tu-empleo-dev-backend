const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getContracts } = require('../controllers/contract.controllers');

router.get('/', getContracts);

module.exports = router;