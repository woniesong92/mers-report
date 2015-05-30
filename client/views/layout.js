if (Meteor.isClient) {  
  
  Template.Layout.rendered = function () {
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