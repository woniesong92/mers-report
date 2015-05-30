Reports = new Mongo.Collection("reports");

Meteor.methods({
  addReport: function (text, lat, lng) {

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var report = {
      owner: Meteor.userId(),
      latitude: lat,
      longitude: lng,
      text: text,
      createdAt: new Date()
    };
  },

  deleteReport: function (reportId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var report = Reports.findOne({"_id": reportId});
    if ((Meteor.userId() == report.owner) || (Meteor.user().role == "admin")) {
      Reports.remove(reportId);
    }
  },

  editReport: function (reportId, newText) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var report = Comments.findOne({"_id": reportId});
    if (((Meteor.userId() == report.owner) || (Meteor.user().role == "admin")) && iisValidReport(newText)) {
      Reports.update(reportId, {
        $set: {'text': newText}
      });
    }
  },

});