import Ember from 'ember';

var getProperties = Ember.getProperties;
var bind = Ember.run.bind;
var on = Ember.on;

export default Ember.Component.extend({
  contextElement: null,
  offset: null,
  triggerOnce: null,
  continuous: null,
  horizontal: null,

  waypoint: function() {
    var element = this.$();

    if (!element.waypoint) { return; }

    element.waypoint.apply(element, arguments);
  },

  setupWaypoint: on('didInsertElement', function() {
    this.waypoint(this.buildOptions());
  }),

  teardownWaypoint: on('willDestroyElement', function() {
    this.waypoint('destroy');
  }),

  buildOptions: function() {
    var options = getProperties(this, [ 'contextElement', 'offset', 'triggerOnce', 'continuous', 'horizontal']);
    options.handler = bind(this, this.waypointTriggered);

    for (var option in options) {
      if (options[option] === null) {
        delete options[option];
      }
    }

    if (options.contextElement) {
      options.context = options.contextElement;
      delete options.contextElement;
    }

    return options;
  },

  waypointTriggered: function(direction) {
    this.sendAction('on-' + direction, this);
    this.sendAction('action', direction, this);
  }
});
