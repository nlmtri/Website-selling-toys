var express = require('express');
var router = express.Router();
var uuid = require("uuid");

var Product = require('../db/models/product.js');
var Cart = require('../db/models/cart.js');
var User = require('../db/models/user.js');
var Order = require('../db/models/order.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //check logged
  if(req.session.User){
    logged = true;
    user = req.session.User;
  } else {
    logged = false;
    user = false;
  }
  //khởi tạo user
  if(!req.session.User){ //chưa login
    Product.find({})
    .then(products => {
      return res.render('main.ejs', { method: 'store.ejs', products:products, cartQty:0, logged:logged, user:user });
    })
    .catch(err => {
        console.log('Error: ', err);
        throw err;
    });
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

//add item to cart
router.post('/update_item/', function(req, res, next) {
  Product.findById(req.body.productId.replace("{{","").replace("}}",""))
  .then(products => {

    Cart.create({uuid:req.session.User,name:products.name, type:products.type, price:products.price, image:products.image})
    res.set({'Content-Type': 'application/json'});
    res.send({data:'Item was added'});
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});

//login
router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username, password: req.body.password})
  .then(user => {
    //login thành công
    req.session.User = user.id;
    return res.status(200).json({status: 200, message: "Login successfully"})
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});

router.post('/signup', function(req, res, next) {
  User.findOne({username: req.body.username})
  .then(user => {
    if(user){
      return res.status(400).json({status: 400, message: "This username has already been used"})
    } else{
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      newUser.save();
      return res.status(200).json({status: 200, message: "Register successfully"})
    }
    //login thành công
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});

router.get('/cart', function(req, res, next) {
  //check logged
  if(req.session.User){
    logged = true;
    user = req.session.User;
  } else {
    logged = false;
    user = false;
  }
  //số lượng item trong cart
  var cartQty = 0;
  Cart.find({uuid:req.session.User})
  .then(cart => {
    cartQty = cart.length;
    var cartTotal = 0
    cart.forEach((element) => {
      cartTotal += element['price'];
    });
    res.render('main.ejs', { method: 'cart.ejs', cartQty:cartQty, cart:cart, cartTotal:cartTotal, logged:logged, user:user });
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});

router.get('/view', function(req, res, next) {

  res.render('main.ejs', { method: 'store.ejs' });
});








//ADMIN
router.get('/admin', function(req, res, next) {
  Order.find({})
  .then(order => {
    res.render('./admin/admin.ejs', { method: 'order.ejs', order:order});
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});
router.get('/admin/order', function(req, res, next) {
  Order.find({})
  .then(order => {
    res.render('./admin/admin.ejs', { method: 'order.ejs', order:order});
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });
});
router.get('/admin/product', function(req, res, next) {
  
  Product.find({})
  .then(product => {
    res.render('./admin/admin.ejs', { method: 'product.ejs', product:product});
  })
  .catch(err => {
      console.log('Error: ', err);
      throw err;
  });});
module.exports = router;