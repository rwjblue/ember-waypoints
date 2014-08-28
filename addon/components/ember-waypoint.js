import Ember from 'ember';

var getProperties = Ember.getProperties;
var bind = Ember.run.bind;
var get = Ember.get;
var on = Ember.on;

export default Ember.Component.extend({
  offset: null,
  triggerOnce: null,
  continuous: null,
  horizontal: null,

  setupWaypoint: on('didInsertElement', function() {
    this.$().waypoint(this.buildOptions());
  }),

  teardownWaypoint: on('willDestroyElement', function() {
    this.$().waypoint('destroy');
  }),

  buildOptions: function() {
    var options = getProperties(this, [ 'offset', 'triggerOnce', 'continuous', 'horizontal']);
    options.handler = bind(this, this.waypointTriggered);

    for (var option in options) {
      if (options[option] === null) {
        delete options[option];
      }
    }

    return options;
  },

  waypointTriggered: function(direction) {
    this.sendAction('on-' + direction, this);
    this.sendAction('action', direction, this);
  }
});
