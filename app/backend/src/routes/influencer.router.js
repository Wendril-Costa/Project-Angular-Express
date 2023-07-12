const express = require('express');
const { influencerController } = require('../controllers/influencerController');
const { validateCreate, checkEmailAndName } = require('../middlewares/influencerMiddleware');

const router = express.Router();

router.post('/', validateCreate, checkEmailAndName, influencerController.create);

module.exports = router