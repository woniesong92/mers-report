if (Meteor.isClient) {

  // Template.Signin.events({
  //   'hidden.bs.modal #SigninModal': function(event) {
  //     if (Session.get("redirectAddr")) {
  //       Router.go(Session.get("redirectAddr"));
  //       delete Session.keys["redirectAddr"];
  //     }
  //   },

  //   'shown.bs.modal #SigninModal': function(event) {
  //     $('#signin-netid').focus();
  //   },
  // });

  // Template.SigninForm.helpers({
  //   'loginErrorMessage': function() {
  //     if (Session.get("loginErrorMessage")) {
  //       var loginErrorMessage = Session.get("loginErrorMessage");
  //       delete Session.keys['loginErrorMessage'];
  //       return loginErrorMessage;
  //     }
  //     return "";
  //   }
  // });
  
  // Template.SigninForm.rendered = function() {
  //   this.autorun(function() {
  //     if (Session.get("openSignInModal")) {
  //       delete Session.keys["openSignInModal"];
  //       setTimeout(function() {
  //         $('#SigninModal').modal('show');
  //       }, 200);
  //     }
  //   });
  // }

  Template.SigninForm.events({
    '#google-signin-btn': function(event, template){
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