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
npm install --save-dev ember-waypoints
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

### Configuration Options

The majority of the jquery-waypoints configuration API is available for use.  Simply provide one of the following options
and it will be used for waypoint being created:

* `horizontal`
* `triggerOnce`
* `offset`
* `continuous`

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
