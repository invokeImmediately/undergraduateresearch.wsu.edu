/*******************************************************************************
 * JQUERY █▀▀▀▐▄ ▄▌▐▀█▀▌█▀▀▀ ▐▀▀▄ ▄▀▀▀ ▀█▀ ▄▀▀▄ ▐▀▀▄ ▄▀▀▀ ░░░░░░░░░░░░░░░░░░░▒▓█
 * ░░░░░░ █▀▀   █    █  █▀▀  █  ▐ ▀▀▀█  █  █  █ █  ▐ ▀▀▀█ ░░░░░░░░░░░░░░░░▒▓█
 * ░░░░░░ ▀▀▀▀▐▀ ▀▌  █  ▀▀▀▀ ▀  ▐ ▀▀▀  ▀▀▀  ▀▀  ▀  ▐ ▀▀▀  ░░░░░░░░░░░░░▒▓█
 *
 * @version 1.0.0
 *
 * @author Daniel Rieck
 *   [daniel.rieck@wsu.edu]
 *   (https://github.com/invokeImmediately)
 *
 * @license MIT Copyright (c) 2023 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a
 *     copy of this software and associated documentation files (the
 *     "Software"), to deal in the Software without restriction, including
 *     without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit
 *     persons to whom the Software is furnished to do so, subject to the
 *     following conditions:
 *   The above copyright notice and this permission notice shall be included in
 *     all copies or substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 *     OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 *     ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 *     OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

( function ( $, thisFileName ) {

'use strict';

/**
 * Checking function to verify that the passed argument is a valid CSS class.
 *
 * @since 1.0.0
 *
 * @param {*} possibleClass - Possible string consisting of a valid CSS class; could, in fact, be
 *   anything.
 */
$.isCssClass = function ( possibleClass ) {
  var cssClassNeedle = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
  var isClass;

  isClass = typeof possibleClass === 'string' && cssClassNeedle.test( possibleClass );

  return isClass;
}

/**
 * Checking function to verify that the passed argument is a valid jQuery object.
 *
 * @since 1.0.0
 *
 * @param {*} $obj - Possible jQuery object; could, in fact, be anything.
 */
$.isJQueryObj = function ( $obj ) {
  return ( $obj && ( $obj instanceof $ || $obj.constructor.prototype.jquery ) );
}

/**
 * Log an error using the browser console in JSON notation.
 *
 * @since 1.0.0
 *
 * @param {string} fileName - Name of the JS source file wherein the error was encountered.
 * @param {string} fnctnName - Name of the function that called $.logError.
 * @param {string} fnctnDesc - Description of what the calling function is supposed to do.
 * @param {string} errorMsg - Message that describes what went wrong within the calling function.
 */
$.logError = function ( fileName, fnctnName, fnctnDesc, errorMsg ) {
  var thisFuncName = "jQuery.logError";
  var thisFuncDesc = "Log an error using the browser console in JSON notation.";
  var bitMask = typeof fileName === "string";
  bitMask = ( typeof fnctnName === "string" ) | ( bitMask << 1 );
  bitMask = ( typeof fnctnDesc === "string" ) | ( bitMask << 1 );
  bitMask = ( typeof errorMsg === "string" || typeof errorMsg === "object" ) | ( bitMask << 1 );

  // Output a properly formed error message.
  if ( bitMask === 15 && typeof errorMsg === "string" ) {
    console.log( "error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName +
      "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};" );
    return;
  } else if ( bitMask === 15 ) {
    console.log( "error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName +
      "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terror object: See following.'\n\t};" );
    console.log( errorMsg );
    return;
  }

  // Handle the case where
  var incorrectTypings;
  var bitMaskCopy;
  var newErrorMsg;

  // Determine how many incorrectly typed arguments were encountered
  for ( var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++ ) {
    incorrectTypings += bitMaskCopy & 1;
    bitMaskCopy = bitMaskCopy >> 1;
  }

  // Construct a new error message
  if ( incorrectTypings == 1 ) {
    newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly typed argument.\n"
  } else {
    newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed arguments.\n"
  }
  newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n\t\tfileName = " + fileName + "\n";
  if ( !( ( bitMask & 8 ) >> 3 ) ) {
    newErrorMsg += "\t\ttypeof filename = " + ( typeof fileName ) + "\n";
    fileName = thisFileName;
  }
  newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
  if( !( ( bitMask & 4 ) >> 2 ) ) {
    newErrorMsg += "\t\ttypeof fnctnName = " + ( typeof fnctnName ) + "\n";
    fnctnName = thisFuncName;
  }
  newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
  if( !( ( bitMask & 2 ) >> 1 ) ) {
    newErrorMsg += "\t\ttypeof fnctnDesc = " + ( typeof fnctnDesc ) + "\n";
    fnctnDesc = thisFuncDesc;
  }
  newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
  if( !( bitMask & 1 ) ) {
    newErrorMsg += "\t\ttypeof errorMsg = " + ( typeof errorMsg ) + "\n";
  }
  console.log(newErrorMsg);
}

} )( jQuery, 'jQuery.daesa-custom.js' );

