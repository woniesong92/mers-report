Reports = new Mongo.Collection("reports");

Meteor.methods({
  addReport: function (text, phone, lat, lng) {

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (isValidReport(text)){
      var report = {
        author: Meteor.userId(),
        latitude: lat,
        longitude: lng,
        text: text,
        phone: phone,
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

  editReport: function (reportId, newText, newPhone) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var report = Reports.findOne({"_id": reportId});
    if (((Meteor.userId() == report.author) || (Meteor.user().role == "admin")) && isValidReport(newText)) {
      Reports.update(reportId, {
        $set: {'text': newText, 'phone': newPhone}
      });
      report = Reports.findOne({"_id": reportId});
    }
    // debugger
    return report;
  },

});