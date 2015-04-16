import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('waypoint', 'component:waypoint', {
  teardown: function() {
    Ember.$.waypoints('destroy');
  }
});

test('sets up waypoint after render', function(assert) {
  assert.equal(Ember.$.waypoints().vertical.length, 0, 'precond - no waypoints exist');

  this.render();

  assert.equal(Ember.$.waypoints().vertical.length, 1, 'waypoint was created');
});

test('sets up horizontal waypoint after render', function(assert) {
  assert.equal(Ember.$.waypoints().horizontal.length, 0, 'precond - no waypoints exist');

  this.subject({
    horizontal: true
  });

  this.render();

  assert.equal(Ember.$.waypoints().horizontal.length, 1, 'waypoint was created');
});

test('clears waypoint after teardown', function(assert) {
  this.render();
  assert.equal(Ember.$.waypoints().vertical.length, 1, 'precond - waypoint was created');

  Ember.run(this.subject(), 'destroy');
  assert.equal(Ember.$.waypoints().vertical.length, 0, 'precond - no waypoints exist');
});

test('passes offset through to waypoints', function(assert) {
  assert.expect(1);

  this.subject({
    waypoint: function(options) {
      if (options !== 'destroy') {
        assert.equal(options.offset, 200, 'offset is passed on');
      }
    },
    offset: 200
  });

  this.render();
});

test('passes horizontal through to waypoints', function(assert) {
  assert.expect(1);

  this.subject({
    waypoint: function(options) {
      if (options !== 'destroy') {
        assert.equal(options.horizontal, true, 'horizontal is passed on');
      }
    },

    horizontal: true
  });

  this.render();
});

test('passes triggerOnce through to waypoints', function(assert) {
  assert.expect(1);

  this.subject({
    waypoint: function(options) {
      if (options !== 'destroy') {
        assert.equal(options.triggerOnce, true, 'triggerOnce is passed on');
      }
    },

    triggerOnce: true
  });

  this.render();
});

test('passes continuous through to waypoints', function(assert) {
  assert.expect(1);

  this.subject({
    waypoint: function(options) {
      if (options !== 'destroy') {
        assert.equal(options.continuous, true, 'continuous is passed on');
      }
    },

    continuous: true
  });

  this.render();
});

test('passes contextElementId through to waypoints', function(assert) {
  assert.expect(2);

  this.subject({
    waypoint: function(options) {
      if (options !== 'destroy') {
        assert.equal(options.context.id, 'ember-testing', 'context is a DOM node');
        assert.equal(options.context.tagName, 'DIV', 'context is a DOM node');
      }
    },

    contextElementId: 'ember-testing'
  });

  this.render();
});

test('does not pass on defaulted (non-set) props', function(assert) {
  assert.expect(1);

  this.subject({
    waypoint: function(options) {
      if (options !== 'destroy') {
        assert.deepEqual(Ember.keys(options), ['handler'], 'only handler is present by default');
      }
    }
  });

  this.render();
});

test('sends actions when handler is called', function(assert) {
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

  this.render();

  handler('up');
  assert.deepEqual(triggeredActions, ['on-up', 'action'], 'actions are triggered');

  triggeredActions = [];
  handler('down');
  assert.deepEqual(triggeredActions, ['on-down', 'action'], 'actions are triggered');
});
