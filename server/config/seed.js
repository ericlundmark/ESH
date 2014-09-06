/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';

 var User = require('../api/user/user.model');
 var Event = require('../api/event/event.model');
 var Busstop = require('../api/busstop/busstop.model');

 User.find({}).remove(function() {
  console.log('populating users');
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function(err, user) {
    console.log('finished populating users');
    populateBusstops(user);
  });
});

 function populateBusstops(user){
  Busstop.find({}).remove(function(){
    console.log('populating busstops');
    Busstop.create({
      _id: 7410957,
      name: 'Linköping Gamla Linköping',
      coordinate: [15.589929, 58.40711],
      events: []
    }, function(err, busstop) {
      console.log('finished populating busstops');
      populateEvents(user, busstop);
    });
  });
}
function populateEvents(user, busstop){
  Event.find({}).remove(function(){
    Event.create({
      name: 'Berras glassbar',
      author: {
        _id: user._id,
        name: user.name
      },
      description: 'Skön...t häng på denna glassbar',
      location: [57.273035, 12.200886],
      coordinate: [57.273035, 12.200886],
      busStop: {
        _id: busstop._id,
        name: busstop.names
      }
    }, function(err, event) {
      console.log('updating busstop');
      Busstop.findByIdAndUpdate(busstop._id, {$push: {events: {
        _id: event._id,
        name: event.name,
        description: event.description
      }}}, function(err, busstop){
      });
      console.log('finished populating events');
    });
  });
};
