const express = require('express');
const { influencerController } = require('../controllers/influencerController');
const { validateCreate, checkEmailAndName } = require('../middlewares/influencerCreate');
const influencerFindAll = require('../middlewares/influencerFindAll');

const router = express.Router();

router.post('/', validateCreate, checkEmailAndName, influencerController.create);
router.get('/',  influencerFindAll, influencerController.findAll);

module.exports = router