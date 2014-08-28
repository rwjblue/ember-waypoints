import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('waypoint', 'component:waypoint', {
  teardown: function() {
    Ember.$.waypoints('destroy');
  }
});

test('sets up waypoint after render', function() {
  equal(Ember.$.waypoints().vertical.length, 0, 'precond - no waypoints exist');

  this.append();

  equal(Ember.$.waypoints().vertical.length, 1, 'waypoint was created');
});

test('sets up horizontal waypoint after render', function() {
  equal(Ember.$.waypoints().horizontal.length, 0, 'precond - no waypoints exist');

  this.subject({
    horizontal: true
  });

  this.append();

  equal(Ember.$.waypoints().horizontal.length, 1, 'waypoint was created');
});

test('clears waypoint after teardown', function() {
  this.append();
  equal(Ember.$.waypoints().vertical.length, 1, 'precond - waypoint was created');

  Ember.run(this.subject(), 'destroy');
  equal(Ember.$.waypoints().vertical.length, 0, 'precond - no waypoints exist');
});

test('passes offset through to waypoints', function() {
  this.subject({
    waypoint: function(options) {
      equal(options.offset, 200, 'offset is passed on');
    },
    offset: 200
  });

  this.append();
});

test('passes horizontal through to waypoints', function() {
  this.subject({
    waypoint: function(options) {
      equal(options.horizontal, true, 'horizontal is passed on');
    },

    horizontal: true
  });

  this.append();
});

test('passes triggerOnce through to waypoints', function() {
  this.subject({
    waypoint: function(options) {
      equal(options.triggerOnce, true, 'triggerOnce is passed on');
    },

    triggerOnce: true
  });

  this.append();
});

test('passes continuous through to waypoints', function() {
  this.subject({
    waypoint: function(options) {
      equal(options.continuous, true, 'continuous is passed on');
    },

    continuous: true
  });

  this.append();
});

test('does not pass on defaulted (non-set) props', function() {
  this.subject({
    waypoint: function(options) {
      deepEqual(Ember.keys(options), ['handler'], 'only handler is present by default');
    }
  });

  this.append();
});

test('sends actions when handler is called', function() {
  var handler;
  var triggeredActions = [];

  this.subject({
    waypoint: function(options) {
      handler = options.handler;
    },

    sendAction: function(name) {
      triggeredActions.push(name);
    }
  });

  this.append();

  handler('up');
  deepEqual(triggeredActions, ['on-up', 'action'], 'actions are triggered');

  triggeredActions = [];
  handler('down');
  deepEqual(triggeredActions, ['on-down', 'action'], 'actions are triggered');
});
