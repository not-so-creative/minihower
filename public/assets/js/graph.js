/* global SVG, _ */
/* exported graph */

var graph = (function( window, document, SVG, _, undefined ) {
  /**
   * Generate random pastel colour.
   *
   * @return {String} CSS stlye hex colour value
   */
  function randomColor() {
    var getVal = function() {
      return ( Math.round( Math.random() * 110 ) + 110 ).toString( 16 );
    };

    return '#' + getVal() + getVal() + getVal();
  }

  /**
   * SVG element wrapped in SVG.JS happiness
   * @type {SVG}
   */
  var graph = new SVG( 'eisenhowerGraph' ).attr({
    viewBox: '0 0 500 500',
    x: '0px',
    y: '0px',
    class: 'img-responsive'
  });

  /**
   * Graph readonly mode flag
   * @type {Boolean}
   */
  graph._readonly = false;

  /**
   * SVG group containing the graph's axes
   * @type {SVG.G}
   */
  var axes = graph.group();
  axes.add( graph.line( 20, 250, 480, 250 ).stroke( { width: 1, color: '#444' } ) );
  axes.add( graph.line( 250, 20, 250, 480 ).stroke( { width: 1, color: '#444' } ) );
  // add arrow heads
  axes.add( graph.path( 'M 250 20 C 254 28, 258 30, 252 32 L 250 31, 248 32 C 242 30, 246 28, 250 20 Z' ).style( { fill: '#444', stroke: '#444' } ) );
  axes.add( graph.path( 'M 480 250 C 472 254, 470 258, 468 252 L 469 250, 468 248 C 470 242, 472 246, 480 250 Z' ).style( { fill: '#444', stroke: '#444' } ) );

  /**
   * SVG group to contain all plot points
   * @type {SVG.G}
   */
  var plots = graph.group();

  /**
   * Creates a basic plot on the graph.
   *
   * @param  {Number} x         SVG x-coordinate for plot point
   * @param  {Number} y         SVG y-coordinate for plot point
   * @param  {Object} [options] Base options for a plot point
   * @return {SVG.G}            SVG group containing plot
   */
  function basicPlot( x, y, options ) {
    // in read only mode return empty object
    if( graph._readonly ) {
      return {};
    }

    // set options
    options = options || {};
    _.defaults( options, {
      color: randomColor(),
      icon: ''
    });

    // create plot
    var plot = graph.group().attr( 'class', 'plot' );
    plots.add( plot );

    // draw backing circle
    plot.add( graph.circle( 30 ).fill( options.color ) );
    // draw icon in center
    plot.add( graph.text( options.icon ).fill( '#ffffff' ).font( { family: 'FontAwesome' } ) );
    plot.last().center( plot.first().attr( 'cx' ), plot.first().attr( 'cy' ) );

    // move plot to correct location
    plot.center( x, y );

    return plot;
  }

  /**
   * Convert event (mouse or touch) location to SVG point
   *
   * @param  {Event} event Mouse or Touch event
   * @return {SVGPoint}    An SVG Point at click location
   */
  function eventPointToSVGPoint( event ) {
    // get a new svg point
    var point = graph.node.createSVGPoint();

    // set its x,y to click event's x,y
    point.x = event.clientX;
    point.y = event.clientY;

    // correct point x,y to account for difference between click origin
    // and svg origin points.
    point = point.matrixTransform( graph.node.getScreenCTM().inverse() );

    return point;
  }

  // return the graph extended with custom helper functions
  return _.extend( graph, {
    /**
     * Set graph readonly mode on/off
     *
     * @param  {Boolean} bool True for on, false for off
     */
    readonly: function( bool ) {
      graph._readonly = bool;
    },
    /**
     * Determine if readonly mode is on
     *
     * @return {Boolean} True for on
     */
    isReadonly: function() {
      return graph._readonly;
    },
    /**
     * Plot a task on the graph
     *
     * @param  {Task}  task Instance of the task model
     * @return {SVG.G}      SVG group that is a plot
     */
    plotTask: function( task ) {
      var plot = basicPlot( task.x, task.y, {
        color: task.color,
        icon: task.icon
      });

      return plot;
    },
    /**
     * Clear graph w/o affecting axes
     */
    clear: function() {
      plots.clear();
    },
    eventPointToSVGPoint: eventPointToSVGPoint
  });
})( window, window.document, SVG, _ );
