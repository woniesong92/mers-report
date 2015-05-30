// Code to run when the app first starts

if (Meteor.isServer) {
  Meteor.startup(function () {
    // blank
  });
}

if (Meteor.isClient) {
  Meteor.startup(function () {

    // // after a refresh, Session object is cleared because it's not persistent.
    // try {
    //   var bag = JSON.parse(localStorage.getItem("shoppingBag"));
    // } catch (e) {
    //   var bag = {};
    // }
    // bag = bag || {};
    // Session.set("shoppingBag", bag);

    // // Stripe
    // Stripe.setPublishableKey('pk_test_8mXtjutkbZVxuyJnjxdiTWXF');
  });
}