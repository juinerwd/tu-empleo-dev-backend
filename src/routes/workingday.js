const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getWorkingdays } = require('../controllers/workingday.controllers');

router.get('/', getWorkingdays);

module.exports = router;