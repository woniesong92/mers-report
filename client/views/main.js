html_not_signed_in = "<div class='info-container'>" +
                         "<div class='info-form-label'>신고 등록시 로그인 필요</div>" +
                         "<button class='btn btn-block google-signin-btn'>구글로 로그인</button>" + 
                         "<button class='btn btn-block naver-signin-btn'>네이버로 로그인</button>" + 
                         "</div>";

html_signed_in = "<div class='info-container'>" +
                     "<form class='info-form'>" +
                     "<div class='info-form-label'>신고 내용</div>" +
                     "<textarea class='form-control' rows='5'></textarea>" +
                     "<button class='btn btn-primary btn-block mers-info-btn'>등록</button>" +
                     "</form>" +
                     "</div>";

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

        // infowindow is global by design.
        // when login is successful, we show the form instead of login buttons from google login callback
        window.infowindow = new google.maps.InfoWindow({
          content: (Meteor.user() ? html_signed_in : html_not_signed_in)
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
    },
    'click .google-signin-btn': function(event, template){
      event.preventDefault();
      Meteor.loginWithGoogle({
        requestPermissions: ['email'],
        forceApprovalPrompt: true
      }, function(err) {
        // Optional callback. Called with no arguments on success, or with a 
        // single Error argument on failure. The callback cannot be called if 
        // you are using the "redirect" loginStyle, because the app will have 
        // reloaded in the meantime; try using client-side login hooks instead.

        if (err) {
          console.log("login error:", err);
          return false;
        }

        if (window.infowindow) {
          infowindow.setContent(html_signed_in);
        }

        $('.modal').modal('hide');

      });
    },
    'click .cancel-btn': function(event){
      $(".error_message").text("");
      $("input").val("");

      delete Session.keys["openSignInModal"];
      delete Session.keys["redirectAddr"];
    }
  });
}
