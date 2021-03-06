const {Router} = require('express');
const { check } = require('express-validator');


const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getVacancies, createVacancy, applyVacancy, getCandidates, getVacancy, updateVacancy, deleteVacancy } = require('../controllers/vacancy.controllers');

// Obtener vacantes
router.get('/', getVacancies);

// Obtener una vacante
router.get('/:id', getVacancy);


router.use(validateJWT);

router.post('/apply', applyVacancy);
router.get('/candidates/:id', getCandidates);

// Crear vacantes
router.post('/', [
    check('title', 'El nombre de la vacante es obligatorio').not().isEmpty(),
    check('description', 'La descripcción de la vacante es obligatoria').not().isEmpty(),
    check('v_company', 'El nombre de la empresa es obligatorio').not().isEmpty(),
    check('experience', 'Los años de experiencias es obligatorio').not().isEmpty(),
    check('salary', 'El Salario es obligatorio').not().isEmpty(),
    check('location', 'La ubicación es obligatoria').not().isEmpty(),
    check('technologies', 'Las tecnologias son requeridas').not().isEmpty(),
    check('startDate', 'La fecha de inicio es obligatoria').custom(isDate),
    check('finishDate', 'La fecha de finalización es obligatoria').custom(isDate),
    validateFields
], createVacancy);

// Actualizar vacante
router.put('/:id', [
    check('title', 'El nombre de la vacante es obligatorio').not().isEmpty(),
    check('description', 'La descripcción de la vacante es obligatoria').not().isEmpty(),
    check('company', 'El nombre de la empresa es obligatorio').not().isEmpty(),
    check('experience', 'Los años de experiencias es obligatorio').not().isEmpty(),
    check('salary', 'El Salario es obligatorio').not().isEmpty(),
    check('location', 'La ubicación es obligatorio').not().isEmpty(),
    check('startDate', 'La fecha de inicio es obligatoria').custom(isDate),
    check('finishDate', 'La fecha de finalización es obligatoria').custom(isDate),
    validateFields
], updateVacancy);

// Eliminar vacante
router.delete('/:id', deleteVacancy);

module.exports = router;