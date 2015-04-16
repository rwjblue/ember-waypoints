var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-waypoints',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/jquery-waypoints/lib/jquery.waypoints.min.js');
  }
}
