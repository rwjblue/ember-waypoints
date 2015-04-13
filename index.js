module.exports = {
  name: 'ember-waypoints',

  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      this.app.import('vendor/jquery-waypoints/waypoints.js');
    }
  }
}
