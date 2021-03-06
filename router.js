Router.configure({
  layoutTemplate: 'Layout'
});

Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("reports");
  },

  action: function() {
    this.render('Main', {
      to: 'content',
      data: function () {
        return Reports.find({});
      }
    });
  }
});

Router.route('/about', function () {
  this.render('About', {to: 'content'});  
});