const express = require('express'); 
const router = express.Router();

router.get('/location', (req, res) => {
    res.render('login', {
        title: 'Express Login'
    });
});
router.get('/current/:city', (req, res) => {
    res.render('login', {
        title: req.params.city
    });
});
router.get('/forecast/:city', (req, res) => {
    res.render('login', {
        title: req.params.city
    });
});

module.exports = router;