if (Meteor.isClient) {  

  // Template.Layout.events({
  //   'click .user-name-link': function (ev, tem) {
  //     $('.user-nav-menu').toggle();
  //   },
  // });

  Template.Layout.rendered = function () {
    // $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDkBAwtcakw7RALSkCSQbESeOu3cpF9r5Y", function() {
    //   alert("success!");
    // });
  }

  Template.Layout.helpers({
    
    // numBaggedItems: function () {
    //   var bag = Session.get("shoppingBag") || {};
    //   var count = 0;
    //   for (var p_id in bag) {
    //     count = count + bag[p_id];
    //   }
    //   return count;
    // }

  });

  // Client side configurations

}