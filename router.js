Router.configure({
  layoutTemplate: 'Layout'
});

Router.route('/', function () {
  this.render('Main', {
  	to: 'content',
  	data: function () {
  		return Reports.find({});
  	}
  });
});

// Router.route('/upload', function () {
//   this.render('Upload', {to: 'content'});
// });

// Router.route('/login', function () {
//   this.render('Login', {to: 'content'});
// })

// Router.route('/logout', function () {
//   Meteor.logout(function() {
//     Router.go('/');
//   });
// });

// Router.route('/signup', function () {
//   this.render('Signup', {to: 'content'});
// });

// Router.route('/products/:_id', function () {
//   this.render('ProductDetail', {
//     to: 'content',
//     data: function () {
//       return Products.findOne({_id: this.params._id}); // should it be inside Products.js?
//     }
//   });
// });

// Router.route('/cart', function () {
//   this.render('Cart', {to: 'content'});
// });

// Router.route('/checkout', function () {
//   this.render('Checkout', {to: 'content'});
// });

// Router.route('/pay', function () {
//   var req = this.request;
//   AppServer.Pay.makeCharge(req);
//   var res = this.response;
//   // res.end('hello from the server\n');
//   console.log("pay route");
  
// }, {where: 'server'});


