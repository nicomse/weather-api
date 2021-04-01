const express = require('express'); 
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/location', weatherController.getLocation);
router.get('/current/:city?', weatherController.getSpecificCity);
router.get('/forecast/:city?', weatherController.getForecastCity);

module.exports = router;