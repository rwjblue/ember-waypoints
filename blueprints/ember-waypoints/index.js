module.exports = {
  description: 'Add bower dependencies for jquery-waypoints',

  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackageToProject('jquery-waypoints');
  }
};
