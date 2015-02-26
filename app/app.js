/* global jQuery, _ */
/* exported ENTER_KEY, ESC_KEY */
_.templateSettings.variable = 'ctx';

var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

jQuery( function() {
  'use strict';

  // kick things off by creating the `App`
  new app.AppView();
});
