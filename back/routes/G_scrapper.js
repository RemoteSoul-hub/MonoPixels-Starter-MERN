const express = require('express');
const textScrappingController = require('../controllers/textScrappingController');

const router = express.Router();

router.post('/scrapperRoute', textScrappingController.textRequest);

module.exports = router;
