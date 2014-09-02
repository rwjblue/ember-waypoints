import Ember from 'ember';
import WaypointComponent from 'ember-waypoints/components/waypoint';

export default function() {
  var helper = Ember.Handlebars.makeViewHelper(WaypointComponent);

  Ember.Handlebars.registerHelper('waypoint', helper);
}
