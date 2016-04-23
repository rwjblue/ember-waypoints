var fs = require('fs');
var path = require('path');
var writeFile = require('broccoli-file-creator');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-waypoints',

  treeForVendor: function(tree) {
    var content = 'if (typeof(document) !== "undefined") {' +
      fs.readFileSync(path.join(this.project.bowerDirectory + '/jquery-waypoints/waypoints.js')) +
    '}';

    var waypointsTree = writeFile('/waypoints.js', content);

    return mergeTrees([tree, waypointsTree]);
  },
  included: function(app) {
    this.app = app;
    app.import('vendor/waypoints.js');
  }
}
