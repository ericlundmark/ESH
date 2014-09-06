/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';

 var User = require('../api/user/user.model');
 var Event = require('../api/event/event.model');
 var Busstop = require('../api/busstop/busstop.model');

 User.find({}).remove(function() {
  console.log('removed users');
  Busstop.find({}).remove(function(){
    console.log('removed busstops');
    Event.find({}).remove(function(){
      console.log('removed events');
      console.log('............................');
      populateUsers();
    });
  });

  
  
});
 function populateUsers(){
  console.log('populating users');
  var test = {
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  };
  var admin = {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  };
  var onBusstopAdded = function(busstop, user){
    var glassbar = {
      name: 'Berras glassbar',
      author: {
        _id: user._id,
        name: user.name
      },
      description: 'Skön...t häng på denna glassbar',
      location: [57.273035, 12.200886],
      busStop: {
        _id: busstop._id,
        name: busstop.names
      }
    };
    var bio = {
      name: 'Berras bio',
      author: {
        _id: user._id,
        name: user.name
      },
      description: 'Riktigt bra bio!',
      location: [58.410807, 15.621373],
      busStop: {
        _id: busstop._id,
        name: busstop.names
      }
    };
    Event.find({}).remove(function(){
      addEvent(glassbar, busstop);
      addEvent(bio, busstop);
    });
  };
  User.create(test, admin, function(err, test, admin) {
    console.log('finished populating users');
    console.log('............................');
    console.log('populating busstops');
    var busstop = {
      _id: 7410957,
      name: 'Linköping Gamla Linköping',
      location: [15.589929, 58.40711],
      events: []
    };
    addBusstop(busstop,test,onBusstopAdded);
  });
}

function addEvent(event, busstop){
  Event.create(event ,function(err, event) {
    Busstop.findByIdAndUpdate(busstop._id, {$push: {events: {
      _id: event._id,
      name: event.name,
      description: event.description
    }}}, function(err, busstop){
      console.log('added event: ' + event.name + ' to busstop ' + busstop.name);
    });
  });
}
function addBusstop(busstop, user,onBusstopAdded){
  Busstop.create(busstop, function(err, busstop) {
    console.log('added busstop ' + busstop);
    onBusstopAdded(busstop, user);
  });
}