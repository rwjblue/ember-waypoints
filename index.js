module.exports = {
  name: 'ember-waypoints',

  included: function(app) {
    this._super.included(app);

    this.app.import('vendor/jquery-waypoints/waypoints.js');
  }
}