/*******************************************************************************
 * INTERACTIVE   █▀▀▀ █    ▀█▀ █▀▀▄ █▀▀▄ █▀▀▀ █▀▀▄  ░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█
 * ░░░░░ CONTENT █▀▀▀ █  ▄  █  █▄▄▀ █▄▄▀ █▀▀  █▄▄▀  ░░░░░░░░░░░░░░░░░░░░░░▒▓█
 * ░░░░░░░░░░░░░ ▀    ▀▀▀  ▀▀▀ █    █    ▀▀▀▀ ▀  ▀▄ ASSEMBLY ░░░░░░░░░░▒▓█
 *
 * @version 1.0.0
 *
 * @author Daniel Rieck
 *   [daniel.rieck@wsu.edu]
 *   (https://github.com/invokeImmediately)
 *
 * @license MIT Copyright (c) 2023 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a
 *     copy of this software and associated documentation files (the
 *     "Software"), to deal in the Software without restriction, including
 *     without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit
 *     persons to whom the Software is furnished to do so, subject to the
 *     following conditions:
 *   The above copyright notice and this permission notice shall be included in
 *     all copies or substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 *     OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 *     ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 *     OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

( function( $, thisFileName ) {

'use strict';

// TODO: Add inline documentation in JSDoc3 format.
// TODO: Convert to class-based implementation.
function initContentFlippers( slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration ) {
  // Set up initial state of content flippers and front and back panels.
  $( slctrCntntFlppr ).each( function() {
    // Set tabindex on flipper control.
    let $flipper = $( this );
    if ( !$flipper.attr( 'tabindex' ) || $flipper.attr( 'tabindex' ) != '0' ) {
      $flipper.attr( 'tabindex', '0' );
    }

    // Set role of flipper to button and pressed state to false.
    if ( !$flipper.attr( 'role' ) || !$flipper.attr( 'role' ) != 'button' ) {
      $flipper.attr( 'role', 'button' );
    }
    if ( !$flipper.attr( 'aria-pressed' ) || !$flipper.attr( 'aria-pressed' ) != 'false' ) {
      $flipper.attr( 'aria-pressed', 'false' );
    }

    // Set expansion state of front panel to expanded.
    let $front = $flipper.next( slctrFlppdFront );
    if ( !$front.attr( 'aria-expanded' ) || !$front.attr( 'aria-expanded' ) != 'true' ) {
      $front.attr( 'aria-expanded', 'true' );
    }

    // Set expansion state of back panel to collapsed.
    let $back = $front.next( slctrFlppdBack );
    if ( !$back.attr( 'aria-expanded' ) || !$back.attr( 'aria-expanded' ) != 'false' ) {
      $back.attr( 'aria-expanded', 'false' );
    }
  } );

  // Set up mouse click handler for content flippers.
  $( slctrCntntFlppr ).click( function () {
    // Toggle flipper's aria-pressed state.
    let $flipper = $( this );
    if( $flipper.attr( 'aria-pressed' ) == 'false' ) {
      $flipper.attr( 'aria-pressed', 'true' );
    } else {
      $flipper.attr( 'aria-pressed', 'false' );
    }

    // Toggle the front panel's state.
    let $front = $flipper.next( slctrFlppdFront );
    $front.toggle( animDuration );
    if( $front.attr( 'aria-expanded' ) == 'false' ) {
      $front.attr( 'aria-expanded', 'true' );
    } else {
      $front.attr( 'aria-expanded', 'false' );
    }

    // Toggle the back panel's state.
    let $back = $front.next( slctrFlppdBack );
    $back.fadeToggle( animDuration );
    if( $back.attr( 'aria-expanded' ) == 'false' ) {
      $back.attr( 'aria-expanded', 'true' );
    } else {
      $back.attr( 'aria-expanded', 'false' );
    }
  } );

  // Set up mouse click handler for content flippers' front panels, if appropriate.
  $( slctrFlppdFront ).click( function () {
    let $front = $( this );
    $front.toggle( animDuration );
    if( $front.attr( 'aria-expanded' ) == 'false' ) {
      $front.attr( 'aria-expanded', 'true' );
    } else {
      $front.attr( 'aria-expanded', 'false' );
    }

    let $back = $front.next( slctrFlppdBack );
    $back.fadeToggle( animDuration );
    if( $back.attr( 'aria-expanded' ) == 'false' ) {
      $back.attr( 'aria-expanded', 'true' );
    } else {
      $back.attr( 'aria-expanded', 'false' );
    }

    let $flipper = $front.prev(slctrCntntFlppr);
    if( $flipper.attr( 'aria-pressed' ) == 'false' ) {
      $flipper.attr( 'aria-pressed', 'true' );
    } else {
      $flipper.attr( 'aria-pressed', 'false' );
    }
  } );

  // Set up keydown handler for content flippers.
  $( slctrCntntFlppr ).on( 'keydown', function( e ) {
    let regExActKeys = /Enter| /g;
    if( regExActKeys.test( e.key ) ) {
      e.preventDefault();
      // Toggle flipper's aria-pressed state.
      let $flipper = $( this );
      if( $flipper.attr( 'aria-pressed' ) == 'false' ) {
        $flipper.attr( 'aria-pressed', 'true' );
      } else {
        $flipper.attr( 'aria-pressed', 'false' );
      }

      // Toggle the front panel's state.
      let $front = $flipper.next( slctrFlppdFront );
      $front.toggle( animDuration );
      if( $front.attr( 'aria-expanded' ) == 'false' ) {
        $front.attr( 'aria-expanded', 'true' );
      } else {
        $front.attr( 'aria-expanded', 'false' );
      }

      // Toggle the back panel's state.
      let $back = $front.next( slctrFlppdBack );
      $back.fadeToggle( animDuration );
      if( $back.attr( 'aria-expanded' ) == 'false' ) {
        $back.attr( 'aria-expanded', 'true' );
      } else {
        $back.attr( 'aria-expanded', 'false' );
      }
    }
  } );

  $( slctrCntntFlppr ).on( 'mouseleave', function( e ) {
    let $flipper = $( this );
    $flipper.trigger( 'blur' );
  } );
}

$( function () {
  initContentFlippers( ".content-flipper", ".flipped-content-front", ".flipped-content-back",
    500 );
} );

} )( jQuery, 'wsuwp-wds_custom-js-ed3r.prod5n.js' );


/*******************************************************************************
 * ANIMATED ░░░░░░░░ █▀▀▀ ▄▀▀▄ █    █    █▀▀▀ █▀▀▄ █  █ ░░░░░░░░░░░░░░░░░░░░░▒▓█
 * ░ DISTINGUISHED ░ █ ▀▄ █▄▄█ █  ▄ █  ▄ █▀▀  █▄▄▀ ▀▄▄█ WALL ░░░░░░░░░░░░░▒▓█
 * ░░░░ SCHOLARSHIPS ▀▀▀▀ █  ▀ ▀▀▀  ▀▀▀  ▀▀▀▀ ▀  ▀▄▄▄▄▀ ░ FEATURE ░░░░░▒▓█
 *
 * @version 1.0.0
 *
 * @author Daniel Rieck
 *   [daniel.rieck@wsu.edu]
 *   (https://github.com/invokeImmediately)
 *
 * @license MIT Copyright (c) 2023 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a
 *     copy of this software and associated documentation files (the
 *     "Software"), to deal in the Software without restriction, including
 *     without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit
 *     persons to whom the Software is furnished to do so, subject to the
 *     following conditions:
 *   The above copyright notice and this permission notice shall be included in
 *     all copies or substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 *     OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 *     ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 *     OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

( function ( $ ) {

"use strict";

/**
 * Create a new instance of an animated gallery wall object, which causes gallery wall headers to
 * pan back and forth.
 * 
 * @class
 *
 * @param {String} headerSlctr - jQuery selector for the header objects that will be animated.
 * @param {String} headerSlctr - jQuery selector for a header's container.
 * @param {Number} speed - The speed of the pan in pixels per second.
 * @param {Number} numPans - The number (> 0) of times the animation will pan forward and back.
 */
function AnimatedGalleryWall( headerSlctr, containerSlctr, speed, numPans ) {

  setUpAnimations();

  /**
   * Set up the panning animations for gallery wall headers.
   *
   * @private
   */
  function setUpAnimations() {
    var $headers;
    var $thisHeader;

    $headers = $( headerSlctr );
    if ( $headers.length > 0 ) {
      $headers.each( function() {
        $thisHeader = $( this );
        panHeader( $thisHeader );
      } );
    }   
  }

  /**
   * Cause a gallery wall header to pan back and forth according to prescribed settings.
   *
   * @private
   *
   * @param {jquery} $header - The jQuery object corresponding to the header in the DOM to be
   *     panned.
   */
  function panHeader( $header ) {
    var $container
    var cssData = new CssData( $header );
    var containerWidth;
    var headerWidth;
    var idx;
    var newLeftPos
    var panDuration;
    var stoppingPoint;
    var stoppingDuration;

    $container = $header.parent( containerSlctr );
    headerWidth = $header.width();
    containerWidth = $container.width();
    newLeftPos = -1 * headerWidth + containerWidth;
    panDuration = (headerWidth - containerWidth) / speed * 1000;
    try {
      stoppingPoint = cssData.getData('stop-at');
      if (stoppingPoint !== '') {
        stoppingPoint = parseInt(stoppingPoint, 10) * -1;
        stoppingDuration = -1 * stoppingPoint / speed * 1000;
      } else {
        stoppingPoint = 0;
      }
    } catch ( errorMsg ) {
      console.log( errorMsg );
      stoppingPoint = 0;
    }
    for (idx = 0; idx < numPans; idx++) {
      $header.animate( { left: newLeftPos }, panDuration ).animate( { left: 0 },
        panDuration );
    }
    $header.animate( { left: stoppingPoint }, stoppingDuration );
  }
}

/**
 * Set up a horizontal panning animation on the header of gallery wall pages.
 *
 * @param {String} headerSlctr - Selector for the header graphic that will be panned.
 * @param {String} containerSlctr - Selector for the container of the header graphic. This function
 *     assumes it has its overflow CSS property set to hidden.
 */
function animateGalleryWallHeader( headerSlctr, containerSlctr, duration, numPans ) {
  var animObj = new AnimatedGalleryWall( headerSlctr, containerSlctr, duration, numPans );
}

$( window ).on( 'load', function () {
  var selectors = {};
  selectors.galleryWall = '.page-header__gallery-wall-panorama';
  selectors.galleryWallContainer = '.page-header__gallery-wall-wrapper';
  animateGalleryWallHeader( selectors.galleryWall, selectors.galleryWallContainer, 132, 2 );
} );

} )( jQuery );

/*!*****************************************************************************
 * Legacy DAESA ▄▀▀▄ ▄▀▀▀ ▄▀▀▀ ▄▀▀▄ █▀▀▄ █▀▀▄ ▀█▀ ▄▀▀▄ ▐▀▀▄ ▄▀▀▀ ░░░░░░░░░░░░▒▓█
 * ░░░░░░░░░░░░ █▄▄█ █    █    █  █ █▄▄▀ █  █  █  █  █ █  ▐ ▀▀▀█ ░░░░░░░░░▒▓█
 * ░░░░░░░░░░░░ █  ▀  ▀▀▀  ▀▀▀  ▀▀  ▀  ▀▄▀▀▀  ▀▀▀  ▀▀  ▀  ▐ ▀▀▀  ░░░░░░▒▓█
 * jQuery.DaesaAccordions.js - v1.0.0
 * Script for implementing the interactive and persistent behaviors of DAESA accordions.
 * By Daniel C. Rieck (daniel.rieck@wsu.edu). See [GitHub](https://github.com/invokeImmediately/WSU-DAESA-JS/blob/main/jQuery.daesa-custom.js) for more info.
 * Copyright (c) 2022 Washington State University and governed by the MIT license.
 ******************************************************************************/

