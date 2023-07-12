const express = require('express');
const { influencerController } = require('../controllers/influencerController');
const { validateBody, checkEmailAndName } = require('../middlewares/influencerCreate');
const {  validateId } = require('../middlewares/influencerId');
const influencerFindAll = require('../middlewares/influencerFindAll');

const router = express.Router();

router.post('/', validateBody, checkEmailAndName, influencerController.create);
router.get('/',  influencerFindAll, influencerController.findAll);
router.put('/:id', validateBody, validateId, checkEmailAndName, influencerController.update);
router.delete('/:id', validateId, influencerController.delete);

module.exports = router