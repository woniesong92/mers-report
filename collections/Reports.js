Reports = new Mongo.Collection("reports");

Meteor.methods({
  addReport: function (text, lat, lng) {

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (isValidReport(text)){
      var report = {
        author: Meteor.userId(),
        latitude: lat,
        longitude: lng,
        text: text,
        createdAt: new Date()
      };

      return Reports.insert(report);
    }
  },

  deleteReport: function (reportId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var report = Reports.findOne({"_id": reportId});
    if ((Meteor.userId() == report.author) || (Meteor.user().role == "admin")) {
      Reports.remove(reportId);
    }
  },

  editReport: function (reportId, newText) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var report = Reports.findOne({"_id": reportId});
    if (((Meteor.userId() == report.author) || (Meteor.user().role == "admin")) && isValidReport(newText)) {
      Reports.update(reportId, {
        $set: {'text': newText}
      });
      report = Reports.findOne({"_id": reportId});
    }
    // debugger
    return report;
  },

});