( function ( $, thisFileName ) {

'use strict';

////////////////////////////////////////////////////////////////////////////////
// DAESAACCORDION class

/**
 * Module for initializing accordions on DAESA websites.
 */
const DaesaAccordions = ( function( $, thisFileName ) {
  'use strict';

  /**
   * Constructor for DaesaAccordions.
   *
   * @since 1.0.0
   *
   * @param {object} sels - Collection of selectors to drop down toggles and their components.
   * @param {string} sels.toggles - Selector for isolating drop down toggle elements.
   * @param {string} sels.containers - Selector for isolating containers of drop down toggle
   *   elements.
   * @param {string} sels.targets - Selector for isolating the expandable targets of drop down
   *   toggle elements.
   * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
   *   causes it to enter an activated state.
   */
  function DaesaAccordions( sels, activatingClass ) {
    this.sels = sels;
    this.activatingClass = activatingClass;
  }

  /**
   * Check the state of the DaesaAccordions object's paremeters to ensure it was appropriately
   * constructed.
   *
   * @since 1.0.0
   *
   * @return {boolean} A boolean flag indicating whether the object is valid based on correctly
   *   typed and appropriately set arguments.
   */
  DaesaAccordions.prototype.isValid = function () {
    var stillValid;
    var props;

    // Check the integrity of the sels member.
    stillValid = typeof this.sels === 'object';
    if ( stillValid ) {
      props = Object.getOwnPropertyNames( this.sels );
      stillValid = props.length === 3 && props.find ( function( elem ) {
        return elem === 'toggles';
      } ) && props.find ( function( elem ) {
        return elem === 'containers';
      } ) && props.find ( function( elem ) {
        return elem === 'targets';
      } );
    }

    // Check the integrity of the activatingClass member.
    if ( stillValid ) {
      stillValid = typeof this.activatingClass === 'string' &&
        $.isCssClass( this. activatingClass);
    }

    return stillValid;
  }

  /**
   * Initialize drop down toggles to respond to user interaction.
   *
   * @since 1.0.0
   */
  DaesaAccordions.prototype.initialize = function () {
    var $containers;
    var $targets;
    var $toggles;
    var funcName = 'DaesaAccordions.prototype.initialize';
    var funcDesc = 'Initialize drop down toggles to respond to user interaction.'

    if ( this.isValid() ) {
      $containers = $( this.sels.containers );
      $toggles = $containers.find( this.sels.toggles );
      $targets = $containers.find( this.sels.targets );
      setTabIndices( $toggles );
      preventAnchorHighlighting( $toggles );
      effectToggleStatePermanence( $toggles, this.activatingClass );
      bindClickHandlers( $containers, this.sels.toggles, this.activatingClass,
        this.sels.targets );
      bindKeydownHandlers( $containers, this.sels.toggles, this.activatingClass,
        this.sels.targets );
      bindChildFocusHandlers( $targets, this.sels.targets, this.sels.toggles,
        this.activatingClass );
    } else {
      $.logError( thisFileName, funcName, funcDesc, 'I was not constructed with valid' +
        'arguments. Here\'s what I was passed:\nthis.sels.toString() = ' +
        this.sels.toString() + '\nthis.activatingClass.toString() = ' +
        this.activatingClass.toString() );
    }
  }

  /**
   * Bind a handler to ensure that a drop down toggle has been activated if one of its child
   * elements receives focus.
   *
   * @since 1.0.0
   *
   * @param {jquery} $containers - Collection of the containers which may contain drop down
   *   toggles.
   * @param {string} selToggles - Selector string for isolating drop down toggle elements within
   *   the provided collection of containers.
   * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
   *   causes it to enter an activated state.
   */
  function bindChildFocusHandlers( $targets, selTargets, selToggles, activatingClass ) {
    $targets.on( 'focusin', '*', function () {
      var $parentTargets;
      var $this;

      $this = $( this );
      $parentTargets = $this.parents( selTargets );
      $parentTargets.each( function() {
        var $thisTarget = $( this );
        var $toggle = $thisTarget.prev( selToggles );
        $toggle.addClass( activatingClass );
        setUpToggleStatePermanence( $toggle, activatingClass );
        handleCascadingChildren( $thisTarget );
      } );
    } );
  }

  /**
   * Bind a click handler to drop down toggles that enables the user to interact with them using
   * mouse input.
   *
   * @since 1.0.0
   *
   * @param {jquery} $containers - Collection of the containers which may contain drop down
   *   toggles.
   * @param {string} selToggles - Selector string for isolating drop down toggle elements within
   *   the provided collection of containers.
   * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
   *   causes it to enter an activated state.
   */
  function bindClickHandlers( $containers, selToggles, activatingClass, selTargets ) {
    var $this;

    $containers.on( 'click', selToggles, function () {
      $this = $( this );
      $this.blur();
      $this.toggleClass( activatingClass );
      setUpToggleStatePermanence( $this, activatingClass );
      handleCascadingChildren( $this.next( selTargets ) );
    } );
  }

  /**
   * Bind a keydown handler to drop down toggles that enables the user to interact with them using
   * keyboard input.
   *
   * @since 1.0.0
   *
   * @param {jquery} $containers - Collection of the containers which may contain drop down
   *   toggles.
   * @param {string} selToggles - Selector string for isolating drop down toggle elements within
   *   the provided collection of containers.
   * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
   *   causes it to enter an activated state.
   */
  function bindKeydownHandlers( $containers, selToggles, activatingClass, selTargets ) {
    $containers.on( 'keydown', selToggles, function ( e ) {
      var $this;
      var reActivatingKeys = /Enter| /g;

      if ( reActivatingKeys.test( e.key ) ) {
        e.preventDefault();
        $this = $ ( this );
        $this.toggleClass( activatingClass );
        setUpToggleStatePermanence( $this, activatingClass );
        handleCascadingChildren( $this.next( selTargets ) );
      }
    } );
  }

  /**
   * During page load, set the expansion state of drop down toggle elements based on previous user
   * interactions during the session.
   *
   * @since 1.0.0
   *
   * @param {jquery} $toggles - Collection of the drop down toggle elements within the page.
   * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
   *   causes it to enter an activated state.
   */
  function effectToggleStatePermanence( $toggles, activatingClass ) {
    var $this;
    var state;
    var thisFuncName = "effectDropDownTogglePermanence";
    var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element based on previous user interactions during the session.";

    $toggles.each( function() {
      $this = $( this );
      if ( $this[0].id ) {
        try {
          state = sessionStorage.getItem( $this[0].id );
          if ( state == "expanded" ) {
            $this.toggleClass( activatingClass );
          }
        } catch( e ) {
          $.logError( thisFileName, thisFuncName, thisFuncDesc, e.message );
        }
      } else {
        $.logError( thisFileName, thisFuncName, thisFuncDesc,
          "No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected." );
      }
    } );
  }

  /**
   * Handle the process of updating the layout of cascading children of a toggled container.
   *
   * @since 1.0.0
   *
   * @param {jquery} $container - The container that has been toggled.
   */
  function handleCascadingChildren( $container ) {
    var $cascaded = $container.find( '.cascaded-layout' );
    if ( $cascaded.length < 1 ) {
      return;
    }
    setTimeout( function() {
      $cascaded.masonry( 'layout' );
    }, 1000 );
  }

  /**
   * Apply a CSS class that keeps anchor highlighting styles from being applied to drop down
   * toggles.
   *
   * @since 1.0.0
   *
   * @param {jquery} $toggles - Collection of the drop down toggle elements within the page.
   */
  function preventAnchorHighlighting( $toggles ) {
    $toggles.addClass( 'no-anchor-highlighting' );
  }

  /**
   * Ensure that drop down toggles are properly included in the web page's tab order.
   *
   * @since 1.0.0
   *
   * @param {jquery} $toggles - Collection of the drop down toggle elements within the page.
   */
  function setTabIndices( $toggles ) {
    $toggles.attr( 'tabindex', 0 );
  }

  /**
   * Cause expansion state of drop down toggles to be remembered during the session.
   *
   * @since 1.0.0
   *
   * @param {jquery} $toggles - Collection of the drop down toggle elements within the page.
   * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
   *   causes it to enter an activated state.
   */
  function setUpToggleStatePermanence( $toggle, activatingClass ) {
    var state;
    var thisFuncName = 'setUpToggleStatePermanence';
    var thisFuncDesc = 'Records the expansion state of a drop down toggle element in local' +
      ' storage to later effect permanence.';

    if ( $toggle[0].id ) {
      try {
        state = $toggle.hasClass( activatingClass ) ? 'expanded' : 'collapsed';
        sessionStorage.setItem( $toggle[0].id, state );
      } catch( e ) {
        $.logError( thisFileName, thisFuncName, thisFuncDesc, e.message );
      }
    } else {
      $.logError( thisFileName, thisFuncName, thisFuncDesc, 'No ID was set for this drop' +
        ' down toggle element; thus, expansion state permanence cannot be effected.' );
    }
  }

  return DaesaAccordions;
} )( jQuery, 'jQuery.DaesaAccordions.js' );

////////////////////////////////////////////////////////////////////////////////
// INITIALIZATION of accordions

/**
 * Initialize drop down toggle elements to respond to user interaction.
 *
 * @since 1.0.0
 *
 * @param {string} selToggles - Selector string for isolating drop down toggle elements.
 * @param {string} selContainers - Selector string for isolating containers that may contain drop
 *   down toggle elements.
 * @param {string} activatingClass - CSS class that, when applied to a drop down toggle element,
 *   causes it to enter an activated state.
 */
function initDaesaAccordions( selToggles, selContainers, selTargets, activatingClass ) {
  const daesaAccordions =  new DaesaAccordions( {
    toggles: selToggles,
    containers: selContainers,
    targets: selTargets
  }, activatingClass );
  daesaAccordions.initialize();
}

////////////////////////////////////////////////////////////////////////////////
// Code execution TRIGGERED BY DOM LOADING

$( function () {
  const argsList = {};  // List of arguments that will be passed to functions
  let args;             // List of arguments currently being utilized ///////
  argsList.initDaesaAccordions = {
    selToggles: ".drop-down-toggle",
    selContainers: ".wsu-column",
    selTargets: ".toggled-panel",
    activatingClass: "activated",
  };
  args = argsList.initDaesaAccordions;
  initDaesaAccordions( args.selToggles, args.selContainers, args.selTargets, args.activatingClass );
} );

} )( jQuery, 'jQuery.DaesaAccordions.js' );

