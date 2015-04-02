/* global Backbone, _, jQuery, graph */
var app = app || {};

(function( window, document, Backbone, _, $, undefined ) {
  'use strict';

  app.TaskView = Backbone.View.extend({
    // create wrapping `<tr>` tag
    tagName: 'tr',

    // cache template for a single item
    template: _.template( $( '#task-template' ).html() ),

    // delegate events for creating new items and clearing completed ones
    events: {
      'click .task-state': 'toggleCompleted'
    },

    // listen to events from the model and re-rendering.
    initialize: function() {
      this.listenTo( this.model, 'change', this.render );
      this.listenTo( this.model, 'destroy', this.remove );
    },

    // re-render task item.
    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      this.$el.toggleClass( 'complete', this.model.get( 'completed' ) );
      this.$el.prop( 'id', 'task-' + this.model.get( 'id' ) );

      var graphReadonly = graph.isReadonly();
      graph.readonly( false );
      this.plot = this.plot || graph.plotTask( this.model.toJSON() );
      if( this.model.get( 'completed' ) ) {
        this.plot.addClass( 'complete' );
      }
      else {
        this.plot.removeClass( 'complete' );
      }
      graph.readonly( graphReadonly );

      return this;
    },

    toggleCompleted: function() {
      this.model.toggle();
    },

    // remove item everywhere
    clear: function() {
      this.model.destroy();
    }
  });
})( this, this.document, Backbone, _, jQuery );
