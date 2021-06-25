const {Router} = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
 const {uploadFile} = require('../controllers/upload.cotrollers');

const router = Router();

router.use(validateJWT);

router.put('/', uploadFile);

module.exports = router;