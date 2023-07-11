const express = require('express');
const { influencerController } = require('../controllers/influencerController');

const router = express.Router();

router.post('/', influencerController.create);

module.exports = router