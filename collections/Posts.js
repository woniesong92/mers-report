Posts = new Mongo.Collection("posts");

Meteor.methods({
  addProduct: function (formData, callback) {
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }
    var post = {
      category: formData.category,
      subcategory: formData.subcategory,
    };

    Posts.insert(post);
  },

  deleteProduct: function (postId) {
    Posts.remove(postId);
  },

  // getProduct: function (postId) {
  //   return Posts.findOne({_id: postId});
  // }

});