var express = require('express');
var router = express.Router();
var uuid = require("uuid");

var Product = require('../db/models/product.js');
var Cart = require('../db/models/cart.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var cartQty = 0;
  if(!req.session.User){
    req.session.User = uuid.v4();
  }
  Product.find({})
  .then(products => {
    res.render('main.ejs', { method: 'store.ejs', products:products });
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  })
});

router.post('/update_item', function(req, res, next) {
  Product.findById(req.body.productId)
  .then(products => {
    Cart.create({name:products.name, type:products.type, price:products.price, image:products.image})
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  })
});

router.get('/cart', function(req, res, next) {
  res.render('main.ejs', { method: 'cart.ejs' });
});

router.get('/view', function(req, res, next) {

  res.render('main.ejs', { method: 'store.ejs' });
});

module.exports = router;