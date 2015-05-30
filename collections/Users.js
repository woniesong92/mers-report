// userExists = function(username) {
//   return !!Meteor.users.findOne({username: username});
// }

Meteor.methods({

  setIsNew: function() {
    Meteor.users.update(Meteor.user()._id,
      {$set: {'isNew': 0
      }}
    );
  },

});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {

    var email = user.services.google.email;
    user.email = email;
    user.isNew = 1;
    user.role = "normal";
    return user;
  });


}

