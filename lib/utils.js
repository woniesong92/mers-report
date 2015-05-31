// This is loaded first because it's located in a deeper subdirectory
// than other view files
// It contains code that works across the view templates


// userExists = function(username) {
//   return !!Meteor.users.findOne({username: username});
// }

// cutEmailDomain = function(email) {
//   return email.substr(0, email.indexOf("@"));
// }

// isValidEmail = function validateEmail(email) {
//   var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//   return re.test(email);
// }


isValidReport = function(text) {
  if (text.length < 10) {
     throw new Meteor.Error(500, 'Reviews must be at least 10 characters!');
    return false;
  } else if (text.length > 500) {
     throw new Meteor.Error(500, 'Reviews must be within 500 characters!');
    return false;
  }
  if (text.indexOf("<script>") > -1) {
    return false;
  }
  return true;
}

