/* global Backbone */
var app = app || {};

(function( Backbone ) {
  'use strict';

  app.Task = Backbone.Model.extend({
    sync: Backbone.localforage.sync( 'Task' ),

    // set model default attributes
    defaults: {
      description: '',
      completed: false,
      x: 250,
      y: 250
    },

    // toggle the completed state of items
    toggle: function() {
      this.save({
        completed: !this.get( 'completed' )
      });
    }
  });
})( Backbone );
