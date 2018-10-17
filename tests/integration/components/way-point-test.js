import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('way-point', 'Integration | Component | ember waypoint', {
  integration: true,

  teardown() {
    Ember.$.waypoints('destroy');
  }

});

test('sets up waypoint after render', function(assert) {
  assert.equal(Ember.$.waypoints().vertical.length, 0, 'precond - no waypoints exist');

  this.render(hbs`{{way-point}}`);

  assert.equal(Ember.$.waypoints().vertical.length, 1, 'waypoint was created');
});

test('sets up horizontal waypoint after render', function(assert) {
  assert.equal(Ember.$.waypoints().horizontal.length, 0, 'precond - no waypoints exist');

  this.horizontal = true;

  this.render(hbs`{{way-point horizontal=horizontal}}`);

  assert.equal(Ember.$.waypoints().horizontal.length, 1, 'waypoint was created');
});

test('clears waypoint after teardown', function(assert) {
  this.set('showComponent', true);
  this.render(hbs`{{#if showComponent}}{{way-point}}{{/if}}`);
  assert.equal(Ember.$.waypoints().vertical.length, 1, 'precond - waypoint was created');

  this.set('showComponent', false);
  assert.equal(Ember.$.waypoints().vertical.length, 0, 'precond - no waypoints exist');
});

test('passes offset through to waypoints', function(assert) {
  assert.expect(1);

  this.waypoint = function(options) {
    if (options !== 'destroy') {
      assert.equal(options.offset, 200, 'offset is passed on');
    }
  };
  this.offset = 200;

  this.render(hbs`{{way-point waypoint=waypoint offset=offset}}`);
});

test('passes horizontal through to waypoints', function(assert) {
  assert.expect(1);

  this.waypoint = function(options) {
    if (options !== 'destroy') {
      assert.equal(options.horizontal, true, 'horizontal is passed on');
    }
  };
  this.horizontal = true;

  this.render(hbs`{{way-point waypoint=waypoint horizontal=horizontal}}`);
});

test('passes triggerOnce through to waypoints', function(assert) {
  assert.expect(1);

  this.waypoint = function(options) {
    if (options !== 'destroy') {
      assert.equal(options.triggerOnce, true, 'triggerOnce is passed on');
    }
  };
  this.triggerOnce = true;

  this.render(hbs`{{way-point waypoint=waypoint triggerOnce=triggerOnce}}`);
});

test('passes continuous through to waypoints', function(assert) {
  assert.expect(1);

  this.waypoint = function(options) {
    if (options !== 'destroy') {
      assert.equal(options.continuous, true, 'continuous is passed on');
    }
  };
  this.continuous = true;

  this.render(hbs`{{way-point waypoint=waypoint continuous=continuous}}`);
});

test('passes contextElementId through to waypoints', function(assert) {
  assert.expect(2);

  this.waypoint = function(options) {
    if (options !== 'destroy') {
        assert.equal(options.context.id, 'ember-testing', 'context is a DOM node');
        assert.equal(options.context.tagName, 'DIV', 'context is a DOM node');
    }
  };
  this.contextElementId = 'ember-testing';

  this.render(hbs`{{way-point waypoint=waypoint contextElementId=contextElementId}}`);
});

test('does not pass on defaulted (non-set) props', function(assert) {
  assert.expect(1);

  this.waypoint = function(options) {
    if (options !== 'destroy') {
        assert.deepEqual(Ember.keys(options), ['handler'], 'only handler is present by default');
    }
  };

  this.render(hbs`{{way-point waypoint=waypoint}}`);
});

test('sends actions when handler is called', function(assert) {
  var handler;
  var triggeredActions = [];

  this.waypoint = function(options) {
    handler = options.handler;
  };

  this.sendAction = function(name) {
    triggeredActions.push(name);
  };

  this.render(hbs`{{way-point waypoint=waypoint sendAction=sendAction}}`);

  handler('up');
  assert.deepEqual(triggeredActions, ['on-up', 'action'], 'actions are triggered');

  triggeredActions = [];
  handler('down');
  assert.deepEqual(triggeredActions, ['on-down', 'action'], 'actions are triggered');
});
