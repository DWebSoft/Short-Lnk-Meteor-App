import { Meteor } from 'meteor/meteor';
import { WebApp } from "meteor/webapp";

import '../imports/api/users';
import { Links } from '../imports/api/links';
import "../imports/startup/simple-schema-configurtaion";

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    let _id = req.url.slice(1);
    let link = Links.findOne({_id});

    if ( link ) {
      //Set response status code to 302
      res.statusCode = 302;
      //Set respose 'location' header
      res.setHeader('location', link.url);
      //End response
      res.end();
      Meteor.call('links.tracker', link._id);
    } else {
      next();
    }    
  });
});
