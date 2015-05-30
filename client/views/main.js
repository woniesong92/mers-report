if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.Main.init = function() {
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  Template.Main.rendered = function() {
    var that = this;
    $.getScript('/google-map.js', function(data, status, xhr) {
    });

    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDkBAwtcakw7RALSkCSQbESeOu3cpF9r5Y';
    // document.body.appendChild(script);


    // $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDkBAwtcakw7RALSkCSQbESeOu3cpF9r5Y", function(data, status, jqxhr) {
      // var mapOptions = {
      //   zoom: 8,
      //   center: new google.maps.LatLng(-34.397, 150.644)
      // };
      // map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    // });


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
