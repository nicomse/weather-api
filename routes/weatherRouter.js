const express = require('express'); 
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/location', weatherController.getLocation);
router.get('/current', weatherController.getSpecificCity);
router.get('/forecast/:city', (req, res) => {
    res.json('login', {
        title: req.params.city
    });
});

module.exports = router;