if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.Main.init = function() {
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(37.552, 126.989)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }


  Template.Main.rendered = function() {
    // google.maps.event.addDomListener(window, 'load', function() {
    //   Template.Main.init();
    // });
    Template.Main.init();
  }
  

  Template.Main.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.Main.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}