/*!*****************************************
 * vanilla.classicScrollbarPatch.js - v0.0.0
 * Resolve compatibility issues between the WDS 2.0 theme and operating systems/web browsers using classic scrollbars.
 * By Daniel C. Rieck (daniel.rieck@wsu.edu) [https://github.com/invokeImmediately/]
 * Copyright (c) 2023 Washington State University and governed by the MIT license.
 ******/
( function( sbwCssVarNm ) {
    let sbwSet = false;

    function getScrollbarWidth() {

        // —» Create an invisible container and force it to have a scrollbar. «—
        const outerBox = document.createElement('div');
        outerBox.style.visibility = 'hidden';
        outerBox.style.overflow = 'scroll';
        document.body.appendChild( outerBox );

        // —» Add an inner element to the outer container that overflows it. «—
        const innerBox = document.createElement( 'div' );
        outerBox.appendChild( innerBox );

        // —» Use the difference in client rectangle widths to infer scrollbar width. (Overlay scrollbars have a width of zero.) «—
        const sbw = ( outerBox.offsetWidth - innerBox.offsetWidth );

        // —» Remove the above measurement containers from the DOM and return the scrollbar width. «—
        outerBox.parentNode.removeChild( outerBox );

        return sbw;
    }
    
    function setSbWidth4Doc( evt ) {
        console.log( 'Checking scrollbar width.' );
        if ( sbwSet ) {
            return;
        } else {
            sbwSet = true;
        }
        const sbw = getScrollbarWidth();
        if ( sbw > 0 ) {
            document.documentElement.style.setProperty( sbwCssVarNm, sbw.toString() + "px" );
        }
    }
    
    window.addEventListener( 'DOMContentLoaded', setSbWidth4Doc );
} )( '--scrollbar-w' );

/*!***************************************
 * jQuery.tribe-events-wds-fix.js - v0.0.0
 * Resolve compatibility issues between the WDS 2.0 theme for WSUWP and the Tribe Events calendar plugin.
 * By Daniel C. Rieck (daniel.rieck@wsu.edu) [https://github.com/invokeImmediately/]
 * Copyright (c) 2023 Washington State University and governed by the MIT license.
 ******/
( function( $ ) {
    function fixMissingH1TECTxt( $body ) {
        if ( !$body.hasClass( 'post-type-archive-tribe_events' ) ) {
            return;
        }
        const $h1 = $body.find( '#wsu-content' ).find( '.wsu-article-header__title' );
        if ( $h1.text() == "" ) {
            $h1.text( 'Events Calendar' );
        }
    }

    $( 'body' ).each( function() {
        const $body = $( this );
        fixMissingH1TECTxt( $body );
    } );
} )( jQuery );

/*!*************************************
 * fix-wds-accordion-nesting.js - v0.0.0
 * Restore collapse functionality to nested accordions used on WDS 2.0 themed WSUWP websites.
 * By Daniel C. Rieck (daniel.rieck@wsu.edu) [https://github.com/invokeImmediately/]
 * Copyright (c) 2022 Washington State University and governed by the MIT license.
 ******/
( function( $ ) {

    /**
     * Use CSS classes to collapse an expanded WDS accordion component.
     */
    function collapseNestedAccrdn( $accordion ) {
        if ( $accordion.hasClass( 'wsu-accordion--open' ) ) {
            $accordion.removeClass( 'wsu-accordion--open' );
      }
    }

    /**
     * Signal to screen readers that a tested accordion has been expanded via WAI-ARIA.
     */
    function sgnlExpandedNestedAccrdn( $toggle ) {
        if ( $toggle.attr( "aria-expanded" ) != "true" ) {
            $toggle.attr( "aria-expanded", "true" );
        }
    }

    /**
     * Enhance event handling to fix issues with collapsible behavior of WDS accordion components.
     */
    function fixNestedAccrdnTggls( $main ) {
        $main.on( 'click', '.wsu-accordion .wsu-accordion .wsu-accordion--toggle', function() {
            const $toggle = $( this );
            $prntAccrdn = $toggle.parents( '.wsu-accordion' ).first();
            if ( $prntAccrdn.hasClass( 'wsu-accordion--open' ) ) {
                setTimeout( collapseNestedAccrdn, 200, $prntAccrdn );
            } else {
                setTimeout( sgnlExpandedNestedAccrdn, 200, $toggle );
            }
        } );
        $main.on( 'click', '.wsu-card .wsu-accordion .wsu-accordion--toggle', function() {
            const $toggle = $( this );
            $prntAccrdn = $toggle.parents( '.wsu-accordion' ).first();
            if ( $prntAccrdn.hasClass( 'wsu-accordion--open' ) ) {
                setTimeout( collapseNestedAccrdn, 200, $prntAccrdn );
            } else {
                setTimeout( sgnlExpandedNestedAccrdn, 200, $toggle );
            }
        } );
        $main.on( 'click', '.wsu-accordion .wsu-accordion--toggle strong', function() {
            const $toggle = $( this ).parents( '.wsu-accordion--toggle' ).first();
            $prntAccrdn = $toggle.parents( '.wsu-accordion' ).first();
            $toggle.trigger( 'click' );
            /*if ( $prntAccrdn.hasClass( 'wsu-accordion--open' ) ) {
                setTimeout( collapseNestedAccrdn, 200, $prntAccrdn );
            } else {
                setTimeout( sgnlExpandedNestedAccrdn, 200, $toggle );
            }*/
        } );
    }
    
    /**
     * Begin IIFE execution by checking for nested accordions, whose interactive behavior currently needs to be fixed through JS intervention.
     */
    function iifeMain() {
      $( '#wsu-content' ).each( function() {
          const $main = $( this );
          fixNestedAccrdnTggls( $main );
      } );
    }

    iifeMain();
} )( jQuery );

/*!***************************************
 * jQuery.daesa-custom.js - v1.1.5-rc1.0.0
 * Custom JS code common to all websites of the Division of Academic Engagement and Student Achievement (DAESA) in the Office of the Provost at Washington State University (WSU).
 * By Daniel C. Rieck (daniel.rieck@wsu.edu). See [GitHub](https://github.com/invokeImmediately/WSU-DAESA-JS/blob/main/jQuery.daesa-custom.js) for more info.
 * Copyright (c) 2022 Washington State University and governed by the MIT license.
 ******/

