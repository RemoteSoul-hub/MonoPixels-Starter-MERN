const express = require('express');
const textScrappingController = require('../controllers/textScrappingController');

const router = express.Router();

router.post('/scrapper', textScrappingController.textRequest);

module.exports = router;
