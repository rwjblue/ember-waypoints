# Ember Waypoints

Ember Waypoints is an easy way to consume the jQuery Waypoints library within an Ember application.
It is initially published as an Ember CLI addon, but could have a standalone (aka globals based)
if folks are interested.

## Status

[![Build Status](https://travis-ci.org/rwjblue/ember-waypoints.svg?branch=master)](https://travis-ci.org/rwjblue/ember-waypoints)

## Resources for [jQuery Waypoints](https://github.com/imakewebthings/jquery-waypoints)

* [Website](http://imakewebthings.com/jquery-waypoints/)
* [Getting Started Guide](http://imakewebthings.com/jquery-waypoints/#get-started)
* [API Documentation](http://imakewebthings.com/jquery-waypoints/#docs)

## Using

### Installation

To install run the following:

```javascript
ember install ember-waypoints
```

### Usage

Simply use the `{{waypoint}}` helper in your template:

```handlebars
{{#waypoint on-up="viewedScrollingUp"}}
  <p>This text is always displayed, the wrapping component simply provides
     a way to interact with jquery-waypoints.</p>
{{/waypoint}}
```

### Actions

* `on-up` -- This is fired when a waypoint is viewed while scrolling `up`. Receives the component instance as an argument.
* `on-down` -- This is fired when a waypoint is viewed while scrolling `down`. Receives the component instance as an argument.
* `action` -- This is fired when a waypoitn is viewed in either direction. Receives the direction (`"down"` or `"up"`) and the component instance.

You can pass arguments to the fired action by using Ember's [closure actions](http://emberjs.com/blog/2015/06/12/ember-1-13-0-released.html#toc_closure-actions). The closure action arguments will proceed the arguments passed in by ember-waypoints:

```handlebars
{{#each pages as |page|}}
  {{#waypoint action=(action "setCurrentPage" page)}}
    <div>
      Using a closure action allows you to pass addional arguments to the action
    </div>
  {{/waypoint}}
{{/each}}
```

```javascript
actions: {
  setCurrentPage(page, direction) {
    // arguments provided by the closure action are passed in first
    // followed by arguments provided by ember-waypoints
  }
}
```

### Configuration Options

The majority of the jquery-waypoints configuration API is available for use.  Simply provide one of the following options
and it will be used for waypoint being created:

* `horizontal`
* `triggerOnce`
* `offset`
* `contextElementId` (in place of context)
* `continuous`

An example of using a way point with a context (where you want to have the way point be based upon a "container" div offset instead of the body offset):

```handlebars
<div id="container" style="height:100px; overflow-y:scroll;">
  <div style="height:500px;">
    {{#waypoint contextElementId="container" offset="50" on-up="scrollingUp" on-down="scrollingDown"}}
      <div>
        The thing that triggers the waypoint actions to be fired when it reaches the top of the $('#container') element + a 50 pixel offset.
      </div>
    {{/waypoint}}
  </div>
</div>
```

### Unit testing components

To unit test components that use the `waypoint` helper in their
templates, make sure to add `integration:true` to your moduleForComponent:

```javascript
moduleForComponent('my-component-that-includes-a-waypoint', {
  integration: true
});
```


## Development of ember-waypoints

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## License

This library is licensed under the MIT License.
