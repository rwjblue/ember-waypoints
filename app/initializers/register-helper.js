import Ember from 'ember';
import WaypointComponent from 'ember-waypoints/components/waypoint';

export default {
  name: 'ember-waypoints-register-helper',

  initialize: function() {
    var helper = Ember.Handlebars.makeViewHelper(WaypointComponent);

    Ember.Handlebars.registerHelper('waypoint', helper);
  }
};
