const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { updateProfileUser, gerProfileUser } = require('../controllers/profile.controllers');

router.use(validateJWT);

router.get('/:id', gerProfileUser);
router.put('/:id', updateProfileUser);


module.exports = router;