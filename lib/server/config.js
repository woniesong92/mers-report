 if (Meteor.isServer) {

   //Google Auth config
   ServiceConfiguration.configurations.remove({
     service: "google"
   });


   // local server
   
   // ServiceConfiguration.configurations.insert({
   //   service: "google",
   //   clientId: "117587992890-9e2bemi1vft1erlv5l711m38ilv4t0ea.apps.googleusercontent.com",
   //   loginStyle: "popup",
   //   secret: "_7mgEeeAfioD8wBlnxCjWNS0"
   // });

   // deployed server 
   ServiceConfiguration.configurations.insert({
     service: "google",
     clientId: "117587992890-9v8nnikndmekjadim77c9hmnjpt5er2k.apps.googleusercontent.com",
     loginStyle: "popup",
     secret: "L-0qXLbZ9uWKTmIQKb-dgtLt"
   });
 }