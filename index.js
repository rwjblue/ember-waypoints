var fs    = require('fs');
var path  = require('path');

function createCustomVendor() {
  var pathParts = [
    'vendor',
    'jquery-waypoints'
  ];

  var currentPath = path.join(__dirname, 'vendor');
  if (!fs.existsSync(currentPath)) { fs.mkdirSync(currentPath); }

  currentPath = path.join(currentPath, 'jquery-waypoints');
  if (!fs.existsSync(currentPath)) { fs.mkdirSync(currentPath); }

  currentPath = path.join(currentPath, 'waypoints.js');
  if (!fs.existsSync(currentPath)) {
    var originalPath = path.join(__dirname, 'bower_components', 'jquery-waypoints', 'waypoints.js');
    var contents = fs.readFileSync(originalPath, { encoding: 'utf8' });

    fs.writeFileSync(currentPath, contents, { encoding: 'utf8' });
  }
}

module.exports = {
  name: 'ember-waypoints',

  treeFor: function(name) {
    if (name === 'vendor') {
      createCustomVendor();

      return {
        read: function() { return path.join(__dirname, 'vendor'); },
        cleanup: function() { }
      };
    } else {
      return this._super.treeFor.apply(this, arguments);
    }
  },

  included: function(app) {
    this._super.included(app);

    this.app.import('vendor/jquery-waypoints/waypoints.js');
  }
}
