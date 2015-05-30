if (Meteor.isClient) {  
  
  Template.Layout.rendered = function () {
    var remainingHeight = $('body').height() - $('#content-block').height();
    var newHeight = remainingHeight / 2.0 + "px";
    console.log(newHeight);
    $('#header, #footer').css('height', newHeight);
    $('#header, #footer').css('line-height', newHeight);
  }

  Template.Layout.helpers({

  });

}