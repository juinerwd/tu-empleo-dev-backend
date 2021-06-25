const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getCountries, getCountry } = require('../controllers/country.controllers');

router.get('/', getCountries);
router.get('/:id', getCountry);

module.exports = router;