( function ( $, thisFileName ) {

'use strict';

/**
 * Checking function to verify that the passed argument is a valid CSS class.
 *
 * @since 1.0.0
 *
 * @param {*} possibleClass - Possible string consisting of a valid CSS class; could, in fact, be
 *   anything.
 */
$.isCssClass = function ( possibleClass ) {
  var cssClassNeedle = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
  var isClass;

  isClass = typeof possibleClass === 'string' && cssClassNeedle.test( possibleClass );

  return isClass;
}

/**
 * Checking function to verify that the passed argument is a valid jQuery object.
 *
 * @since 1.0.0
 *
 * @param {*} $obj - Possible jQuery object; could, in fact, be anything.
 */
$.isJQueryObj = function ( $obj ) {
  return ( $obj && ( $obj instanceof $ || $obj.constructor.prototype.jquery ) );
}

/**
 * Log an error using the browser console in JSON notation.
 *
 * @since 1.0.0
 *
 * @param {string} fileName - Name of the JS source file wherein the error was encountered.
 * @param {string} fnctnName - Name of the function that called $.logError.
 * @param {string} fnctnDesc - Description of what the calling function is supposed to do.
 * @param {string} errorMsg - Message that describes what went wrong within the calling function.
 */
$.logError = function ( fileName, fnctnName, fnctnDesc, errorMsg ) {
  var thisFuncName = "jQuery.logError";
  var thisFuncDesc = "Log an error using the browser console in JSON notation.";
  var bitMask = typeof fileName === "string";
  bitMask = ( typeof fnctnName === "string" ) | ( bitMask << 1 );
  bitMask = ( typeof fnctnDesc === "string" ) | ( bitMask << 1 );
  bitMask = ( typeof errorMsg === "string" || typeof errorMsg === "object" ) | ( bitMask << 1 );

  // Output a properly formed error message.
  if ( bitMask === 15 && typeof errorMsg === "string" ) {
    console.log( "error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName +
      "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};" );
    return;
  } else if ( bitMask === 15 ) {
    console.log( "error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName +
      "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terror object: See following.'\n\t};" );
    console.log( errorMsg );
    return;
  }

  // Handle the case where
  var incorrectTypings;
  var bitMaskCopy;
  var newErrorMsg;

  // Determine how many incorrectly typed arguments were encountered
  for ( var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++ ) {
    incorrectTypings += bitMaskCopy & 1;
    bitMaskCopy = bitMaskCopy >> 1;
  }

  // Construct a new error message
  if ( incorrectTypings == 1 ) {
    newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly typed argument.\n"
  } else {
    newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed arguments.\n"
  }
  newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n\t\tfileName = " + fileName + "\n";
  if ( !( ( bitMask & 8 ) >> 3 ) ) {
    newErrorMsg += "\t\ttypeof filename = " + ( typeof fileName ) + "\n";
    fileName = thisFileName;
  }
  newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
  if( !( ( bitMask & 4 ) >> 2 ) ) {
    newErrorMsg += "\t\ttypeof fnctnName = " + ( typeof fnctnName ) + "\n";
    fnctnName = thisFuncName;
  }
  newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
  if( !( ( bitMask & 2 ) >> 1 ) ) {
    newErrorMsg += "\t\ttypeof fnctnDesc = " + ( typeof fnctnDesc ) + "\n";
    fnctnDesc = thisFuncDesc;
  }
  newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
  if( !( bitMask & 1 ) ) {
    newErrorMsg += "\t\ttypeof errorMsg = " + ( typeof errorMsg ) + "\n";
  }
  console.log(newErrorMsg);
}

} )( jQuery, 'jQuery.daesa-custom.js' );


/*!*************************************************************************************************
 * ▄▀▀▀ █  █ ▐▀▄▀▌█▀▀▄ █▀▀▀ ▄▀▀▀    ▄▀▀▀ █  █ ▄▀▀▀▐▀█▀▌▄▀▀▄ ▐▀▄▀▌      █ ▄▀▀▀
 * ▀▀▀█ █  █ █ ▀ ▌█▄▄▀ █▀▀  ▀▀▀█ ▀▀ █    █  █ ▀▀▀█  █  █  █ █ ▀ ▌   ▄  █ ▀▀▀█
 * ▀▀▀   ▀▀  █   ▀▀  ▀▄▀▀▀▀ ▀▀▀      ▀▀▀  ▀▀  ▀▀▀   █   ▀▀  █   ▀ ▀ ▀▄▄█ ▀▀▀
 * 
 * Custom JS code written specifically for the WSUWP website of the [Summer Undergraduate Research
 * program](https://summerresearch.wsu.edu).
 *
 * @version 1.0.0-rc0.0.1
 * 
 * @author Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/surca.wsu.edu/blob/master/JS/sumres-custom.js
 * @license MIT - Copyright (c) 2021 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the “Software”), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
 *     the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

/**
 * An IIFE that contains custom JS code specific to summerresearch.wsu.edu.
 * 
 * @param {object} $: Alias for the jQuery interface.
 */
