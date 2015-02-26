/* global Backbone, _, jQuery, graph, ESC_KEY */
var app = app || {};

(function( window, document, Backbone, _, $, undefined ) {
  'use strict';

  app.AppView = Backbone.View.extend({
    // bind to existing app skeleton
    el: '#minihowerApp',

    // collection this view uses
    collection: app.tasks,

    // delegate events for creating new items and clearing completed ones
    events: {
      'click #eisenhowerGraph > svg': 'promptOnClick',
      'click #createTask button[type=reset]': 'cancelOnClick',
      'keypress #createTask': 'cancelOnEscape',
      'submit #createTask': 'createOnSubmit'
    },

    // kick things off by loading anyhing in localstorage
    initialize: function() {
      this.$inputForm = this.$( '#createTask' );
      this.$input = this.$( '#description' );
      this.$inputIcon = this.$( '#icon' );
      this.$list = this.$( '#taskList' );

      this.listenTo( this.collection, 'add', this.addOne );
      this.listenTo( this.collection, 'reset', this.addAll );
      this.listenTo( this.collection, 'all', this.render );

      // prevent re-rendering of view for all models, just when the 'reset' event
      // is triggered at the end of the fetch
      this.collection.fetch( { reset: true } );
    },

    render: function() {
    },

    addOne: function( task ) {
      var view = new app.TaskView( { model: task } );
      this.$list.append( view.render().el );
    },

    addAll: function() {
      this.$list.html( '' );
      this.collection.each( this.addOne, this );
    },

    /*
      Prompt for new task on click
     */
    promptOnClick: function( event ) {
      // do nothing if graph is readonly
      if( graph.isReadonly() ) {
        this.closePrompt();
        this.promptOnClick( event );
        return;
      }

      var point = graph.eventPointToSVGPoint( event );
      this.plot = graph.plotTask( point );

      graph.readonly( true );

      this.$inputForm.slideDown( 400 );
      this.$input.focus();
    },

    closePrompt: function() {
      var self = this;
      self.plot.animate( 400 ).opacity( 0 ).after( function() {
        this.remove();
      });

      graph.readonly( false );

      self.$inputForm.slideUp( 400, function() {
        self.$inputForm[ 0 ].reset();
      });
    },

    cancelOnEscape: function( event ) {
      if( event.keyCode === ESC_KEY ) {
        this.closePrompt();
      }
    },

    cancelOnClick: function() {
      this.closePrompt();
    },

    /*
      Create new task
     */
    newAttributes: function() {
      // get details on the plot point
      var plotOptions = {};
      if( this.plot ) {
        plotOptions.color = this.plot.first().attr( 'fill' );
        plotOptions.icon = this.$inputIcon.val();
        plotOptions.x = this.plot.cx();
        plotOptions.y = this.plot.cy();
      }

      return _.extend({
        description: this.$input.val().trim(),
        completed: false
      }, plotOptions );
    },

    createOnSubmit: function( event ) {
      if( this.$input.val().trim() ) {
        this.collection.create( this.newAttributes() );
        this.closePrompt();
      }

      return false;
    }
  });
})( this, this.document, Backbone, _, jQuery );
