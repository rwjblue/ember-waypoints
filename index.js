var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-waypoints',

  contentFor: function(type) {
    if (type === 'vendor-suffix') {
      return 'if (typeof(document) !== "undefined") {\n' + fs.readFileSync(path.join(__dirname, 'vendor/jquery-waypoints/waypoints.js')) + '\n}';
    }
  }
}
