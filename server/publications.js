if (Meteor.isServer) {
  Meteor.publish("reports", function () {
    return Reports.find();
  });
}