( function( $ ) {

'use strict';

/**
 * Stores jQuery objects for gravity form fields to be autofileld with a mentor's correct name
 * and email.
 *
 * @class
 *
 * @param {string} selectionMade:   The mentor/project selected by the user.
 * @param {Object} $emailInputBox:  jQuery object for the mentor's hidden email field on the form.
 * @param {Object} $nameInputBox:   jQuery object for the mentor's hidden name field on the form.
 */
var FieldsToFill = function ( selectionMade, $emailInputBox, $nameInputBox ) {
  this.selectionMade = typeof selectionMade === "string" ?
    selectionMade :
    "";
  this.$emailInputBox = $.isJQueryObj($emailInputBox) ?
    $emailInputBox :
    $();
  this.$nameInputBox = $.isJQueryObj($nameInputBox) ?
    $nameInputBox :
    $();
}

FieldsToFill.prototype.isValid = function () {
  return this.$emailInputBox.length > 0 && this.$nameInputBox.length > 0;
}

/**
 * Minimizes user input errors by automatically filling in hidden fields for a research mentor's
 * name and email.
 *
 * @param {string}  slctrSelectBox    Selector string for matching the mentor/project selection
 *                    box on the form.
 * @param {string}  slctrHiddenFields Selector string for matching the hidden fields for the
 *                    mentor's name and email address.
 */
function initFacultyEmailAutoEntry(slctrSelectBox, slctrHiddenFields) {
  var $selectField;       // jQuery object: the drop-down selection field through which the user
                          //   chooses their project.

  var $emailField;        // jQuery object: a hidden email field that is the immediate sibling
                          //   following the visible selection field in the DOM.

  var $facultyNameField;  // jQuery object: a hidden text input field that is the immediate sibling
                          //   following the hidden email field in the DOM; stores mentor's name.

  var $selectBox;         // jQuery object: the input element within the project selection field
                          //   that is visible to the user.

  var $emailInputBox;     // jQuery object: the input element within the mentor's email field which
                          //   is hidden from the user.

  var $nameInputBox;      // jQuery object: the input element within the mentor's name field which
                          //   is hidden from the user.

  var selectionMade;      // Holds the value of the project selected by the user.

  var fieldsToFill;       // Object representing the form fields to be automatically filled by JS.

  // If it exists on the page, find the project selection field and bind its change event to a
  //   function that automatically populates hidden fields that store the mentor's contact email and
  //   name.
  $( slctrSelectBox ).each( function () {
    $selectField = $( this ) ;
    $emailField = $selectField.next( slctrHiddenFields );
    if ( $emailField.length > 0 ) {
      $facultyNameField = $emailField.next( slctrHiddenFields );
      if ( $facultyNameField.length > 0 ) {
        $selectBox = $selectField.find( "select" ).first();
        $emailInputBox = $emailField.
          find( "input[type='hidden']" ).
          first();
        $nameInputBox = $facultyNameField.
          find( "input[type='hidden']" ).
          first();

        // Initialize the field just in case.
        fieldsToFill = new FieldsToFill(
          $selectBox.val(),
          $emailInputBox,
          $nameInputBox
        );
        fillHiddenFields( fieldsToFill );

        // Setup an event handler for when the user changes the selection.
        $selectBox.change( function() {
          selectionMade = $( this ).val();
          fieldsToFill = new FieldsToFill(
            selectionMade,
            $emailInputBox,
            $nameInputBox
          );
          fillHiddenFields( fieldsToFill );
        } );     
      }
    }
  } );
}


function fillHiddenFields(fieldsToFill) {
  if( fieldsToFill instanceof FieldsToFill && fieldsToFill.isValid() ) {
    switch( fieldsToFill.selectionMade ) {
      case "AgAID Institute Summer Undergraduate Research (Jordan Jobe)":
        fieldsToFill.$emailInputBox.val( "jordan.jobe@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Jordan" );
        break;
      case "Cybersecurity Summer 2023 Two-week Workshop (Bernard Van Wie)":
        fieldsToFill.$emailInputBox.val( "bvanwie@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Bernie" );
        break;
      case "Environmental Engineering: Measurements and Modeling in the Pacific Northwest (Shelley Pressley)":
        fieldsToFill.$emailInputBox.val( "spressley@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Shelley" );
        break;
      case "Hemp Research Internship (David R. Gang)":
        fieldsToFill.$emailInputBox.val( "gangd@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "David" );
        break;
      case "Improving Crop Resiliency: Agriculture in Changing Climate (Matthew Peck and Andrei Smertenko)":
        fieldsToFill.$emailInputBox.val( "andrei.smertenko@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Andrei and Matthew" );
        break;
      case "Phenomics Big Data Management (Sindhuja Sankaran)":
        fieldsToFill.$emailInputBox.val( "sindhuja.sankaran@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Sindhuja" );
        break;
      case "Plant Cell Biology and Biochemistry (Andrei Smertenko)":
        fieldsToFill.$emailInputBox.val( "andrei.smertenko@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Andrei" );
        break;
      case "Research in Interdisciplinary STEM Education (RISE) (Erika Offerdahl)":
        fieldsToFill.$emailInputBox.val( "erika.offerdahl@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Erika" );
        break;
      case "Stakeholder Informed Modeling of Innovations in the FEW (Julie Padowski)":
        fieldsToFill.$emailInputBox.val( "julie.padowski@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Julie" );
        break;
      case "Sustainable High-value Horticulture and Processing (Doug Collins)":
        fieldsToFill.$emailInputBox.val( "dpcollins@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Doug" );
        break;
      case "Waves in the Universe and Technology (Brian Collins)":
        fieldsToFill.$emailInputBox.val( "brian.collins@wsu.edu" );
        fieldsToFill.$nameInputBox.val( "Brian" );
        break;
      default:
        fieldsToFill.$emailInputBox.val("");
        fieldsToFill.$nameInputBox.val("");
    }
  }
}

/**
 * Binds a series of execution statements to window loaded event.
 */
$( window ).on( "load", function() {
  initFacultyEmailAutoEntry(".gfield.sets-faculty-email", ".gform_hidden");
} );
   
} )( jQuery );

/*!*************************************************************************************************
 *    █ ▄▀▀▄ █  █ █▀▀▀ █▀▀▄ █  █   █▀▀▀ ▄▀▀▄ █▀▀▄ ▐▀▄▀▌▄▀▀▀      █ ▄▀▀▀
 * ▄  █ █  █ █  █ █▀▀  █▄▄▀ ▀▄▄█   █▀▀▀ █  █ █▄▄▀ █ ▀ ▌▀▀▀█   ▄  █ ▀▀▀█
 * ▀▄▄█  ▀█▄  ▀▀  ▀▀▀▀ ▀  ▀▄▄▄▄▀ ▀ ▀     ▀▀  ▀  ▀▄█   ▀▀▀▀  ▀ ▀▄▄█ ▀▀▀
 *
 * Enhancements mediated by jQuery to dynamic behavior of Gravity Forms and intended for Washington
 *   State University (WSU) websites built in the WSU WordPress platform. Designed especially for
 *   the websites of the Division of Academic Engagement and Student Achievement.
 *
 * @version 1.1.0
 *
 * @author Daniel C. Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/WSU-DAESA-JS/blob/master/jQuery.forms.js
 * @license MIT - Copyright (c) 2022 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the “Software”), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 *     Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gravity Forms enhancement modules........................................................51
//   §1.1: EmailConfirmations class.............................................................54
//     §1.1.1: Public properties................................................................78
//     §1.1.2: Public methods...................................................................95
//   §1.2: OueGFs class........................................................................127
//     §1.2.1: Public properties...............................................................144
//     §1.2.2: Public methods..................................................................173
//     §1.2.3: Lexically scoped supporting functions...........................................200
//   §1.2: WsuIdInputs class...................................................................227
//     §1.3.1: Public properties...............................................................247
//     §1.3.2: Public methods..................................................................262
//     §1.3.3: Lexically scoped supporting functions...........................................359
// §2: Application of OUE-wide Gravity Forms enhancements......................................384
//   §2.1: Application of OueGFs module........................................................390
//   §2.2: Binding of handlers to Gravity Forms post-render event..............................398
//   §2.3: Function declarations...............................................................417
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gravity Forms enhancement modules

//////////
//// §1.1: EmailConfirmations class

/**
 * Gravity Forms enhancement module for preventing the user from pasting input into email
 * confirmation fields.
 *
 * Keeps users from being lazy and circumventing the mistake prevention effects of having to
 * explicitly enter emails twice.
 *
 * @class
 */
var EmailConfirmations = ( function( $ ) {

  'use strict';

  /**
   * Constructor for EmailConfirmations.
   *
   * @param {string} selGField - Selects the Gravity Form field containing the input in which the
   *     email and its confirmation will be entered.
   */
  function EmailConfirmations( selGfield ) {

//////////////
////// §1.1.1: Public properties

    /**
     * The collection of selectors used to find inputs accepting emails and email confirmations
     * in the DOM.
     *
     * @public
     */
    this.sels = {
      gform: '.gform_wrapper',
      gfield: selGfield,
      inputs: ".ginput_right input[type='text']"
    };

  }

//////////////
////// §1.1.2: Public methods

  /**
   * Initializes the event handling that will prevent misuse of the email confirmation field.
   *
   * @public
   */
  EmailConfirmations.prototype.init = function () {
    var $forms = $( this.sels.gform );
    var inputSel = this.sels.gfield + ' ' + this.sels.inputs;

    if ( $forms.length ) {
      $forms.on( 'paste', inputSel, this.onPaste );
    }
  };

  /**
   * Handler for paste events triggered in inputs accepting email confirmations.
   *
   * @public
   *
   * @param {Event} e - Contains information about the paste event.
   */
  EmailConfirmations.prototype.onPaste = function ( e ) {
    e.stopPropagation();
    e.preventDefault();
  };

  return EmailConfirmations;
} )( jQuery );

//////////
//// §1.2: OueGFs

/**
 * Module for adding enhancements to Gravity Forms found on OUE websites.
 *
 * @class
 */
var OueGFs = ( function( $ ) {

  'use strict';

  /**
   * Constructor for OueGFs.
   */
  function OueGFs() {

//////////////
////// §1.2.1: Public properties

    /**
     * Collection of selectors used to find form elements in the DOM.
     *
     * @public
     */
    this.selectors = {
      gforms: '.gform_wrapper',
      wsuIds: '.gf-is-wsu-id',
      emailConfirmations: '.ginput_container_email'
    };

    /**
     * Module for enhancing form inputs that accept WSU ID numbers.
     *
     * @public
     */
    this.wsuIds = null;

    /**
     * Module for enhancing to form inputs that accept WSU ID numbers.
     *
     * @public
     */
    this.emailConfirmations = null;
  }

//////////////
////// §1.2.2: Public methods

  /**
   * Initialize Gravity Forms found on the page.
   *
   * @public
   */
  OueGFs.prototype.init = function () {
    this.completeDomLoadedTasks();
  };

  /**
   * Perform Gravity Forms intialization steps that should take place once the DOM has loaded.
   *
   * @public
   */
  OueGFs.prototype.completeDomLoadedTasks = function () {
    var instance = this;
    $( function () {
      if ( $( instance.selectors.gforms ).length ) {
        initEmailConfirmations( instance );
        initWsuIdInputs( instance );
      }
    } );
  };

//////////////
////// §1.2.3: Lexically scoped supporting functions

  /**
   * Initialize inputs accepting WSU ID numbers.
   *
   * @param {OueGFs} obj - An OueGFs instance that needs to be initialized.
   */
  function initEmailConfirmations( obj ) {
    obj.emailConfirmations = new EmailConfirmations( obj.selectors.emailConfirmations );
    obj.emailConfirmations.init();
  }

  /**
   * Initialize inputs accepting WSU ID numbers.
   *
   * @param {OueGFs} obj - An OueGFs instance that needs to be initialized.
   */
  function initWsuIdInputs( obj ) {
    obj.wsuIds = new WsuIdInputs( obj.selectors.wsuIds );
    obj.wsuIds.init();
  }

  return OueGFs;

} )( jQuery );

//////////
//// §1.3: WsuIdInputs

/**
 * Provides RegEx mediated validation of gravity form inputs that accept WSU ID numbers.
 *
 * @class
 */
var WsuIdInputs = ( function ( $ ) {

  'use strict';

  /**
   * Constructor for WsuIdInputs class.
   *
   * @param {string} selGField - Selects the Gravity Form field containing the input in which the
   *     WSU ID number will be entered.
   */
  function WsuIdInputs( selGfield ) {

//////////////
////// §1.3.1: Public properties

    /**
     * The collection of selectors used to find inputs accepting WSU ID numbers in the DOM.
     *
     * @public
     */
    this.sels = {
      gform: '.gform_wrapper',
      gfield: selGfield,
      inputs: "input[type='text']"
    };
  }

//////////////
////// §1.3.2: Public methods

  /**
   * Initializes RegEx mediated validation of inputs accepting WSU ID numbers.
   *
   * @public
   */
  WsuIdInputs.prototype.init = function () {
    var $forms = $( this.sels.gform );
    var inputSel = this.sels.gfield + ' ' + this.sels.inputs;

    $forms.on( 'blur', inputSel, this.onBlur );
    $forms.on( 'keydown', inputSel, this.onKeydown );
    $forms.on( 'paste', inputSel, this.onPaste );
  };

  /**
   * Handler for blur events triggered in inputs accepting WSU ID numbers.
   *
   * @private
   *
   * @param {Event} e - Contains information about the blur event.
   */

  WsuIdInputs.prototype.onBlur = function( e ) {
    var $this = $( this );
    var inputText = $this.val();
    var frep = getFinalRegExPattern();

    if ( inputText != '' ) {
      if ( frep.exec( inputText ) == null ) {
        $this.val( '' );
        alert( 'The WSU ID you entered did not follow the correct pattern; please try' +
          ' again. When the leading zero is included, WSU ID numbers are 9 digits long.' +
          ' You can also drop the leading zero and enter in 8 digits.' );
      }
    }
  };

  /**
   * Handler for keydown events triggered in inputs accepting WSU ID numbers.
   *
   * @public
   *
   * @param {Event} e - Contains information about the keydown event.
   */
  WsuIdInputs.prototype.onKeydown = function ( e ) {
    var $this = $( this );
    var inputText = $this.val();
    var akc = getAcceptableKeyCodes();

    if ( ( e.keyCode < 48 || ( e.keyCode > 57 && e.keyCode < 96 ) || e.keyCode > 105 )
        && !~akc.indexOf( e.keyCode ) && !( e.keyCode == 86 && e.ctrlKey ) ) {
      e.preventDefault();
    } else if ( !~akc.indexOf( e.keyCode ) && inputText.length >= 9 ) {
      e.preventDefault();
      alert( 'Note: WSU ID numbers are no greater than nine (9) digits in length.' );
    }
  };

  /**
   * Handler for paste events triggered in inputs accepting WSU ID numbers.
   *
   * @public
   *
   * @param {Event} e - Contains information about the paste event.
   */
  WsuIdInputs.prototype.onPaste = function ( e ) {
    var $this = $( this );
    var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
    var inputText = clipboardData.getData( 'Text' );
    var regExMask = /[^0-9]+/g;

    if ( regExMask.exec( inputText ) != null ) {
      var errorMsg = 'Note: WSU ID numbers can only contain digits.';
      e.stopPropagation();
      e.preventDefault();
      $this.val( inputText.replace( regExMask, '' ) );
      inputText = $this.val();
      if ( inputText.length > 9 ) {
        $this.val( inputText.slice( 0, 9 ) );
        errorMsg += ' Also, they must be no greater than nine (9) digits in length.';
      }
      errorMsg += ' What you pasted will automatically be corrected; please check the' +
        ' result to see if further corrections are needed.';
      alert( errorMsg );
    } else if ( inputText.length > 9 ) {
      e.stopPropagation();
      e.preventDefault();
      $this.val( inputText.slice( 0,9 ) );
      alert( 'WSU ID numbers are no greater than nine (9) digits in length. What you pasted' +
        ' will automatically be corrected. Please check the result to see if further' +
        ' corrections are needed.' );
    }
  };

//////////////
////// §1.3.3: Lexically scoped supporting functions

  /**
   * Obtains the regular expression pattern representing valid complete or incomple WSU ID input.
   *
   * @return {RegExp}
   */
  function getFinalRegExPattern() {
    return /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
  }

  /**
   * Obtains the list of key codes for acceptable keystrokes when a WSU ID input has focus.
   *
   * @return {Array}
   */
  function getAcceptableKeyCodes() {
    return [ 8, 9, 20, 35, 36, 37, 39, 46, 110, 144 ];
  }

  return WsuIdInputs;

} )( jQuery );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Application of OUE-wide Gravity Forms enhancements

( function ( $ ) {
  'use strict';

//////////
//// §2.1: Application of OueGFs module

  var oueGfs;

  oueGfs = new OueGFs();
  oueGfs.init();

//////////
//// §2.2: Binding of handlers to Gravity Forms post-render event

  $( document ).on( 'gform_post_render', function () {
    setupActvtrChckbxs( '.oue-gf-actvtr-checkbox' );
    setupActvtrChain( '.oue-gf-actvtr-chain' );
    setupUploadChain( '.oue-gf-upload-chain' );
    var $requiredFields = $( '.gfield_contains_required' );
    checkRqrdInpts( $requiredFields.find( 'input[type="text"]' ) );
    checkRqrdChckbxs( $requiredFields.find( '.gfield_checkbox, .gfield_radio' ) );
    checkRqrdTxtAreas( $requiredFields.find( 'textarea' ) );
    hghlghtRqrdInpts( $requiredFields.find( 'input' ) );
    hghlghtRqrdChckbxs( $requiredFields.find( '.gfield_checkbox, .gfield_radio' ) );
    hghlghtRqrdTxtAreas( $requiredFields.find( 'textarea' ) );
    hghlghtRqrdSelects( $requiredFields.find( 'select' ) );
    hghlghtRqrdRchTxtEdtrs( $( '.gfield_contains_required.uses-rich-editor' ) );
  } );


//////////
//// §2.3: Function declarations

  /**
   * Check each input element within a required gravity form field to determine if an entry has
   * already made by the user and highlight the input if not.
   *
   * @param {jQuery} $inputs - The set of input elements contained in required gravity form
   *     fields.
   */
  function checkRqrdInpts ( $inputs ) {
    if ( !$.isJQueryObj( $inputs ) ) {
      return;
    }
    $inputs.each( function () {
      var $thisInput = $( this );
      if ( $thisInput.val() == '' ) {
        $thisInput.removeClass( 'gf-value-entered' );
      } else if ( $thisInput.hasClass( 'chosen-search-input' ) && $thisInput.val() == 'Click to select...' ) {
        $thisInput.removeClass( 'gf-value-entered' );
      } else {
        $thisInput.addClass( 'gf-value-entered' );
      }
    } );
  }

  /**
   * Highlight input elements within required gravity form fields until a value has been properly
   * entered by the user.
   *
   * @param {jQuery} $inputs - The set of input elements contained in required gravity form
   *     fields.
   */
  function hghlghtRqrdInpts ( $inputs ) {
    if ( !$.isJQueryObj( $inputs ) ) {
      return;
    }
    $inputs.each( function () {
      var $thisInput = $( this );
      $thisInput.blur( function () {
        if ( $thisInput.val() == '' ) {
          $thisInput.removeClass( 'gf-value-entered' );
        } else if ( $thisInput.hasClass( 'chosen-search-input' ) && $thisInput.val() == 'Click to select...' ) {
          $thisInput.removeClass( 'gf-value-entered' );
        } else {
          $thisInput.addClass( 'gf-value-entered' );
        }
      } );
    } );
  }

  /**
   * Check each checkbox list within required gravity form checkbox fields to determine if at
   * least one checkbox has already been checked by the user and highlight the list if not.
   *
   * @param {jQuery} $lists - The set of list elements wrapping checkbox inputs and contained in
   *     required gravity form fields.
   */
  function checkRqrdChckbxs ( $lists ) {
    if ( !$.isJQueryObj( $lists ) ) {
      return;
    }
    $lists.each(function () {
      var $this = $( this );
      var $inputs = $this.find( 'input' );
      var inputReady = false;
      $inputs.each( function () {
        if ( $( this ).prop( 'checked' ) == true && !inputReady ) {
          inputReady = true;
        }
      } );
      if ( inputReady ) {
        $this.addClass( 'gf-value-entered' );
      } else {
        $this.removeClass( 'gf-value-entered' );
      }
    } );
  }

  /**
   * Highlight required gravity form fields containing checkbox elements until at least one box is
   * checked by the user.
   *
   * @param {jQuery} $lists - The set of list elements wrapping checkbox inputs and contained in
   *     required gravity form fields.
   */
  function hghlghtRqrdChckbxs ( $lists ) {
    if ( !$.isJQueryObj( $lists ) ) {
      return;
    }
    $lists.each( function () {
      var $inputs;
      var $this;

      $this = $( this );
      $inputs = $this.find( 'input' );
      $inputs.each( function () {
        var $thisChild = $( this );
        $thisChild.change( function () {
          var $parentsInputs;
          var $thisParent;
          var inputReady = false;

          $thisParent = $thisChild.parents( '.gfield_checkbox, .gfield_radio' );
          $parentsInputs = $thisParent.find( 'input' );
          $parentsInputs.each(function () {
            if ( $( this ).prop( 'checked' ) == true && !inputReady ) {
              inputReady = true;
            }
          } );
          if ( inputReady ) {
            $thisParent.addClass( 'gf-value-entered' );
          } else {
            $thisParent.removeClass( 'gf-value-entered' );
          }
        } );
      } );
    } );
  }

  /**
   * Check each text area element within a required gravity form field to determine if an entry
   * has already made by the user and highlight the element if not.
   *
   * @param {jQuery} $textAreas - The set of text area elements contained in required gravity form
   *     fields.
   */
  function checkRqrdTxtAreas ( $textAreas ) {
    checkRqrdInpts( $textAreas );
  }

  /**
   * Highlight text area elements within required gravity form fields until a value has been
   * entered by the user.
   *
   * @param {jQuery} $textAreas - The set of text arewa elements contained in required gravity
   *     form fields.
   */
  function hghlghtRqrdTxtAreas ( $textAreas ) {
    hghlghtRqrdInpts( $textAreas );
  }

  /**
   * Highlight rich text editors within required gravity form fields until a value has been
   * entered by the user.
   *
   * @param {jQuery} $fields - The set of rich text editor fields that are also required gravity
   *     form fields.
   */
  function hghlghtRqrdRchTxtEdtrs( $fields ) {
    if ( $.isJQueryObj( $fields ) && $fields.length > 0 ) {
      $fields.each( function () {
        setTimeout( function() {
          var $editorForm = $( this ).find( 'iframe' );
          $editorForm.each( function () {
            var $editorBody = $( this ).contents().find( '#tinymce' );
            $editorBody.css( 'fontFamily', '"Montserrat", sans-serif' );
            if ( $editorBody.text().replace( /\n|\uFEFF/g, '' ) == ''  ) {
              $editorBody.css( 'border-left', '2px solid #a60f2d' );
            }
            $editorBody.focus( function () {
              $( this ).css( 'border-left', '2px solid transparent' );
            } );
            $editorBody.blur( function () {
              var $this = $( this );
              if ( $this.text().replace( /\n|\uFEFF/g, '' ) == '' ) {
                $this.css( 'border-left', '2px solid #a60f2d' );
              }
            } );
          } );
        }.bind(this), 2000 );
      } );
    }
  }

  /**
   * Highlight select elements within required gravity form fields until a value has been selected
   * by the user.
   *
   * @param {jQuery} $selects - The set of text arewa elements contained in required gravity
   *     form fields.
   */
  function hghlghtRqrdSelects ( $selects ) {
    if ( $.isJQueryObj( $selects ) ) {
      $selects.each( function () {
        var $thisInput = $( this );
        var $childSlctdOptn = $thisInput.find( 'option:selected' );
        var optionVal = $childSlctdOptn.text();
        if ( optionVal != '' ) {
          $thisInput.addClass( 'gf-value-entered' );
        } else {
          $thisInput.removeClass( 'gf-value-entered' );
        }
        $thisInput.change( function () {
          $childSlctdOptn = $thisInput.find( 'option:selected' );
          optionVal = $childSlctdOptn.text();
          if ( optionVal != '' ) {
            $thisInput.addClass( 'gf-value-entered' );
          } else {
            $thisInput.removeClass( 'gf-value-entered' );
          }
        } );
      } );
    }
  }

  /**
   * Set up activator checkboxes that disappear once one is selected.
   *
   * @param {string} selector - String for selecting from the DOM gravity form fields designated
   *     as activator checkboxes.
   */
  function setupActvtrChckbxs ( selector ) {
    if ( $.type( selector ) === 'string' ) {
      $( '.gform_body' ).on( 'change', selector + ' input', function () {
        var $thisChild = $( this );
        var $thisParent = $thisChild.parents( selector );
        $thisParent.addClass( 'gf-activated' );
      } );
    }
  }

  /**
   * Setup a chain of activator checkboxes, wherein once a checkbox is activated/deactivated, only
   * its closest previous sibling is hidden/shown.
   *
   * @param {string} selector - String for selecting gravity form fields from the DOM that are
   *     designated as chained activator checkboxes.
   */
  function setupActvtrChain ( selector ) {
    if ( $.type( selector ) === 'string' ) {
      $( '.gform_body' ).on( 'change', selector + ' input', function () {
        var $thisChild = $( this );
        var $thisParent = $thisChild.parents( selector );
        var $parentPrevSblngs = $thisParent.prevAll( selector );
        if ( $thisChild.prop( 'checked' ) ) {
          $parentPrevSblngs.first().addClass( 'gf-hidden' );
        } else {
          $parentPrevSblngs.first().removeClass( 'gf-hidden' );
        }
      } );
    }
  }

  /**
   * Setup a chain of file uploading inputs, wherein only the left-most input in the tree is
   * visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.
   *
   * @param {string} selector - String for selecting gravity form fields from the DOM that are
   *     designated as part of an upload chain.
   */
  function setupUploadChain ( selector ) {
    if ( $.type( selector ) === 'string' ) {

      // TODO: CHECK IF UPLOADS ALREADY EXIST:
      //  It is possible to arrive at this point in execution after the user has submitted a
      //  form containing errors that also already contains transcripts uploaded to input
      //  fields that will be hidden by default. The following blocks of code resolve this
      //  situation by showing such fields, as well as their nearest neighbors.
      var $inputs = $( selector + " input[type='file']" );
      $inputs.each( function () {
        var $thisInput = $( this );
        var $nextDiv = $thisInput.nextAll( 'div[id]' ).first();
        if ( $nextDiv.length > 0 ) {
          $thisInput.addClass( 'gf-value-entered' );
          var $parentOfInput = $thisInput.parents( selector ).first();
          $parentOfInput.removeClass( 'gf-hidden' );
          var $parentNextSblngs = $parentOfInput.nextAll( selector ).first();
          $parentNextSblngs.removeClass( 'gf-hidden' );
        }
      } );

      // TODO: Break up this long, complicated execution sequence  into additional functions.
      $( '.gform_body' ).on( 'change', selector + " input[type='file']", function () {
        var $thisInput = $( this );
        if ( $thisInput.prop( 'files' ) != null && $thisInput.prop( 'files' ).length > 0 ) {
          var valuePassed = true;
          var $parentOfInput = $thisInput.parents( selector ).first();
          var $parentNextSblngs = $parentOfInput.nextAll( selector );
          var $parentPrevSblngs = $parentOfInput.prevAll( selector );
          if ( $parentNextSblngs.length != 0 || $parentPrevSblngs.length != 0 ) {
            var originalFileName = $thisInput.prop( 'files' ).item( 0 ).name;
            $parentPrevSblngs.each( function () {
              if ( valuePassed ) {
                var $thisSblng = $( this );
                var $thisSblngInput =
                  $thisSblng.find( "input[type='file']" ).first();
                if ( $thisSblngInput.prop( 'files' ) != null &&
                    $thisSblngInput.prop( 'files' ).length > 0 ) {
                  var thisFileName = $thisSblngInput.prop(
                      'files'
                    ).item( 0 ).name;
                  valuePassed = originalFileName != thisFileName;
                }
              }
            } );
            $parentNextSblngs.each( function () {
              if ( valuePassed ) {
                var $thisSblng = $( this );
                var $thisSblngInput = $thisSblng.find(
                    "input[type='file']"
                  ).first();
                if ( $thisSblngInput.prop( 'files' ) != null &&
                    $thisSblngInput.prop( 'files' ).length > 0) {
                  var thisFileName = $thisSblngInput.prop( 'files' ).item(0).name;
                  valuePassed = originalFileName != thisFileName;
                }
              }
            });
          }
          if ( valuePassed ) {
            $thisInput.addClass( 'gf-value-entered' );
            $parentNextSblngs.first().removeClass( 'gf-hidden' );
          } else {
            alert( 'A file with the same name has already been uploaded; please' +
              ' choose a different file.' );
            $thisInput.get(0).value = '';
          }
        } else {
          $thisChild.removeClass( 'gf-value-entered' );
        }
      } );
    }
  }
} )( jQuery );
