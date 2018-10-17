import Ember from 'ember';

var getProperties = Ember.getProperties;
var bind = Ember.run.bind;
var isNone = Ember.isNone;

export default Ember.Component.extend({
  contextElement: null,
  offset: null,
  triggerOnce: null,
  continuous: null,
  horizontal: null,

  waypoint: function() {
    if (typeof document === 'undefined') {
      return;
    }

    var element = this.$();

    if (!element.waypoint) { return; }

    element.waypoint.apply(element, arguments);
  },

  didInsertElement() {
    this._super(...arguments);

    this.waypoint(this.buildOptions());
  },

  willDestroyElement() {
    this._super(...arguments);

    this.waypoint('destroy');
  },

  buildOptions: function() {
    var options = getProperties(this, [ 'contextElementId', 'offset', 'triggerOnce', 'continuous', 'horizontal']);
    options.handler = bind(this, this.waypointTriggered);

    for (var option in options) {
      if (isNone(options[option])) {
        delete options[option];
      }
    }

    if (options.contextElementId) {
      options.context = document.getElementById(options.contextElementId);
      delete options.contextElementId;
    }

    return options;
  },

  waypointTriggered: function(direction) {
    this.sendAction('on-' + direction, this);
    this.sendAction('action', direction, this);
  }
});
