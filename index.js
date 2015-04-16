var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-waypoints',

  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/jquery-waypoints/waypoints.min.js');
    }
  }
}
