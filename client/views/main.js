if (Meteor.isClient) {
  // Session.setDefault('counter', 0);

  // Handles the event where the user searches an address
  function geocodeHandler() {
    var address = $('.report-addr-input').val();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(15);

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });

        var html = "<div class='info-container'>" +
                   "<form class='info-form'>" +
                   "<div class='info-form-label'>신고 내용</div>" +
                   "<textarea class='form-control' rows='5'></textarea>" +
                   "<button class='btn btn-primary btn-block mers-info-btn'>등록</button>" +
                   "</form>" +
                   "</div>";

        var infowindow = new google.maps.InfoWindow({
          content: html
        });
        infowindow.open(map, marker);

        $('.info-form').submit(function() {
          debugger
        })


      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  Template.Main.init = function() {
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(37.552, 126.989)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    geocoder = new google.maps.Geocoder();
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
    },
    'click .report-addr-btn': function() {
      geocodeHandler();
    },
    'keypress .report-addr-input': function(e) {
      if (e.keyCode === 13) {
        geocodeHandler();
        return;
      }
    }
  });
}
