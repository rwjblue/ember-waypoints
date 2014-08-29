import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map(function() {
  this.route('manual-testing');
  this.route('testing');
});

export default Router;
