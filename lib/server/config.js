 if (Meteor.isServer) {

   //Google Auth config
   ServiceConfiguration.configurations.remove({
     service: "google"
   });

   ServiceConfiguration.configurations.insert({
     service: "google",
     clientId: "117587992890-9e2bemi1vft1erlv5l711m38ilv4t0ea.apps.googleusercontent.com",
     loginStyle: "popup",
     secret: "_7mgEeeAfioD8wBlnxCjWNS0"
   });

