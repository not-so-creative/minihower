/* global Backbone */
var app = app || {};

(function( Backbone ) {
  'use strict';
  // collection of tasks backed by localforage
  var Tasks = Backbone.Collection.extend({
    // save all tasks under the "Tasks" namespace
    sync: Backbone.localforage.sync( 'Tasks' ),

    // reference this collections model
    model: app.Task
  });

  // export Tasks
  app.tasks = new Tasks();
})( Backbone );
