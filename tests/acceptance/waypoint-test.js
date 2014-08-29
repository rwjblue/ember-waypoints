import Ember from 'ember';
import startApp from '../helpers/start-app';

var get = Ember.get;
var App, firedActions, $window;

module('Acceptance: Waypoints', {
  setup: function() {
    App = startApp();
    $window = App.$();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('triggers waypoints', function() {
  visit('/testing');

  andThen(function() {
    firedActions = get(App, 'firedActions');

    var expected = [
      { "action": "on-down", "id": "pretop" },
      { "action": "action - down", "id": "pretop" },
      { "action": "on-down", "id": "top" },
      { "action": "action - down", "id": "top" }
    ];

    deepEqual(firedActions, expected, 'top and pretop have been triggered');
  });

  andThen(function() {
    firedActions.clear();
  });

  //andThen(function() {
  //  Ember.run(function() {
  //    Ember.$('#ember-testing-container').scrollTop(1000)
  //    $window.scrollTop(1000);
  //  });

  //  var expected = [
  //    { "action": "on-down", "id": "same1" },
  //    { "action": "action - down", "id": "same1" },
  //    { "action": "on-down", "id": "same2" },
  //    { "action": "action - down", "id": "same2" }
  //  ]

  //  deepEqual(firedActions, expected, '');
  //});
});
