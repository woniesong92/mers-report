html_not_signed_in = "<div class='info-container'>" +
                         "<div class='info-form-label'>신고 등록시 로그인 필요</div>" +
                         "<button class='btn btn-block google-signin-btn'>구글로 로그인</button>" + 
                         //"<button class='btn btn-block naver-signin-btn'>네이버로 로그인</button>" + 
                         "</div>";

html_signed_in = "<div class='info-container'>" +
                     "<form class='info-form'>" +
                     "<div class='info-form-label'>신고 내용</div>" +
                     "<textarea class='form-control report-text' rows='5'></textarea>" +
                     "<div class='info-form-label'>전화번호</div>" +
                     "<input type='text' name='phone' class='form-control report-phone'>" +
                     "<button class='btn btn-primary btn-block mers-info-btn'>등록</button>" +
                     "</form>" +
                     "</div>";

html_edit_delete = "<a class='edit-btn'>수정</a>" 
                         + "<a class='delete-btn'>삭제</a>";

html_edit = "<div class='info-container'>" +
                     "<form class='info-form'>" +
                     "<div class='info-form-label'>신고 내용</div>" +
                     "<textarea class='form-control report-text' rows='5'></textarea>" +
                     "<div class='info-form-label'>전화번호</div>" +
                     "<input type='text' name='phone' class='form-control report-phone'>" +
                     "<button class='btn btn-primary btn-block edit-info-btn'>수정</button>" +
                     "</form>" +
                     "</div>";

unset_marker = null;

if (Meteor.isClient) {

  // Handles the event where the user searches an address
  function geocodeHandler() {
    if (!!unset_marker){
      unset_marker.setMap(null)
    }

    var address = $('.report-addr-input').val();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(15);

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: "/icons/red-dot-blur.png" // change it to "/icons/red-dot.png" on success
        });

        if (window.infowindow){
          infowindow.close();
        }
        marker.infowindow = new google.maps.InfoWindow({
          content: (Meteor.user() ? html_signed_in : html_not_signed_in)
        });
        marker.infowindow.open(map, marker);

        // infowindow is global by design.
        // when login is successful, we show the form instead of login buttons from google login callback
        window.infowindow = marker.infowindow;
        unset_marker = marker;

        $('.info-form').submit(function() {
          debugger
        });

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

// Convert a report object into an HTML content to put inside a marker's infowindow
function makeReportContent(report) {
  var content;
  if (report.author == Meteor.userId()){
    content = "<div class='info-container'>"
                + "<strong>" + report.createdAt + "</strong>"
                + "<p>" + report.text + "</p>"
                + html_edit_delete + "</div>";
                // share button
  } else {
    content = "<div class='info-container'>"
                + "<strong>" + report.createdAt + "</strong>"
                + "<p>" + report.text + "</p>"
                + "</div>";
                // share button
  }
  return content;
}


  Template.Main.rendered = function() {
    // google.maps.event.addDomListener(window, 'load', function() {
    //   Template.Main.init();
    // });
    Template.Main.init();

    var reports = UI.getData().fetch();

    $.each(reports, function(idx, report) {
      var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(report.latitude, report.longitude, true)
      });

      marker.infowindow = new google.maps.InfoWindow({
        content: makeReportContent(report),
        reportId: report._id
      });

      // replacing for loop with $.each function fixes the problem
      google.maps.event.addListener(marker, 'click', function() {
        if (window.infowindow) {
          infowindow.close();
        }
        map.setZoom(14);
        map.setCenter(marker.getPosition());
        marker.infowindow.open(map, marker);
        window.infowindow = marker.infowindow;
        console.log(marker.infowindow.reportId);
      });
    });

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

      });
    },
    'click .cancel-btn': function(event){
      $(".error_message").text("");
      $("input").val("");

      delete Session.keys["openSignInModal"];
      delete Session.keys["redirectAddr"];
    },
    'click .mers-info-btn': function(event, template){
      event.preventDefault();
      var text = $('.report-text').val();
      var phone = $('.report-phone').val();

      var lat = infowindow.getPosition().lat();
      var lng = infowindow.getPosition().lng();

      Meteor.call("addReport", text, phone, lat, lng, function(err, reportId){
        if (err){
          console.log(err);
        } else {
          infowindow.close();
          
          var report = Reports.findOne({_id: reportId});

          var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(report.latitude, report.longitude, true),
          });

          marker.infowindow = new google.maps.InfoWindow({
            content: makeReportContent(report),
            reportId: reportId
          });

          marker.infowindow.open(map, marker);
          window.infowindow = marker.infowindow;
          unset_marker = null;

          google.maps.event.addListener(marker, 'click', function() {
            if (window.infowindow){
              infowindow.close();
            }
            map.setCenter(marker.getPosition());
            marker.infowindow.open(map, marker);
            window.infowindow = marker.infowindow;
          });


        }
        // debugger
        return false;
      });
    },
    'click .edit-btn': function(event, template){
      if (window.infowindow){
        var report = Reports.findOne({ _id: infowindow.reportId });
        infowindow.setContent(html_edit);
        $('.report-text').val(report.text);
        $('.report-phone').val(report.phone);
        google.maps.event.addListener(infowindow,'closeclick',function(){
          infowindow.setContent(makeReportContent(report));
        });
        
      }
    },
    'click .edit-info-btn': function(event, template){
      event.preventDefault();
      var text = $('.report-text').val();
      var phone = $('.report-phone').val();
      Meteor.call("editReport", infowindow.reportId, text, phone, function(err, report){
        // debugger
        if (err){
          console.log(err);
        } else {
          infowindow.setContent(makeReportContent(report));
          google.maps.event.clearListeners(infowindow,'closeclick');

          //infowindow.anchor.infowindow.setContent(makeReportContent(report));

        }
        return false;
      });
    },
    'click .delete-btn': function(event, template){
      event.preventDefault();
      Meteor.call("deleteReport", window.infowindow.reportId, function(err){
        if (err){
          console.log(err);
        } else {
          infowindow.anchor.setMap(null);
          window.infowindow.close();
        }
        return false;
      });
    },

  });
}
