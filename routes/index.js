var express = require('express');
var router = express.Router();
var uuid = require("uuid");

var Product = require('../db/models/product.js');
var Cart = require('../db/models/cart.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //khởi tạo user
  if(!req.session.User){
    req.session.User = uuid.v4();
  }
  console.log(req.session.User);
  //số lượng item trong cart
  Cart.find({uuid:req.session.User})
  .then(cart => {
    var cartQty = cart.length
    //list products
    Product.find({})
    .then(products => {
      res.render('main.ejs', { method: 'store.ejs', products:products, cartQty:cartQty });
    })
    .catch(err => {
        console.log('Error: ', err);
        throw err;
    })
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });

});

router.post('/update_item/', function(req, res, next) {
  console.log(req.body.productId);
  Product.findById(req.body.productId.replace("{{","").replace("}}",""))
  .then(products => {

    console.log(products);
    Cart.create({uuid:req.session.User,name:products.name, type:products.type, price:products.price, image:products.image})
    res.set({'Content-Type': 'application/json'});
    res.send({data:'Item was added'});
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});

router.get('/cart', function(req, res, next) {
  //số lượng item trong cart
  console.log(req.session.User);
  var cartQty = 0;
  Cart.find({uuid:req.session.User})
  .then(cart => {
    cartQty = cart.length;
    var cartTotal = 0
    cart.forEach((element) => {
      cartTotal += element['price'];
    });
    res.render('main.ejs', { method: 'cart.ejs', cartQty:cartQty, cart:cart, cartTotal:cartTotal });
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});

router.get('/view', function(req, res, next) {

  res.render('main.ejs', { method: 'store.ejs' });
});

module.exports = router;