var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('main.ejs', { method: 'store.ejs' });
});

router.get('/cart', function(req, res, next) {

  res.render('main.ejs', { method: 'cart.ejs' });
});

router.get('/view', function(req, res, next) {

  res.render('main.ejs', { method: 'store.ejs' });
});

module.exports = router;