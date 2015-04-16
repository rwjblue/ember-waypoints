import Ember from 'ember';
import WaypointComponent from 'ember-waypoints/components/waypoint';

export default function() {
  var helper = Ember.HTMLBars.makeViewHelper(WaypointComponent);
  Ember.HTMLBars._registerHelper('waypoint', helper);
}
