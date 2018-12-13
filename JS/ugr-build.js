/*!************************************************************************************************
 * jQuery.oue-custom.js: custom JS code common to all WSU Undergraduate Education websites        *
 **************************************************************************************************/

/**************************************************************************************************
 * TABLE OF CONTENTS                                                                              *
 * -----------------                                                                              *
 *   §1: ADDITION OF FUNCTIONS to jQuery......................................................48  *
 *     §1.1: jQuery.isJQueryObj...............................................................56  *
 *     §1.2: jQuery.isJQueryObj...............................................................69  *
 *   §2: AFTER DOM IS READY excution section.................................................128  *
 *   §3: AFTER WINDOW LOADED event bindings..................................................285  *
 *   §4: WINDOW RESIZE event bindings........................................................331  *
 *   §5: FUNCTION DECLARATIONS...............................................................339  *
 *     §5.1: addA11yTabPressListener.........................................................349  *
 *     §5.2: addBlankTargetAttributes........................................................361  *
 *     §5.3: addDefinitionListButtons........................................................418  *
 *     §5.4: checkForLrgFrmtSingle...........................................................515  *
 *     §5.5: effectDropDownTogglePermanence..................................................529  *
 *     §5.6: finalizeLrgFrmtSideRight........................................................558  *
 *     §5.7: fixDogears......................................................................575  *
 *     §5.8: handleMouseClickForA11y.........................................................597  *
 *     §5.9: handleTabPressForA11y...........................................................603  *
 *     §5.10: initContentFlippers............................................................611  *
 *     §5.11: initDefinitionLists............................................................624  *
 *     §5.12: initDropDownToggles............................................................671  *
 *     §5.13: initFancyHrH2Motif.............................................................693  *
 *     §5.14: initFancyHrH3Motif.............................................................699  *
 *     §5.15: initHrH2Motif..................................................................705  *
 *     §5.16: initHrH3Motif..................................................................717  *
 *     §5.17: initQuickTabs..................................................................723  *
 *     §5.18: initReadMoreToggles............................................................783  *
 *     §5.19: initTocFloating................................................................800  *
 *     §5.20: initTriggeredByHover...........................................................874  *
 *     §5.21: initWelcomeMessage.............................................................890  *
 *     §5.22: resizeLrgFrmtSideRight.........................................................897  *
 *     §5.23: setupDropDownTogglePermanence..................................................902  *
 *     §5.24: showDefinitionListButtons......................................................934  *
 **************************************************************************************************/

( function ( $ ) {

'use strict';

var thisFileName = "jQuery.oue-custom.js";

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: ADDITION OF FUNCTIONS to jQuery

// --- §1.1: jQuery.isJQueryObj
/**
 * Checking function to verify that the passed parameter is a valid jQuery object.
 *
 * @param $obj - Possible jQuery object; could be anything.
 */
$.isJQueryObj = function ( $obj ) {
	return ( $obj && ( $obj instanceof $ || $obj.constructor.prototype.jquery ) );
}

// --- §1.2: jQuery.logError
/**
 * Log an error using the browser console in JSON notation.
 * 
 * @param {string} fileName - Name of the JS source file wherein the error was encountered.
 * @param {string} fnctnName - Name of the function that called $.logError.
 * @param {string} fnctnDesc - Description of what the calling function is supposed to do.
 * @param {string} errorMsg - Message that describes what went wrong within the calling function.
 */
$.logError = function ( fileName, fnctnName, fnctnDesc, errorMsg ) {
	var thisFuncName = "jQuery.logError";
	var thisFuncDesc = "Log an error using the browser console in JSON notation.";
	var bitMask;
	
	bitMask = typeof fileName === "string";
	bitMask = ( typeof fnctnName === "string" ) | ( bitMask << 1 );
	bitMask = ( typeof fnctnDesc === "string" ) | ( bitMask << 1 );
	bitMask = ( typeof errorMsg === "string" || typeof errorMsg === "object" ) | ( bitMask << 1 );
	if ( bitMask === 15 ) {
		console.log( "error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName +
			"'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};" );
		if (typeof errorMsg === "object") {
			console.log( errorMsg );
		}
	} else {
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
			newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly\
 typed argument.\n"
		} else {
			newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed\
 arguments.\n"
		}
		newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n";
		newErrorMsg += "\t\tfileName = " + fileName + "\n";
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
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: AFTER DOM IS READY excution section

$( function () {
	var argsList = new Object(); // List of arguments that will be passed to functions
	var args; // List of arguments currently being utilized
	
	argsList.fixDogears = {
		slctrSiteNav: "#spine-sitenav",
		slctrDogeared: "li.current.active.dogeared",
		removedClasses: "current active dogeared"
	};
	args = argsList.fixDogears;
	fixDogears( args.slctrSiteNav, args.slctrDogeared, args.removedClasses );

	argsList.addBlankTargetAttributes = {
		slctrSpine: "#spine",
		slctrExternalLinks: "a.external"
	};
	args = argsList.addBlankTargetAttributes;
	addBlankTargetAttributes( args.slctrSpine, args.slctrExternalLinks );

	argsList.checkForLrgFrmtSingle = {
		slctrSingle: ".single.large-format-friendly",
		slctrMainHdr: "header.main-header",
		slctrHdrGroup: ".header-group",
		centeringClass: "centered"
	};
	args = argsList.checkForLrgFrmtSingle;
	checkForLrgFrmtSingle( args.slctrSingle, args.slctrMainHdr, args.slctrHdrGroup, 
		args.centeringClass );

	argsList.initHrH2Motif = {
		slctrStandardH2: ".column > h2:not(.fancy), .column > section > h2:not(.fancy)",
		slctrPrevHr: "hr:not(.subSection)",
		h2ClassesAdded: "no-top-margin",
		hrClassesAdded: "narrow-bottom-margin dark-gray thicker",
		animAddDrtn: 250
	};
	args = argsList.initHrH2Motif;
	initHrH2Motif( args.slctrStandardH2, args.slctrPrevHr, args.h2ClassesAdded, 
		args.hrClassesAdded, args.animAddDrtn );

	argsList.initFancyHrH2Motif = {
		slctrFancyH2: ".column > h2.fancy, .column > section > h2.fancy",
		slctrPrevHr: "hr:not(.subSection)",
		hrClassesAdded: "no-bottom-margin dark-gray thicker encroach-horizontal",
		animAddDrtn: 250
	};
	args = argsList.initFancyHrH2Motif;
	initFancyHrH2Motif( args.slctrFancyH2, args.slctrPrevHr, args.hrClassesAdded, 
		args.animAddDrtn );

	argsList.initHrH3Motif = {
		slctrStandardH3: ".column > h3:not(.fancy), .column > section > h3:not(.fancy)",
		slctrPrevHr: "hr:not(.subSection)",
		hrClassesAdded: "narrow-bottom-margin crimson",
		animAddDrtn: 250
	};
	args = argsList.initHrH3Motif;
	initHrH3Motif( args.slctrStandardH3, args.slctrPrevHr, args.hrClassesAdded, args.animAddDrtn );

	argsList.initFancyHrH3Motif = {
		slctrFancyH3: ".column > h3.fancy, .column > section > h3.fancy",
		slctrPrevHr: "hr:not(.subSection)",
		hrClassesAdded: "no-bottom-margin crimson encroach-horizontal",
		animAddDrtn: 250
	};
	args = argsList.initFancyHrH3Motif;
	initFancyHrH3Motif( args.slctrFancyH3, args.slctrPrevHr, args.hrClassesAdded, 
		args.animAddDrtn );

	argsList.initDropDownToggles = {
		slctrToggle: ".drop-down-toggle",
		slctrWhatsToggled: ".toggled-panel",
		activatingClass: "activated",
		animDuration: 500
	};
	args = argsList.initDropDownToggles;
	initDropDownToggles( args.slctrToggle, args.slctrWhatsToggled, args.activatingClass, 
		args.animDuration );

	argsList.initReadMoreToggles = {
		slctrToggleIn: ".read-more-toggle-in-ctrl",
		slctrToggleOut: ".read-more-toggle-out-ctrl",
		slctrPanel: ".read-more-panel",
		animDuration: 500
	};
	args = argsList.initReadMoreToggles;
	initReadMoreToggles( args.slctrToggleIn, args.slctrToggleOut, args.slctrPanel, 
		args.animDuration );

	argsList.initContentFlippers = {
		slctrCntntFlppr: ".content-flipper",
		slctrFlppdFront: ".flipped-content-front",
		slctrFlppdBack: ".flipped-content-back",
		animDuration: 500
	};
	args = argsList.initContentFlippers;
	initContentFlippers( args.slctrCntntFlppr, args.slctrFlppdFront, args.slctrFlppdBack, 
		args.animDuration );

	argsList.initDefinitionLists = {
		slctrDefList: "dl.toggled",
		slctrLrgFrmtSection: ".large-format-friendly",
		slctrColOne: ".column.one",
		slctrColTwo: ".column.two",
		dtActivatingClass: "activated",
		ddRevealingClass: "revealed",
		animSldDrtn: 400,
		animHghtDrtn: 100
	};
	args = argsList.initDefinitionLists;
	initDefinitionLists( args.slctrDefList, args.slctrLrgFrmtSection, args.slctrColOne, 
		args.slctrColTwo, args.dtActivatingClass, args.ddRevealingClass, args.animSldDrtn, 
		args.animHghtDrtn );

	argsList.addDefinitionListButtons = {
		slctrDefList: argsList.initDefinitionLists.slctrDefList,
		expandAllClass: "expand-all-button",
		collapseAllClass: "collapse-all-button",
		btnDisablingClass: "disabled",
		dtActivatingClass: argsList.initDefinitionLists.dtActivatingClass,
		ddRevealingClass: argsList.initDefinitionLists.ddRevealingClass,
		animSldDrtn: argsList.initDefinitionLists.animSldDrtn
	};
	args = argsList.addDefinitionListButtons;
	addDefinitionListButtons( args.slctrDefList, args.expandAllClass, args.collapseAllClass, 
		args.btnDeactivatingClass, args.dtActivatingClass, args.ddRevealingClass, 
		args.animSldDrtn );

	argsList.initQuickTabs = {
		slctrQtSctn: "section.row.single.quick-tabs"
	};
	args = argsList.initQuickTabs;
	initQuickTabs( args.slctrQtSctn );

	argsList.initTocFloating = {
		slctrToc: "p.vpue-jump-bar",
		slctrBackToToc: "p.vpue-jump-back"
	};
	args = argsList.initTocFloating;
	initTocFloating( args.slctrToc, args.slctrBackToToc );

	argsList.initTriggeredByHover = {
		slctrTrggrdOnHvr: ".triggered-on-hover",
		slctrCntntRvld: ".content-revealed",
		slctrCntntHddn: ".content-hidden",
		animDuration: 200
	};
	args = argsList.initTriggeredByHover;
	initTriggeredByHover( args.slctrTrggrdOnHvr, args.slctrCntntRvld, args.slctrCntntHddn, 
		args.animDuration );
	
	// TODO: initScrollingSidebars("...");
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: AFTER WINDOW LOADED event bindings

$( window ).on( "load", function () {
	var argsList = new Object();
	var args;

	argsList.finalizeLrgFrmtSideRight = {
		slctrSideRight: ".side-right.large-format-friendly",
		slctrColOne: ".column.one",
		slctrColTwo: ".column.two",
		trggrWidth: 1051,
		animDuration: 100
	};
	args = argsList.finalizeLrgFrmtSideRight;
	finalizeLrgFrmtSideRight( args.slctrSideRight, args.slctrColOne, args.slctrColTwo, 
		args.trggrWidth, args.animDuration );

	argsList.showDefinitionListButtons = {
		slctrDefList: "dl.toggled",
		expandAllClass: "expand-all-button",
		collapseAllClass: "collapse-all-button",
		animFadeInDrtn: 400
	};
	args = argsList.showDefinitionListButtons;
	showDefinitionListButtons( args.slctrDefList, args.expandAllClass, args.collapseAllClass,
		args.animFadeInDrtn );

	argsList.initWelcomeMessage = {
		slctrWlcmMsg: "#welcome-message",
		slctrPostWlcmMsg: "#post-welcome-message",
		msgDelay: 1000,
		fadeOutDuration: 500,
		fadeInDuration: 500
	};
	args = argsList.initWelcomeMessage;
	initWelcomeMessage( args.slctrWlcmMsg, args.slctrPostWlcmMsg, args.msgDelay, 
		args.fadeOutDuration, args.fadeInDuration );

	argsList.addA11yTabPressListener = {
		listenerCallback: handleTabPressForA11y
	}
	args = argsList.addA11yTabPressListener;
	addA11yTabPressListener( args.listenerCallback );
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §4: WINDOW RESIZE event bindings

$( window ).resize( function () {
	resizeLrgFrmtSideRight( ".side-right.large-format-friendly", "div.column.one",
		"div.column.two", 1051, 100 );
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §5: FUNCTION DECLARATIONS

// --- §5.1: addA11yTabPressListener
/**
 * Add an event listener to handle for keyboard navigation implied by tab presses. 
 *
 * Intended to support accessibility design.
 *
 * @param {function} listenerCallback - Function callback triggered on keydown event.
 */
function addA11yTabPressListener( listenerCallback ) {
	window.addEventListener( "keydown", listenerCallback );
}

// --- §5.2: addBlankTargetAttributes
/**
 * Adds missing blank target attributes to links within the WSU Spine as needed.
 * 
 * @param {string} slctrSpine - Selector string for locating the spine object within the DOM.
 * @param {string} slctrExternalLinks - Selector string for locating links within the spine that
 *     lead to destination external to the domain.
 */
function addBlankTargetAttributes( slctrSpine, slctrExternalLinks ) {
	var thisFnctnName = "addBlankTargetAttributes";
	var thisFnctnDesc = "Adds missing blank target attributes to links within the WSU Spine as \
needed.";
	if ( typeof slctrSpine === "string" && typeof slctrExternalLinks === "string" ) {
		var $spine = $( slctrSpine );
		if ( $spine.length === 1 ) {
			var $links = $spine.find( slctrExternalLinks );
			$links.each( function () {
				var $thisLink = $( this );
				if ( $thisLink.attr( "target" ) != "_blank" ) {
					$thisLink.attr( "target", "_blank" );
					var relStr = $thisLink.attr( "rel" );
					if ( relStr == undefined ) {
						$thisLink.attr( "rel", "noopener noreferrer" );
					} else {
						if ( relStr.search( /noopener/i ) < 0 ) {
							relStr += " noopener";
						}
						if ( relStr.search( /noreferrer/i ) < 0 ) {
							relStr += " noreferrer";
						}
						$thisLink.attr( "rel", relStr );
					}
				}
			} );
		} else {
			$.logError( 
				thisFileName, thisFnctnName, thisFnctnDesc,
				"I could not locate the WSU Spine element within the DOM."
			);
		}
	} else {
		$.logError( 
			thisFileName, thisFnctnName, thisFnctnDesc,
			"I was passed one or more incorrectly typed parameters. Here's what I was \
passed:\n\ttypeof slctrSpine = " + ( typeof slctrSpine ) + "\n\ttypeof slctrExternalLinks = " +
				( typeof slctrExternalLinks )
		);
	}
}

// --- §5.3: addDefinitionListButtons
/**
 * Automatically creates and binds events to expand/collapse all buttons designed for improving UX
 * of OUE site definition lists.
 *
 * @param {string} slctrDefList - Selector string for locating definition list elements within the
 *     DOM that contain collapsible definitions.
 * @param {string} expandAllClass - CSS class for controlling the layout of expand all buttons.
 * @param {string} collapseAllClass - CSS class for controlling the layout of collapse all buttons.
 * @param {string} btnDisablingClass - CSS class applied to disable expand/collapse all buttons.
 * @param {string} dtActivatingClass - CSS class used to indicate an active/expanded state for
 *     definition terms.
 * @param {string} ddRevealingClass - CSS class used to realize a revealed, visible state on
 *     definitions.
 */
function addDefinitionListButtons( slctrDefList, expandAllClass, collapseAllClass, 
		btnDisablingClass, dtActivatingClass, ddRevealingClass, animSldDrtn ) {
	var thisFuncName = "addDefinitionListButtons";
	var thisFuncDesc = "Automatically creates and binds events to expand/collapse all buttons \
designed for improving UX of OUE site definition lists";
	
	// Find and remove any pre-existing expand/collapse all buttons
	var $lists = $( slctrDefList );
	var $existingExpandAlls = $lists.children( "." + expandAllClass );
	var $existingCollapseAlls = $lists.children( "." + collapseAllClass );
	if ( $existingExpandAlls.length > 0 ) {
		$existingExpandAlls.remove();
		$.logError( 
			thisFileName, thisFuncName, thisFuncDesc,
			"Expand all buttons were already discovered in the DOM upon document initialization; \
please remove all buttons from the HTML source code to avoid wasting computational resources."
		);
	}
	if ( $existingCollapseAlls.length > 0 ) {
		$existingCollapseAlls.remove();
		$.logError( 
			thisFileName, thisFuncName, thisFuncDesc,
			"Collapse all buttons were already discovered in the DOM upon document initialization; \
please remove all buttons from the HTML source code to avoid wasting computational resources."
		);
	}
	
	// Add initially hidden ( via CSS ) expand/collapse all buttons to definition lists
	$lists.prepend( '<div class="collapse-all-button">[-] Collapse All</div>' );
	$lists.prepend( '<div class="expand-all-button">[+] Expand All</div>' );
	var slctrExpandAll = slctrDefList + " > ." + expandAllClass;
	var $expandAlls = $( slctrExpandAll );
	var slctrCollapseAll = slctrDefList + " > ." + collapseAllClass;
	var $collapseAlls = $( slctrCollapseAll );
	
	// Bind handling functions to button click events
	$expandAlls.click( function() {
		var $thisExpand = $( this );
		if ( !$thisExpand.hasClass( btnDisablingClass ) ) {
			var $nextCollapse = $thisExpand.next( "." + collapseAllClass );
			var $parentList = $thisExpand.parent( slctrDefList );
			if ( $parentList.length == 1 ) {
				// TODO: Disable buttons
				var $defTerms = $parentList.children( "dt" );
				$defTerms.each( function() {
					var $thisDefTerm = $( this );
					if ( !$thisDefTerm.hasClass( dtActivatingClass ) ) {
						$thisDefTerm.addClass( dtActivatingClass );
						var $thisDefTermNext = $thisDefTerm.next( "dd" );
						$thisDefTermNext.addClass( ddRevealingClass );
						$thisDefTermNext.stop().animate( {
							maxHeight: $thisDefTermNext[0].scrollHeight
						}, animSldDrtn );
					}
				} );
				// TODO: Enable buttons
			} else {
				$.logError( 
					thisFileName, thisFuncName, thisFunDesc,
					"When trying to bind a click event on an expand all button to a handling \
function, could not locate the parental definition list within DOM."
				);
			}
		}
	} );
	$collapseAlls.click( function() {
		var $thisCollapse = $( this );
		if ( !$thisCollapse.hasClass( btnDisablingClass ) ) {
			var $prevExpand = $thisCollapse.prev( "." + expandAllClass );
			var $parentList = $thisCollapse.parent( slctrDefList );
			if ( $parentList.length == 1 ) {
				// TODO: Disable buttons
				var $defTerms = $parentList.children( "dt" );
				$defTerms.each( function() {
					var $thisDefTerm = $( this );
					if ( $thisDefTerm.hasClass( dtActivatingClass ) ) {
						$thisDefTerm.removeClass( dtActivatingClass );
						var $thisDefTermNext = $thisDefTerm.next( "dd" );
						$thisDefTermNext.removeClass( ddRevealingClass );
						$thisDefTermNext.stop().animate( {
							maxHeight: 0
						}, animSldDrtn );
					}
				} );
				// TODO: Enable buttons
			} else {
				$.logError( 
					thisFileName, thisFuncName, thisFunDesc,
					"When trying to bind a click event on collapse all button #" + 
						$thisCollapse.index() + "to a handling function, could not locate the \
parental definition list within the DOM."
				);
			}
		}
	} );
}

function checkForLrgFrmtSingle( slctrSingle, slctrMainHdr, slctrHdrGroup, centeringClass ) {
	var $lrgFrmtSnglSctns;
	var $mainHeader;
	var $mnHdrChldDiv;

	$lrgFrmtSnglSctns = $( slctrSingle );
	if ( $lrgFrmtSnglSctns.length > 0 ) {
		$mainHeader = $( slctrMainHdr );
		$mainHeader.addClass( centeringClass );
		$mnHdrChldDiv = $mainHeader.find( slctrHdrGroup );
		$mnHdrChldDiv.addClass( centeringClass );
	}
}

function effectDropDownTogglePermanence( $toggles, slctrWhatsToggled, activatingClass, 
		animDuration ) {
	var thisFuncName = "effectDropDownTogglePermanence";
	var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element \
based on previous user interactions during the session.";
	if ( $.isJQueryObj( $toggles ) ) {
		$toggles.each( function() {
			var $this = $( this );
			if ( $this[0].id ) {
				try {
					var state = sessionStorage.getItem( $this[0].id );
					if ( state == "expanded" ) {
						$this.toggleClass( activatingClass );
					}
				} catch( e ) {
					$.logError( thisFileName, thisFuncName, thisFuncDesc, e.message );
				}
			} else {
				$.logError( thisFileName, thisFuncName, thisFuncDesc,
					"No ID was set for this drop down toggle element; thus, expansion state \
permanence cannot be effected." );
			}
		} );
	} else {
		$.logError( thisFileName, thisFuncName, thisFuncDesc,
			"I was not passed a valid jQuery object." );
	}
}

function finalizeLrgFrmtSideRight( slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, 
		animDuration ) {
	if( $( window ).width() >= trggrWidth ) {
		$( slctrSideRight + ">" + slctrColTwo ).each( function () {
			var $this = $( this );
			var $thisPrev = $this.prev( slctrColOne );
			if( $this.height() != $thisPrev.height() ) {
				$this.height( $thisPrev.height() );
			}
			var crrntOpacity = $this.css( "opacity" );
			if ( crrntOpacity == 0 ) {
				$this.animate( {opacity: 1.0}, animDuration );
			}
		} );
	}
}

function fixDogears( slctrSiteNav, slctrDogeared, removedClasses ) {
	// Fix bug wherein the wrong items in the spine become dogeared
	var $dogearedItems = $( slctrSiteNav ).find( slctrDogeared );
	if ( $dogearedItems.length > 1 ) {
		var currentURL = window.location.href;
		var currentPage = currentURL.substring( currentURL.substring( 0, currentURL.length -
 1 ).lastIndexOf( "/" ) + 1, currentURL.length - 1 );
		$dogearedItems.each( function () {
			var $this = $( this );
			var $navLink = $this.children( "a" );
			if ( $navLink.length == 1 ) {
				var navLinkURL = $navLink.attr( "href" );
				var navLinkPage = navLinkURL.substring( navLinkURL.substring( 0, navLinkURL.length -
 1 ).lastIndexOf( "/" ) + 1, navLinkURL.length - 1 );
				if ( navLinkPage != currentPage ) {
					$this.removeClass( removedClasses );
				}
			}
		} );
	}
}

function handleMouseClickForA11y( e ) {
	$( "body" ).removeClass( "user-is-tabbing" )
	window.removeEventListener( "mousedown", handleMouseClickForA11y )
	window.addEventListener( "keydown", handleTabPressForA11y )
}

function handleTabPressForA11y( e ) {
	if ( e.keyCode === 9 ) {
		$( "body" ).addClass( "user-is-tabbing" )
		window.removeEventListener( "keydown", handleTabPressForA11y )
		window.addEventListener( "mousedown", handleMouseClickForA11y )
	}
}

function initContentFlippers( slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration ) {
	$( slctrCntntFlppr ).click( function () {
		var $this = $( this );
		$this.next( slctrFlppdFront ).toggle( animDuration );
		$this.next( slctrFlppdFront ).next( slctrFlppdBack ).fadeToggle( animDuration );
	} );
	$( slctrFlppdFront ).click( function () {
		var $this = $( this );
		$this.toggle( animDuration );
		$this.next( slctrFlppdBack ).fadeToggle( animDuration );
	} );
}

function initDefinitionLists( slctrDefList, slctrLrgFrmtSection, slctrColOne, slctrColTwo,
 dtActivatingClass, ddRevealingClass, animHghtDrtn ) {
	var $listDts = $( slctrDefList + " dt" );
	$listDts.attr( "tabindex", 0 );
	$listDts.click( function() {
		var $this = $( this );
		$this.toggleClass( dtActivatingClass );
		var $thisNext = $this.next( "dd" );
		$thisNext.toggleClass( ddRevealingClass );
		if ( $thisNext.hasClass( ddRevealingClass ) ) {
			$thisNext.stop().animate( {
				maxHeight: $thisNext[0].scrollHeight
			} );
		} else {
			$thisNext.stop().animate( {
				maxHeight: 0
			} );
		}
		var $parent = $this.parents( slctrLrgFrmtSection + ">" + slctrColOne );
		var $prntNxt = $parent.next( slctrColTwo );
		$prntNxt.delay( 400 ).animate( {height: $parent.css( 'height' )}, animHghtDrtn );
	} );
	$listDts.on( "keydown", function( e ) {
		var regExMask = /Enter| /g; // TODO: Divide and conquer
		if ( regExMask.exec( e.key ) != null ) {
			e.preventDefault();
			var $this = $( this );
			$this.toggleClass( dtActivatingClass );
			var $thisNext = $this.next( "dd" );
			$thisNext.toggleClass( ddRevealingClass );
			if ( $thisNext.hasClass( ddRevealingClass ) ) {
				$thisNext.stop().animate( {
					maxHeight: $thisNext[0].scrollHeight
				} );
			} else {
				$thisNext.stop().animate( {
					maxHeight: 0
				} );
			}
			var $parent = $this.parents( slctrLrgFrmtSection + ">" + slctrColOne );
			var $prntNxt = $parent.next( slctrColTwo );
			$prntNxt.delay( 400 ).animate( {height: $parent.css( 'height' )}, animHghtDrtn );
		}
	} );
	$( slctrDefList + " dd" ).removeClass( ddRevealingClass );
}

function initDropDownToggles( slctrToggle, slctrWhatsToggled, activatingClass, animDuration ) {
	var $toggles =  $( slctrToggle );
	$toggles.attr( "tabindex", 0 );
	$toggles.addClass( "no-anchor-highlighting" );
	effectDropDownTogglePermanence( $toggles, slctrWhatsToggled, activatingClass, animDuration );
	$toggles.click( function () {
		var $this = $( this );
		$this.blur();
		$this.toggleClass( activatingClass );
		setupDropDownTogglePermanence( $this, activatingClass );
	} );
	$toggles.on( "keydown", function( e ) {
		var regExMask = /Enter| /g;
		if ( regExMask.exec( e.key ) != null ) {
			e.preventDefault();
			var $this = $( this );
			$this.toggleClass( activatingClass );
			setupDropDownTogglePermanence( $this, activatingClass );
		}
	} );
}

function initFancyHrH2Motif( slctrFancyH2, slctrPrevHr, hrClassesAdded, animAddDrtn ) {
	$( slctrFancyH2 ).each( function () {
			$( this ).prev( slctrPrevHr ).addClass( hrClassesAdded, animAddDrtn );
	} );
}

function initFancyHrH3Motif( slctrFancyH3, slctrPrevHr, hrClassesAdded, animAddDrtn ) {
	$( slctrFancyH3 ).each( function () {
		$( this ).prev( slctrPrevHr ).addClass( hrClassesAdded, animAddDrtn );
	} );
}

function initHrH2Motif( slctrStandardH2, slctrPrevHr, h2ClassesAdded, hrClassesAdded,
		animAddDrtn ) {
	$( slctrStandardH2 ).each( function () {
			var $this = $( this );
			var $prevElem = $this.prev( slctrPrevHr );
			if ( $prevElem.length > 0 ) {
				$this.addClass( h2ClassesAdded );
				$prevElem.addClass( hrClassesAdded, animAddDrtn );
			}
	} );
}

function initHrH3Motif( slctrStandardH3, slctrPrevHr, hrClassesAdded, animAddDrtn ) {
	$( slctrStandardH3 ).each( function () {
		$( this ).prev( slctrPrevHr ).addClass( hrClassesAdded, animAddDrtn );
	} );
}

function initQuickTabs( slctrQtSctn ) {
	var $qtSctn = $( slctrQtSctn );
	$qtSctn.each( function () {
		var $thisSctn = $( this );
		var $tabCntnr = $thisSctn.find( "div.column > ul" );
		var $tabs = $tabCntnr.find( "li" );
		var $panelCntnr = $thisSctn.find( "table" );
		var $panels = $panelCntnr.find( "tbody:first-child > tr" );
		if( $tabs.length == $panels.length ) {
			var idx;
			var jdx;
			for ( idx = 0; idx < $tabs.length; idx++ ) {
				$tabs.eq( idx ).click( function() {
					var $thisTab = $( this );
					var kdx = $tabs.index( $thisTab );
					if ( kdx == 0 ) {
						if ( $thisTab.hasClass( "deactivated" ) ) {
							$thisTab.removeClass( "deactivated" );
							$panels.eq( kdx ).removeClass( "deactivated" );
							for ( jdx = 1; jdx < $tabs.length; jdx++ ) {
								if ( $tabs.eq( jdx ).hasClass( "activated" ) ) {
									$tabs.eq( jdx ).removeClass( "activated" );
									$panels.eq( jdx ).removeClass( "activated" );
								}
							}
							$( "html, body" ).animate( {
								scrollTop: $thisTab.offset().top
							}, 500 );								
						}
					} else {
						if ( !$thisTab.hasClass( "activated" ) ) {
							if ( !$tabs.eq( 0 ).hasClass( "deactivated" ) ) {
								$tabs.eq( 0 ).addClass( "deactivated" );
								$panels.eq( 0 ).addClass( "deactivated" );
							}
							for ( jdx = 1; jdx < kdx; jdx++ ) {
								if ( $tabs.eq( jdx ).hasClass( "activated" ) ) {
									$tabs.eq( jdx ).removeClass( "activated" );
									$panels.eq( jdx ).removeClass( "activated" );
								}
							}
							$thisTab.addClass( "activated" );
							$panels.eq( kdx ).addClass( "activated" );
							for ( jdx = kdx + 1; jdx < $tabs.length; jdx++ ) {
								if ( $tabs.eq( jdx ).hasClass( "activated" ) ) {
									$tabs.eq( jdx ).removeClass( "activated" );
									$panels.eq( jdx ).removeClass( "activated" );
								}
							}
							$( "html, body" ).animate( {
								scrollTop: $thisTab.offset().top
							}, 500 );								
						}
					}
				} );
			}
		}
	} );
}

function initReadMoreToggles( slctrToggleIn, slctrToggleOut, slctrPanel, animDuration ) {
	$( slctrToggleIn ).click( function () {
		var $this = $( this );
		var $next = $this.next( slctrPanel );
		$this.toggle( animDuration );
		$this.$next.toggle( animDuration );
		$this.$next.next( slctrToggleOut ).toggle( animDuration );
	} );
	$( slctrToggleOut ).click( function () {
		var $this = $( this );
		var $next = $this.next( slctrPanel );
		$this.toggle( animDuration );
		$this.$next.toggle( animDuration );
		$this.$next.next( slctrToggleIn ).toggle( animDuration );
	} );
}

function initTocFloating( slctrToc, slctrBackToToc ) {
	var thisFuncName = "initTocFloating";
	var thisFuncDesc = "Cause the table of contents element to float after scrolling past a \
certain point";
	var $toc = $( slctrToc );
	var $backToToc = $( slctrBackToToc );
	var $linkToTop = $backToToc.first().children( "a" );
	var $mainHeader = $( "header.main-header" );
	if ( $toc.length === 1 && $mainHeader.length === 1 ) {
		var $window = $( window );
		var tocTrigger = $toc.offset().top + $toc.height() + 100;
		var $tocClone = $toc.clone().addClass( "floating" ).removeAttr( "id" ).insertAfter( $toc );
		$tocClone.find( "span.title + br").remove();
		$tocClone.find( "span.title").remove();
		var counter = 1;
		$tocClone.find( "br").each( function () {
			if ( counter % 2 != 0 ) {
				$( this ).before( " //");
			}
			$( this ).remove();
			counter++;
		} );
		if ( $linkToTop.length === 1 ) {
			var linkText = $linkToTop.text();
			var idxMatched = linkText.search( /\u2014Back to ([^\u2014]+)\u2014/ );
			if ( idxMatched != -1 ) {
				var $linkToTopClone = $linkToTop.clone();
				$linkToTopClone.text( linkText.replace( /\u2014Back to ([^\u2014]+)\u2014/,
					"$1" ) );
				$tocClone.prepend( " //&nbsp;" );
				$linkToTopClone.prependTo( $tocClone );
				$backToToc.remove();
			} else {
				$.logError( thisFileName, thisFuncName, thisFuncDesc, "Did not find the correct \
textual pattern within the link back to the top of the page." );
			}
		} else {
			console.log( thisFileName, thisFuncName, thisFuncDesc,  "Did not find a single \
hyperlink within the first link back to the top of the page." );
		}
		$window.scroll( function( e ) {
			var windowScrollPos = $window.scrollTop();
			if ( windowScrollPos > tocTrigger && !$tocClone.is( ":visible" ) ) {
				$tocClone.width( $mainHeader.width() * .8 );
				$tocClone.css( {
					left: $mainHeader.offset().left + $mainHeader.width() / 2,
				} );
				$tocClone.fadeIn( 300 );
			}
			else if ( windowScrollPos <= tocTrigger && $tocClone.is( ":visible" ) ) {
				$tocClone.hide();
			}
		} );
		$window.resize( function () {
			$tocClone.width( $mainHeader.width() * .8 );
			$tocClone.css( {
				left: $mainHeader.offset().left + $mainHeader.width() / 2,
			} );
		} );
	} else {
		if ( $toc.length > 1 ) {
			console.log( thisFileName, thisFuncName, thisFuncDesc, "Found more than one table of \
contents elements; this function only works with one table of contents." );
		}
		if ( $mainHeader.length === 0 ) {
			console.log( thisFileName, thisFuncName, thisFuncDesc, "Could not find the main header \
element within the DOM." );
		} else if ( $mainHeader.length > 1 ) {
			console.log( thisFileName, thisFuncName, thisFuncDesc, "Found more than one table of \
contents elements; this function only works with one table of contents.' }" );
		}
	}
}

function initTriggeredByHover( slctrTrggrdOnHvr, slctrCntntRvld, slctrCntntHddn, animDuration ) {
	$( slctrTrggrdOnHvr ).mouseenter( function () {
		var $this = $( this );
		var $rvldCntnt = $this.find( slctrCntntRvld );
		var $hddnCntnt = $this.find( slctrCntntHddn );
		$rvldCntnt.stop().show( animDuration );
		$hddnCntnt.stop().hide( animDuration );
	} ).mouseleave( function () {
		var $this = $( this );
		var $rvldCntnt = $this.find( slctrCntntRvld );
		var $hddnCntnt = $this.find( slctrCntntHddn );
		$rvldCntnt.stop().hide( animDuration );
		$hddnCntnt.stop().show( animDuration );
	} );
}

function initWelcomeMessage( slctrWlcmMsg, slctrPostWlcmMsg, msgDelay, fadeOutDuration, 
		fadeInDuration ) {
	$( slctrWlcmMsg ).delay( msgDelay ).fadeOut( fadeOutDuration, function () {
		$( slctrPostWlcmMsg ).fadeIn( fadeInDuration );
	} );
}

function resizeLrgFrmtSideRight( slctrSideRight, slctrColOne, slctrColTwo, trggrWidth,
		animDuration ) {
	finalizeLrgFrmtSideRight( slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration );
}

function setupDropDownTogglePermanence( $toggle, activatingClass ) {
	var thisFuncName = "setupDropDownTogglePermanence";
	var thisFuncDesc = "Records the expansion state of a drop down toggle element in local storage \
to later effect permanence.";
	if ( $.isJQueryObj( $toggle ) ) {
		if ( $toggle[0].id ) {
			try {
				var state = $toggle.hasClass( activatingClass ) ? "expanded" : "collapsed";
				sessionStorage.setItem( $toggle[0].id, state );
			} catch( e ) {
				$.logError( thisFileName, thisFuncName, thisFuncDesc, e.message );
			}
		} else {
			$.logError( thisFileName, thisFuncName, thisFuncDesc,
				"No ID was set for this drop down toggle element; thus, expansion state permanence \
cannot be effected." );
		}
	} else {
		$.logError( thisFileName, thisFuncName, thisFuncDesc,
			"I was not passed a valid jQuery object." );
	}
}

/**
 * showDefinitionListButtons
 * DESCRIPTION: Display expand/collapse all buttons, which were initially hidden
 * PARAMETERS:
 *   += slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
 *   += expandAllClass: CSS class for controlling the layout of expand all buttons
 *   += collapseAllClass: CSS class for controlling the layout of collapse all buttons
 *   += animFadeInDrtn: the animation speed by which definitions fade into view
 */
function showDefinitionListButtons( slctrDefList, expandAllClass, collapseAllClass,
		animFadeInDrtn ) {
	var thisFuncName = "addDefinitionListButtons";
	var thisFuncDesc = "Display expand/collapse all buttons, which were initially hidden";
	
	// Display expand/collapse all buttons
	var $lists = $( slctrDefList );
	var $expandAlls = $lists.children( "." + expandAllClass );
	var $collapseAlls = $lists.children( "." + collapseAllClass );
	$lists.animate( {
		marginTop: "+=39px"
	}, animFadeInDrtn, function() {
		$expandAlls.fadeIn( animFadeInDrtn );
		$collapseAlls.fadeIn( animFadeInDrtn );
	} );
}
	
} )( jQuery );

/*!**************************************************************************************************************************
 * jQuery.oue-animate.js: custom JavaScript code to be used on all WSU Undergraduate Education websites for animating      *
 * elements.                                                                                                               *
 ***************************************************************************************************************************/
"use strict";

(function ($) {
	var thisFileName = "jQuery.oue-custom.js";
	// TODO: Write a function for setting CSS property anim-filling-mode via JS
	// TODO: Convert animation functions into objects to better organize code.
	
	/*******************************************************************************************************************
	 * WINDOW LOAD event bindings                                                                                      *
	 *******************************************************************************************************************/
    $(window).on("load", function () {
		var argsList = new Object(); // List of arguments that will be passed to functions
		var args;
		
		// Set up organized list of arguments to be passed to functions called after the window has loaded
		argsList.doFadeInFromTopAnimations = {
			slctrAnimatedElems: ".js-fade-in-from-top",
			dfltSpeed: 1000,
			fastClass: "fast",
			fastModifier: 0.5,
			delayedClass: "delayed"
		};
		
		// Call post window loading functions
		args = argsList.doFadeInFromTopAnimations
		doFadeInFromTopAnimations(
			args.slctrAnimatedElems,
			args.dfltSpeed,
			args.fastClass,
			args.fastModifier,
			args.delayedClass
		);
	});
	
	/*******************************************************************************************************************
	 * POST WINDOW LOADING FUNCTIONS                                                                                   * 
	 *******************************************************************************************************************/
	function doFadeInFromTopAnimations(slctrAnimatedElems, dfltSpeed, fastClass, fastModifier, delayedClass) {
		// TODO: What if JS isn't running? Solution: need a JS Notice.
		var thisFuncName = "doFadeInFromTopAnimations";
		var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element based on previous user interactions during the session.";
		var specialAction = undefined;
		var storageQueried = false;
		try {
			specialAction = sessionStorage.getItem("doFadeInFromTopAnimations");
			storageQueried = true;
		} catch(e) {
			$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
		}
		var $objs = $(slctrAnimatedElems);
		$objs.each(function(){
			var $this = $(this);
			var speed = dfltSpeed;
			var delayTime = 0;
			if ($this.hasClass(fastClass)) {
				speed *= fastModifier;
			}
			if ($this.hasClass(delayedClass)) {
				delayTime = speed;
			}
			if (storageQueried && specialAction == "fade-in-only") {
				$this.stop().delay(delayTime).animate({
					opacity: 1
				}, speed / 2);
			} else {
				var height = $this.height();
				$this.css("top", -height);
				$this.stop().delay(delayTime).animate({
					opacity: 1,
					top: 0
				}, speed);
			}
		});
		if (storageQueried && !specialAction) {
			try {
				sessionStorage.setItem("doFadeInFromTopAnimations", "fade-in-only");
			} catch(e) {
				$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
			}
		}
	}
})(jQuery);
/*! jQuery Cookie Plugin v1.4.1
 * --> https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl, released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {
            // If we can't decode or parse the cookie, ignore it; it's unusable.
        }
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        // Write the cookie
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // Read the cookie
        var result = key ? undefined : {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));

/* Utilization of the jQuery Cookie Plugin v1.4.1 to implement a page-covering notice that
 * is dismissed upon user click or tap.
 */
(function ($) {
	var thisFileName = "jQuery.cookieObjs.js";
	var noticeRunning = false;
	var $pageNotice;
	
    $(document).ready(function () {
		$pageNotice = $('.page-covering-notice-js')
		showPageCoveringNotice($pageNotice);
    });
	
	function closeNoticeOnKeydown(e) {
		if (noticeRunning) {
			e.preventDefault();
			$pageNotice.fadeOut(333);
			noticeRunning = false;
			$(document).off("keydown", closeNoticeOnKeydown);	
		}
	}
	
	function showPageCoveringNotice($pageNotice) {
		var thisFuncName = "showPageCoveringNotice";
		var thisFuncDesc = "Display a single page covering notice if it has not yet been viewed today.";
        if ($.isJQueryObj($pageNotice) && $pageNotice.length === 1) {
			// Check for a cookie name specified by the page designer
			var defaultCookieName = "wsuVpuePageNoticeViewed";
			var cookieName = $pageNotice.data("noticeName");
			if (!cookieName) {
				cookieName = defaultCookieName;
			} else {
				// Restrict our cookie name to only contain letters and digits
				var regExMask = /[^0-9a-zA-Z]+/g;
				if (regExMask.exec(cookieName) != null) {
					cookieName = cookieName.replace(regExMask, "");
				}
			}
			var rightNow = new Date();
			var noticeHidden = false;
			var noticeHiddenBefore = $pageNotice.data("noticeHiddenBefore");
			if (noticeHiddenBefore) {
				var hiddenBeforeDate = new Date(noticeHiddenBefore);
				if (rightNow.getTime() < hiddenBeforeDate.getTime()) {
					noticeHidden = true;
				}
			}
			var noticeNowExpired = false;
			var noticeExpiration = $pageNotice.data("noticeExpiresAfter");
			if (noticeExpiration) {
				var expirationDate = new Date(noticeExpiration);
				if (rightNow.getTime() > expirationDate.getTime()) {
					noticeNowExpired = true;
				}
			}
			if (!noticeHidden && !noticeNowExpired) {
				// If cookie is not present, this is the first time today the page was loaded; so show the notice
				if ($.cookie(cookieName) === undefined) {
					// Determine the expiration time of the cookie (i.e. time until midnight)
					var tomorrowMidnight = new Date(rightNow.getTime());
					tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
					tomorrowMidnight.setHours(0);
					tomorrowMidnight.setMinutes(0);
					tomorrowMidnight.setSeconds(0);
					tomorrowMidnight.setMilliseconds(0);
					// Set the cookie to prevent further displays of notice for the day
					$.cookie(cookieName, 1, {
						expires: (tomorrowMidnight.getTime() - rightNow.getTime()) / 86400000
					});
					noticeRunning = true;
					$pageNotice.fadeIn(1000);
					$(document).on("keydown", closeNoticeOnKeydown);
					$pageNotice.click(function () {
						$(this).fadeOut(333);
						noticeRunning = false;
						$(document).off("keydown", closeNoticeOnKeydown);
					});
					$pageNotice.keydown(function () {
						$(this).fadeOut(333);
					});
				}
			}
        } else {
			if ($pageNotice.length > 1) {
				$.logError(thisfileName, thisFuncName, thisFuncDesc,
					"More than one page covering notice was encountered in the DOM."
				);
			}
		}
	}
})(jQuery);
/*!*
 * jQuery.forms.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Enhancements, intended for OUE websites, mediated by jQuery to dynamic behavior of
 * Gravity Forms.
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * REPOSITORY: https://github.com/invokeImmediately/WSU-UE---JS
 *
 * LICENSE: ISC - Copyright (c) 2018 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 *   SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
 *   DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 *   DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 */


////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gravity Forms enhancement modules........................................................56
//     §1.1: EmailConfirmations class...........................................................59
//         §1.1.1: Public properties............................................................84
//         §1.1.2: Public methods..............................................................100
//     §1.2: GfCheckboxValidators class........................................................130
//         §1.2.1: Private properties..........................................................148
//         §1.2.2: Public properties...........................................................153
//         §1.2.3: Privileged methods..........................................................158
//         §1.2.4: Constructor's main execution section........................................174
//         §1.2.5: Public methods..............................................................180
//     §1.3: OueGFs class......................................................................308
//         §1.3.1: Public properties...........................................................326
//         §1.3.2: Public methods..............................................................347
//         §1.3.3: Lexically scoped supporting functions.......................................373
//     §1.4: WsuIdInputs class.................................................................390
//         §1.4.1: Public properties...........................................................410
//         §1.4.2: Public methods..............................................................425
//         §1.4.3: Lexically scoped supporting functions.......................................522
// §2: Application of OUE-wide Gravity Forms enhancements......................................547
//     §2.1: Document ready bindings...........................................................553
//     §2.2: Document ready bindings...........................................................561
//     §2.3: Binding of Handlers to Window Load................................................582
//     §2.4: Window Load Event Bindings........................................................594
//     §2.5: Function declarations.............................................................601
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gravity Forms enhancement modules

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.1: EmailConfirmations class

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

	"use strict";

	/**
	 * Constructor for EmailConfirmations.
	 *
	 * @param {string} selGField - Selects the Gravity Form field containing the input in which the
	 *     email and its confirmation will be entered.
	 */
	function EmailConfirmations( selGfield ) {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.1.1: Public properties

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

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.1.2: Public methods

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

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.2: GfCheckboxValidators

/**
 * Gravity Forms enhancement module for validating checkbox input containers wherein all checkboxes
 * must be checked.
 *
 * Links the state of a Gravity Forms checkbox field to a subsequent (and ideally hidden) validator
 * field. Currently, all of the checkboxes must be selected for the field to be validated.
 *
 * @class
 */
var GfCheckboxValidators = ( function( $ ) {
	
	"use strict";

	function GfCheckboxValidators( sels ) {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.1: Private properties

		var _$form;

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.2: Public properties

		this.sels = sels;

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.3: Privileged methods

		this.get$form = function () {
			return _$form;
		}

		this.findForm = function () {
			if ( this.IsObjValid() ) {
				_$form = $ ( this.sels.formContainer )
			} else {
				console.log( "Object wasn't valid." );
				_$form = $( [] );
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.4: Constructor's main execution section

		this.findForm();
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.2.5: Public methods

	/**
	 * Finish the process of hiding validator fields from the user.
	 *
	 * Removes tab indexing from the field so that JavaScript can safely automate population of the
	 * validator field with input based on the state of the preceding checkbox field.
	 *
	 * @access public
	 *
	 * @memberof GfCheckboxValidators
	 */
	GfCheckboxValidators.prototype.finishHidingValidators = function () {
		var $form;
		var $field;
		var $validator;
		var $validator_input;

		$form = this.get$form();
		if ( this.IsObjValid() && $form.length) {
			// Isolate validator and its target field in the DOM.
			$field = $form.find( this.sels.validatedField );
			$validator = $field.next( this.sels.validator );

			// Disable tab indexing to form validators.
			if ( $field.length && $validator.length ) {
				$validator_input = $validator.find( "input" );
				$validator_input.attr( 'tabindex', '-1' );
			}
		}
	};

	/**
	 * Initialize validation of validated checkbox fields by their subsequent validator fields.
	 *
	 * The validator's input element will be set to "validated" if all checkboxes are checked,
	 * otherwise it will be set to an empty string.
	 *
	 * @access public
	 *
	 * @memberof GfCheckboxValidators
	 *
	 * @throws {Error} Member function IsObjValid will automatically be called and must return true.
	 * @throws {Error} The specified validated and validator fields must be found within the form,
	 *     and each validated field must be followed by a validator field as a sibling.
	 * @throws {Error} Validated fields must contain checkbox input elements, and validator fields
	 *     must contain a single input element.
	 */
	GfCheckboxValidators.prototype.initValidation = function() {
		var $form;
		var sels = this.sels;
		var stillValid;

		stillValid = this.IsObjValid();
		if ( !stillValid ) {
			throw Error( "Object properties did not pass validity check." );
		} else {
			// Find the form appropriate fields within the form.
			$form = this.get$form();
			$form.on('change', sels.validatedField + " :checkbox", function () {
				var $checkBoxes;
				var $parentField;
				var $this;
				var $validator_input;
				var allChecked = true;
				var stillValid = true;

				$this = $( this );
				$parentField = $this.parents( sels.validatedField );
				$checkBoxes = $parentField.find( " :checkbox" );
				$validator_input = $parentField.next( sels.validator ).find( "input" );
				stillValid = $validator_input.length === 1;
				try {
					if ( !stillValid ) {
						throw Error( "Found a validated field in the DOM that was not followed by a\
 matching, properly formed validator sibling; checkbox state cannot be properly validated." );
					} else {
						// Check the state of all the checkbox inputs within the validated field.
						$checkBoxes.each( function () {
							if ( allChecked && !this.checked) {
								allChecked = false;
							}
						} );

						// Appropriately set the state of the validator's input element.
						if ( allChecked && $validator_input.val() != "validated" ) {
							$validator_input.val( "validated" );
						} else if ( $validator_input.val() != "" ) {
							$validator_input.val( "" );
						}
					}
				} catch ( err ) {
					console.log(err.name + ": " + err.message);
				}
			} );
		}
	};

	/**
	 * Check the validity of the instance based on the types and values of its members.
	 *
	 * @return {boolean} Returns true if members are properly typed and their values conform to
	 *     expectations. Returns false otherwise.
	 */
	GfCheckboxValidators.prototype.IsObjValid = function() {
		var stillValid = true;
		var selsProps;

		if ( !( typeof this.sels === 'object' ) ) {
			stillValid = false
		} else if ( stillValid ) {
			selsProps = Object.getOwnPropertyNames( this.sels );
		}
		if ( stillValid && !( selsProps.length === 3 &&
				selsProps.find( function( elem ) { return elem === 'formContainer'; } ) &&
				selsProps.find( function( elem ) { return elem === 'validatedField'; } ) &&
				selsProps.find( function( elem ) { return elem === 'validator'; } ) ) ) {
			stillValid = false;
		}
		// TODO: Check for properly formed selector strings.

		return stillValid;
	};

	return GfCheckboxValidators;
} )( jQuery );

////////////////////////////////////////////////////////////////////////////////////////////
// §1.3: OueGFs

/**
 * Module for adding enhancements to Gravity Forms found on OUE websites.
 *
 * @class
 */

var OueGFs = ( function( $ ) {
	
	"use strict";

	/**
	 * Constructor for OueGFs.
	 */
	function OueGFs() {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.3.1: Public properties

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

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.3.2: Public methods

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

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.3.3: Lexically scoped supporting functions

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

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.4: WsuIdInputs

/**
 * Provides RegEx mediated validation of gravity form inputs that accept WSU ID numbers.
 *
 * @class
 */
var WsuIdInputs = ( function ( $ ) {
	
	"use strict";

	/**
	 * Constructor for WsuIdInputs class.
	 *
	 * @param {string} selGField - Selects the Gravity Form field containing the input in which the
	 *     WSU ID number will be entered.
	 */
	function WsuIdInputs( selGfield ) {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.4.1: Public properties

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

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.4.2: Public methods

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
				alert( 'The WSU ID you entered did not follow the correct pattern; please try again\
. When the leading zero is included, WSU ID numbers are 9 digits long. You can also drop the leadin\
g zero and enter in 8 digits.' );
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
			errorMsg += ' What you pasted will automatically be corrected; please check the result \
to see if further corrections are needed.';
			alert( errorMsg );
		} else if ( inputText.length > 9 ) {
			e.stopPropagation();
			e.preventDefault();
			$this.val( inputText.slice( 0,9 ) );
			alert( 'WSU ID numbers are no greater than nine (9) digits in length. What you pasted w\
ill automatically be corrected. Please check the result to see if further corrections are needed.'
				);
		}
	};

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.4.3: Lexically scoped supporting functions

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
	"use strict";

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.1: Application of OueGFs module

	var oueGfs;

	oueGfs = new OueGFs();
	oueGfs.init();

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.2: Document ready bindings

	$( function () {
		var $requiredFields;
		if ( $( '.gform_body' ).length > 0 ) {
			setupActvtrChckbxs( '.oue-gf-actvtr-checkbox' );
			setupActvtrChain( '.oue-gf-actvtr-chain' );
			setupUploadChain( '.oue-gf-upload-chain' );
			
			// TODO: streamline functions by querying all ul.gform_fields li.gfield, then determine
			//   how to handle object by finding div children with gfield_container_class. Best to
			//   implement as a class.
			$requiredFields =  $( 'li.gfield_contains_required' );
			hghlghtRqrdInpts( $requiredFields.find( 'input' ) );
			hghlghtRqrdChckbxs( $requiredFields.find( 'ul.gfield_checkbox, ul.gfield_radio' ) );
			hghlghtRqrdTxtAreas( $requiredFields.find( 'textarea' ) );
			hghlghtRqrdSelects( $requiredFields.find( 'select' ) );
		}
	} );

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.3: Binding of Handlers to Window Load

	$( document ).on( 'gform_post_render', function () {
		var $requiredFields =  $( 'li.gfield_contains_required' );

		checkRqrdInpts( $requiredFields.find( 'input' ) );
		checkRqrdChckbxs( $requiredFields.find( 'ul.gfield_checkbox, ul.gfield_radio' ) );
		checkRqrdTxtAreas( $requiredFields.find( 'textarea' ) );
	} );


	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.4: Window Load Event Bindings

	$( window ).load( function () {
		hghlghtRqrdRchTxtEdtrs( $( '.gfield_contains_required.uses-rich-editor' ) );
	} );

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.5: Function declarations

	/**
	 * Check each input element within a required gravity form field to determine if an entry has
	 * already made by the user and highlight the input if not.
	 *
	 * @param {jQuery} $inputs - The set of input elements contained in required gravity form
	 *     fields.
	 */
	function checkRqrdInpts ( $inputs ) {
		if ( $.isJQueryObj( $inputs ) ) {
			$inputs.each( function () {
				var $thisInput = $( this );
				if ( $thisInput.val() == '' ) {
					$thisInput.removeClass( 'gf-value-entered' );
				} else {
					$thisInput.addClass( 'gf-value-entered' );
				}
			} );
		}
	}
	
	/**
	 * Highlight input elements within required gravity form fields until a value has been properly
	 * entered by the user.
	 *
	 * @param {jQuery} $inputs - The set of input elements contained in required gravity form
	 *     fields.
	 */
	function hghlghtRqrdInpts ( $inputs ) {
		if ( $.isJQueryObj( $inputs ) ) {
			$inputs.each( function () {
				var $thisInput = $( this );
				$thisInput.blur( function () {
					if ( $thisInput.val() == '' ) {
						$thisInput.removeClass( 'gf-value-entered' );
					} else {
						$thisInput.addClass( 'gf-value-entered' );
					}
				} );
			} );
		}
	}

	/**
	 * Check each checkbox list within required gravity form checkbox fields to determine if at
	 * least one checkbox has already been checked by the user and highlight the list if not.
	 *
	 * @param {jQuery} $lists - The set of list elements wrapping checkbox inputs and contained in
	 *     required gravity form fields.
	 */
	function checkRqrdChckbxs ( $lists ) {
		if ( $.isJQueryObj( $lists ) ) {
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
	}

	/**
	 * Highlight required gravity form fields containing checkbox elements until at least one box is
	 * checked by the user.
	 *
	 * @param {jQuery} $lists - The set of list elements wrapping checkbox inputs and contained in
	 *     required gravity form fields.
	 */
	function hghlghtRqrdChckbxs ( $lists ) {
		if ( $.isJQueryObj( $lists ) ) {
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

						$thisParent = $thisChild.parents( 'ul.gfield_checkbox, ul.gfield_radio' );
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
				var $editorForm = $( this ).find( 'iframe' );
				$editorForm.each( function () {
					var $editorBody = $( this ).contents().find( '#tinymce' );
					$editorBody.css( {
						 backgroundColor: 'rgba(255,0,0,0.1)',
						 fontFamily: '"Open sans", sans-serif'
					} );
					$editorBody.focus( function () {
						$( this ).css( 'background-color', 'rgba(255,255,255,1)' );
					} );
					$editorBody.blur( function () {
						var $this = $( this );
						if ( $this.text().replace( /\n|\uFEFF/g, '' ) == '' ) {
							$this.css( 'background-color', 'rgba(255,0,0,0.1)' );
						}
					} );
				} );
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
									var thisFileName = $thisSblngInput.prop( 'files' ).item( 0 ).name;
									valuePassed = originalFileName != thisFileName;
								}
							}
						} );
						$parentNextSblngs.each( function () {
							if ( valuePassed ) {
								var $thisSblng = $( this );
								var $thisSblngInput = $thisSblng.find( "input[type='file']" ).first();
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
						alert('A file with the same name has already been uploaded; please choose a\
 different file.');
						$thisInput.get(0).value = '';
					}
				} else {
					$thisChild.removeClass( 'gf-value-entered' );
				}
			} );
		}
	}
} )( jQuery );

/*!
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 *
 * Copyright (c) 2012-2014, Chris Dance and PaperCut Software http://www.papercut.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:  chris.dance@papercut.com
 * Version: 1.9.0
 * Date:    13th August 2014
 */
(function($) {
  
  $.fn.areYouSure = function(options) {
      
    var settings = $.extend(
      {
        'message' : 'You have unsaved changes!',
        'dirtyClass' : 'dirty',
        'change' : null,
        'silent' : false,
        'addRemoveFieldsMarksDirty' : false,
        'fieldEvents' : 'change keyup propertychange input',
        'fieldSelector': ":input:not(input[type=submit]):not(input[type=button])"
      }, options);

    var getValue = function($field) {
      if ($field.hasClass('ays-ignore')
          || $field.hasClass('aysIgnore')
          || $field.attr('data-ays-ignore')
          || $field.attr('name') === undefined) {
        return null;
      }

      if ($field.is(':disabled')) {
        return 'ays-disabled';
      }

      var val;
      var type = $field.attr('type');
      if ($field.is('select')) {
        type = 'select';
      }

      switch (type) {
        case 'checkbox':
        case 'radio':
          val = $field.is(':checked');
          break;
        case 'select':
          val = '';
          $field.find('option').each(function(o) {
            var $option = $(this);
            if ($option.is(':selected')) {
              val += $option.val();
            }
          });
          break;
        default:
          val = $field.val();
      }

      return val;
    };

    var storeOrigValue = function($field) {
      $field.data('ays-orig', getValue($field));
    };

    var checkForm = function(evt) {

      var isFieldDirty = function($field) {
        var origValue = $field.data('ays-orig');
        if (undefined === origValue) {
          return false;
        }
        return (getValue($field) != origValue);
      };

      var $form = ($(this).is('form')) 
                    ? $(this)
                    : $(this).parents('form');

      // Test on the target first as it's the most likely to be dirty
      if (isFieldDirty($(evt.target))) {
        setDirtyStatus($form, true);
        return;
      }

      $fields = $form.find(settings.fieldSelector);

      if (settings.addRemoveFieldsMarksDirty) {              
        // Check if field count has changed
        var origCount = $form.data("ays-orig-field-count");
        if (origCount != $fields.length) {
          setDirtyStatus($form, true);
          return;
        }
      }

      // Brute force - check each field
      var isDirty = false;
      $fields.each(function() {
        $field = $(this);
        if (isFieldDirty($field)) {
          isDirty = true;
          return false; // break
        }
      });
      
      setDirtyStatus($form, isDirty);
    };

    var initForm = function($form) {
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(function() { storeOrigValue($(this)); });
      $(fields).unbind(settings.fieldEvents, checkForm);
      $(fields).bind(settings.fieldEvents, checkForm);
      $form.data("ays-orig-field-count", $(fields).length);
      setDirtyStatus($form, false);
    };

    var setDirtyStatus = function($form, isDirty) {
      var changed = isDirty != $form.hasClass(settings.dirtyClass);
      $form.toggleClass(settings.dirtyClass, isDirty);
        
      // Fire change event if required
      if (changed) {
        if (settings.change) settings.change.call($form, $form);

        if (isDirty) $form.trigger('dirty.areYouSure', [$form]);
        if (!isDirty) $form.trigger('clean.areYouSure', [$form]);
        $form.trigger('change.areYouSure', [$form]);
      }
    };

    var rescan = function() {
      var $form = $(this);
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(function() {
        var $field = $(this);
        if (!$field.data('ays-orig')) {
          storeOrigValue($field);
          $field.bind(settings.fieldEvents, checkForm);
        }
      });
      // Check for changes while we're here
      $form.trigger('checkform.areYouSure');
    };

    var reinitialize = function() {
      initForm($(this));
    }

    if (!settings.silent && !window.aysUnloadSet) {
      window.aysUnloadSet = true;
      $(window).bind('beforeunload', function() {
        $dirtyForms = $("form").filter('.' + settings.dirtyClass);
        if ($dirtyForms.length == 0) {
          return;
        }
        // Prevent multiple prompts - seen on Chrome and IE
        if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
          if (window.aysHasPrompted) {
            return;
          }
          window.aysHasPrompted = true;
          window.setTimeout(function() {window.aysHasPrompted = false;}, 900);
        }
        return settings.message;
      });
    }

    return this.each(function(elem) {
      if (!$(this).is('form')) {
        return;
      }
      var $form = $(this);
        
      $form.submit(function() {
        $form.removeClass(settings.dirtyClass);
      });
      $form.bind('reset', function() { setDirtyStatus($form, false); });
      // Add a custom events
      $form.bind('rescan.areYouSure', rescan);
      $form.bind('reinitialize.areYouSure', reinitialize);
      $form.bind('checkform.areYouSure', checkForm);
      initForm($form);
    });
  };
})(jQuery);

/*!
 * jQuery.are-you-sure.js: Application of Are-You-Sure jQuery Plugin to WSU OUE websites. Please see
 *     https://github.com/codedance/jquery.AreYouSure/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license.
 * https://opensource.org/licenses/MIT
 */
( function( $ ) {

var thisFileName = 'jquery.are-you-sure.js';

// Code executed after the browser loads the DOM.
$( function() {
	var thisFuncName = 'DOM loaded';
	var thisFuncDesc = 'Code executed after the DOM has loaded';
	var $gForms;
	
	try {
		assertAreYouSureLoaded();
		$gForms = $( '.gform_wrapper > form' );
		$gForms.areYouSure();		
	} catch (errorMsg) {
		$.logError( thisFileName, thisFuncName, thisFuncDesc, errorMsg );
	}
} );

function assertAreYouSureLoaded() {
	if ( !$.fn.areYouSure ) {
		throw 'The Are-You-Sure jQuery plugin is missing; please verify that you included it as a build dependency.';
	}
}

} )( jQuery );

/*! qtip2 v3.0.3 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Wed May 11 2016 22:31:31 */

!function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)}(function(d){"use strict";function e(a,b,c,e){this.id=c,this.target=a,this.tooltip=F,this.elements={target:a},this._id=S+"-"+c,this.timers={img:{}},this.options=b,this.plugins={},this.cache={event:{},target:d(),disabled:E,attr:e,onTooltip:E,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=E}function f(a){return a===F||"object"!==d.type(a)}function g(a){return!(d.isFunction(a)||a&&a.attr||a.length||"object"===d.type(a)&&(a.jquery||a.then))}function h(a){var b,c,e,h;return f(a)?E:(f(a.metadata)&&(a.metadata={type:a.metadata}),"content"in a&&(b=a.content,f(b)||b.jquery||b.done?(c=g(b)?E:b,b=a.content={text:c}):c=b.text,"ajax"in b&&(e=b.ajax,h=e&&e.once!==E,delete b.ajax,b.text=function(a,b){var f=c||d(this).attr(b.options.content.attr)||"Loading...",g=d.ajax(d.extend({},e,{context:b})).then(e.success,F,e.error).then(function(a){return a&&h&&b.set("content.text",a),a},function(a,c,d){b.destroyed||0===a.status||b.set("content.text",c+": "+d)});return h?f:(b.set("content.text",f),g)}),"title"in b&&(d.isPlainObject(b.title)&&(b.button=b.title.button,b.title=b.title.text),g(b.title||E)&&(b.title=E))),"position"in a&&f(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&f(a.show)&&(a.show=a.show.jquery?{target:a.show}:a.show===D?{ready:D}:{event:a.show}),"hide"in a&&f(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&f(a.style)&&(a.style={classes:a.style}),d.each(R,function(){this.sanitize&&this.sanitize(a)}),a)}function i(a,b){for(var c,d=0,e=a,f=b.split(".");e=e[f[d++]];)d<f.length&&(c=e);return[c||a,f.pop()]}function j(a,b){var c,d,e;for(c in this.checks)if(this.checks.hasOwnProperty(c))for(d in this.checks[c])this.checks[c].hasOwnProperty(d)&&(e=new RegExp(d,"i").exec(a))&&(b.push(e),("builtin"===c||this.plugins[c])&&this.checks[c][d].apply(this.plugins[c]||this,b))}function k(a){return V.concat("").join(a?"-"+a+" ":" ")}function l(a,b){return b>0?setTimeout(d.proxy(a,this),b):void a.call(this)}function m(a){this.tooltip.hasClass(aa)||(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=l.call(this,function(){this.toggle(D,a)},this.options.show.delay))}function n(a){if(!this.tooltip.hasClass(aa)&&!this.destroyed){var b=d(a.relatedTarget),c=b.closest(W)[0]===this.tooltip[0],e=b[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==b[0]&&"mouse"===this.options.position.target&&c||this.options.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(c||e))try{a.preventDefault(),a.stopImmediatePropagation()}catch(f){}else this.timers.hide=l.call(this,function(){this.toggle(E,a)},this.options.hide.delay,this)}}function o(a){!this.tooltip.hasClass(aa)&&this.options.hide.inactive&&(clearTimeout(this.timers.inactive),this.timers.inactive=l.call(this,function(){this.hide(a)},this.options.hide.inactive))}function p(a){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(a)}function q(a,c,e){d(b.body).delegate(a,(c.split?c:c.join("."+S+" "))+"."+S,function(){var a=y.api[d.attr(this,U)];a&&!a.disabled&&e.apply(a,arguments)})}function r(a,c,f){var g,i,j,k,l,m=d(b.body),n=a[0]===b?m:a,o=a.metadata?a.metadata(f.metadata):F,p="html5"===f.metadata.type&&o?o[f.metadata.name]:F,q=a.data(f.metadata.name||"qtipopts");try{q="string"==typeof q?d.parseJSON(q):q}catch(r){}if(k=d.extend(D,{},y.defaults,f,"object"==typeof q?h(q):F,h(p||o)),i=k.position,k.id=c,"boolean"==typeof k.content.text){if(j=a.attr(k.content.attr),k.content.attr===E||!j)return E;k.content.text=j}if(i.container.length||(i.container=m),i.target===E&&(i.target=n),k.show.target===E&&(k.show.target=n),k.show.solo===D&&(k.show.solo=i.container.closest("body")),k.hide.target===E&&(k.hide.target=n),k.position.viewport===D&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new A(i.at,D),i.my=new A(i.my),a.data(S))if(k.overwrite)a.qtip("destroy",!0);else if(k.overwrite===E)return E;return a.attr(T,c),k.suppress&&(l=a.attr("title"))&&a.removeAttr("title").attr(ca,l).attr("title",""),g=new e(a,k,c,!!j),a.data(S,g),g}function s(a){return a.charAt(0).toUpperCase()+a.slice(1)}function t(a,b){var d,e,f=b.charAt(0).toUpperCase()+b.slice(1),g=(b+" "+va.join(f+" ")+f).split(" "),h=0;if(ua[b])return a.css(ua[b]);for(;d=g[h++];)if((e=a.css(d))!==c)return ua[b]=d,e}function u(a,b){return Math.ceil(parseFloat(t(a,b)))}function v(a,b){this._ns="tip",this.options=b,this.offset=b.offset,this.size=[b.width,b.height],this.qtip=a,this.init(a)}function w(a,b){this.options=b,this._ns="-modal",this.qtip=a,this.init(a)}function x(a){this._ns="ie6",this.qtip=a,this.init(a)}var y,z,A,B,C,D=!0,E=!1,F=null,G="x",H="y",I="width",J="height",K="top",L="left",M="bottom",N="right",O="center",P="flipinvert",Q="shift",R={},S="qtip",T="data-hasqtip",U="data-qtip-id",V=["ui-widget","ui-tooltip"],W="."+S,X="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),Y=S+"-fixed",Z=S+"-default",$=S+"-focus",_=S+"-hover",aa=S+"-disabled",ba="_replacedByqTip",ca="oldtitle",da={ie:function(){var a,c;for(a=4,c=b.createElement("div");(c.innerHTML="<!--[if gt IE "+a+"]><i></i><![endif]-->")&&c.getElementsByTagName("i")[0];a+=1);return a>4?a:NaN}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||E};z=e.prototype,z._when=function(a){return d.when.apply(d,a)},z.render=function(a){if(this.rendered||this.destroyed)return this;var b=this,c=this.options,e=this.cache,f=this.elements,g=c.content.text,h=c.content.title,i=c.content.button,j=c.position,k=[];return d.attr(this.target[0],"aria-describedby",this._id),e.posClass=this._createPosClass((this.position={my:j.my,at:j.at}).my),this.tooltip=f.tooltip=d("<div/>",{id:this._id,"class":[S,Z,c.style.classes,e.posClass].join(" "),width:c.style.width||"",height:c.style.height||"",tracking:"mouse"===j.target&&j.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":E,"aria-describedby":this._id+"-content","aria-hidden":D}).toggleClass(aa,this.disabled).attr(U,this.id).data(S,this).appendTo(j.container).append(f.content=d("<div />",{"class":S+"-content",id:this._id+"-content","aria-atomic":D})),this.rendered=-1,this.positioning=D,h&&(this._createTitle(),d.isFunction(h)||k.push(this._updateTitle(h,E))),i&&this._createButton(),d.isFunction(g)||k.push(this._updateContent(g,E)),this.rendered=D,this._setWidget(),d.each(R,function(a){var c;"render"===this.initialize&&(c=this(b))&&(b.plugins[a]=c)}),this._unassignEvents(),this._assignEvents(),this._when(k).then(function(){b._trigger("render"),b.positioning=E,b.hiddenDuringWait||!c.show.ready&&!a||b.toggle(D,e.event,E),b.hiddenDuringWait=E}),y.api[this.id]=this,this},z.destroy=function(a){function b(){if(!this.destroyed){this.destroyed=D;var a,b=this.target,c=b.attr(ca);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),d.each(this.plugins,function(){this.destroy&&this.destroy()});for(a in this.timers)this.timers.hasOwnProperty(a)&&clearTimeout(this.timers[a]);b.removeData(S).removeAttr(U).removeAttr(T).removeAttr("aria-describedby"),this.options.suppress&&c&&b.attr("title",c).removeAttr(ca),this._unassignEvents(),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=F,delete y.api[this.id]}}return this.destroyed?this.target:(a===D&&"hide"!==this.triggering||!this.rendered?b.call(this):(this.tooltip.one("tooltiphidden",d.proxy(b,this)),!this.triggering&&this.hide()),this.target)},B=z.checks={builtin:{"^id$":function(a,b,c,e){var f=c===D?y.nextid:c,g=S+"-"+f;f!==E&&f.length>0&&!d("#"+g).length?(this._id=g,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):a[b]=e},"^prerender":function(a,b,c){c&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(a,b,c){this._updateContent(c)},"^content.attr$":function(a,b,c,d){this.options.content.text===this.target.attr(d)&&this._updateContent(this.target.attr(c))},"^content.title$":function(a,b,c){return c?(c&&!this.elements.title&&this._createTitle(),void this._updateTitle(c)):this._removeTitle()},"^content.button$":function(a,b,c){this._updateButton(c)},"^content.title.(text|button)$":function(a,b,c){this.set("content."+b,c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(this.position[b]=a[b]=new A(c,"at"===b))},"^position.container$":function(a,b,c){this.rendered&&this.tooltip.appendTo(c)},"^show.ready$":function(a,b,c){c&&(!this.rendered&&this.render(D)||this.toggle(D))},"^style.classes$":function(a,b,c,d){this.rendered&&this.tooltip.removeClass(d).addClass(c)},"^style.(width|height)":function(a,b,c){this.rendered&&this.tooltip.css(b,c)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(a,b,c){this.rendered&&this.tooltip.toggleClass(Z,!!c)},"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){this.rendered&&this.tooltip[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var a=this.options.position;this.tooltip.attr("tracking","mouse"===a.target&&a.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},z.get=function(a){if(this.destroyed)return this;var b=i(this.options,a.toLowerCase()),c=b[0][b[1]];return c.precedance?c.string():c};var ea=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,fa=/^prerender|show\.ready/i;z.set=function(a,b){if(this.destroyed)return this;var c,e=this.rendered,f=E,g=this.options;return"string"==typeof a?(c=a,a={},a[c]=b):a=d.extend({},a),d.each(a,function(b,c){if(e&&fa.test(b))return void delete a[b];var h,j=i(g,b.toLowerCase());h=j[0][j[1]],j[0][j[1]]=c&&c.nodeType?d(c):c,f=ea.test(b)||f,a[b]=[j[0],j[1],c,h]}),h(g),this.positioning=D,d.each(a,d.proxy(j,this)),this.positioning=E,this.rendered&&this.tooltip[0].offsetWidth>0&&f&&this.reposition("mouse"===g.position.target?F:this.cache.event),this},z._update=function(a,b){var c=this,e=this.cache;return this.rendered&&a?(d.isFunction(a)&&(a=a.call(this.elements.target,e.event,this)||""),d.isFunction(a.then)?(e.waiting=D,a.then(function(a){return e.waiting=E,c._update(a,b)},F,function(a){return c._update(a,b)})):a===E||!a&&""!==a?E:(a.jquery&&a.length>0?b.empty().append(a.css({display:"block",visibility:"visible"})):b.html(a),this._waitForContent(b).then(function(a){c.rendered&&c.tooltip[0].offsetWidth>0&&c.reposition(e.event,!a.length)}))):E},z._waitForContent=function(a){var b=this.cache;return b.waiting=D,(d.fn.imagesLoaded?a.imagesLoaded():(new d.Deferred).resolve([])).done(function(){b.waiting=E}).promise()},z._updateContent=function(a,b){this._update(a,this.elements.content,b)},z._updateTitle=function(a,b){this._update(a,this.elements.title,b)===E&&this._removeTitle(E)},z._createTitle=function(){var a=this.elements,b=this._id+"-title";a.titlebar&&this._removeTitle(),a.titlebar=d("<div />",{"class":S+"-titlebar "+(this.options.style.widget?k("header"):"")}).append(a.title=d("<div />",{id:b,"class":S+"-title","aria-atomic":D})).insertBefore(a.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover","mouseover"===a.type)}),this.options.content.button&&this._createButton()},z._removeTitle=function(a){var b=this.elements;b.title&&(b.titlebar.remove(),b.titlebar=b.title=b.button=F,a!==E&&this.reposition())},z._createPosClass=function(a){return S+"-pos-"+(a||this.options.position.my).abbrev()},z.reposition=function(c,e){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=D;var f,g,h,i,j=this.cache,k=this.tooltip,l=this.options.position,m=l.target,n=l.my,o=l.at,p=l.viewport,q=l.container,r=l.adjust,s=r.method.split(" "),t=k.outerWidth(E),u=k.outerHeight(E),v=0,w=0,x=k.css("position"),y={left:0,top:0},z=k[0].offsetWidth>0,A=c&&"scroll"===c.type,B=d(a),C=q[0].ownerDocument,F=this.mouse;if(d.isArray(m)&&2===m.length)o={x:L,y:K},y={left:m[0],top:m[1]};else if("mouse"===m)o={x:L,y:K},(!r.mouse||this.options.hide.distance)&&j.origin&&j.origin.pageX?c=j.origin:!c||c&&("resize"===c.type||"scroll"===c.type)?c=j.event:F&&F.pageX&&(c=F),"static"!==x&&(y=q.offset()),C.body.offsetWidth!==(a.innerWidth||C.documentElement.clientWidth)&&(g=d(b.body).offset()),y={left:c.pageX-y.left+(g&&g.left||0),top:c.pageY-y.top+(g&&g.top||0)},r.mouse&&A&&F&&(y.left-=(F.scrollX||0)-B.scrollLeft(),y.top-=(F.scrollY||0)-B.scrollTop());else{if("event"===m?c&&c.target&&"scroll"!==c.type&&"resize"!==c.type?j.target=d(c.target):c.target||(j.target=this.elements.target):"event"!==m&&(j.target=d(m.jquery?m:this.elements.target)),m=j.target,m=d(m).eq(0),0===m.length)return this;m[0]===b||m[0]===a?(v=da.iOS?a.innerWidth:m.width(),w=da.iOS?a.innerHeight:m.height(),m[0]===a&&(y={top:(p||m).scrollTop(),left:(p||m).scrollLeft()})):R.imagemap&&m.is("area")?f=R.imagemap(this,m,o,R.viewport?s:E):R.svg&&m&&m[0].ownerSVGElement?f=R.svg(this,m,o,R.viewport?s:E):(v=m.outerWidth(E),w=m.outerHeight(E),y=m.offset()),f&&(v=f.width,w=f.height,g=f.offset,y=f.position),y=this.reposition.offset(m,y,q),(da.iOS>3.1&&da.iOS<4.1||da.iOS>=4.3&&da.iOS<4.33||!da.iOS&&"fixed"===x)&&(y.left-=B.scrollLeft(),y.top-=B.scrollTop()),(!f||f&&f.adjustable!==E)&&(y.left+=o.x===N?v:o.x===O?v/2:0,y.top+=o.y===M?w:o.y===O?w/2:0)}return y.left+=r.x+(n.x===N?-t:n.x===O?-t/2:0),y.top+=r.y+(n.y===M?-u:n.y===O?-u/2:0),R.viewport?(h=y.adjusted=R.viewport(this,y,l,v,w,t,u),g&&h.left&&(y.left+=g.left),g&&h.top&&(y.top+=g.top),h.my&&(this.position.my=h.my)):y.adjusted={left:0,top:0},j.posClass!==(i=this._createPosClass(this.position.my))&&(j.posClass=i,k.removeClass(j.posClass).addClass(i)),this._trigger("move",[y,p.elem||p],c)?(delete y.adjusted,e===E||!z||isNaN(y.left)||isNaN(y.top)||"mouse"===m||!d.isFunction(l.effect)?k.css(y):d.isFunction(l.effect)&&(l.effect.call(k,this,d.extend({},y)),k.queue(function(a){d(this).css({opacity:"",height:""}),da.ie&&this.style.removeAttribute("filter"),a()})),this.positioning=E,this):this},z.reposition.offset=function(a,c,e){function f(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}if(!e[0])return c;var g,h,i,j,k=d(a[0].ownerDocument),l=!!da.ie&&"CSS1Compat"!==b.compatMode,m=e[0];do"static"!==(h=d.css(m,"position"))&&("fixed"===h?(i=m.getBoundingClientRect(),f(k,-1)):(i=d(m).position(),i.left+=parseFloat(d.css(m,"borderLeftWidth"))||0,i.top+=parseFloat(d.css(m,"borderTopWidth"))||0),c.left-=i.left+(parseFloat(d.css(m,"marginLeft"))||0),c.top-=i.top+(parseFloat(d.css(m,"marginTop"))||0),g||"hidden"===(j=d.css(m,"overflow"))||"visible"===j||(g=d(m)));while(m=m.offsetParent);return g&&(g[0]!==k[0]||l)&&f(g,1),c};var ga=(A=z.reposition.Corner=function(a,b){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,O).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!b;var c=a.charAt(0);this.precedance="t"===c||"b"===c?H:G}).prototype;ga.invert=function(a,b){this[a]=this[a]===L?N:this[a]===N?L:b||this[a]},ga.string=function(a){var b=this.x,c=this.y,d=b!==c?"center"===b||"center"!==c&&(this.precedance===H||this.forceY)?[c,b]:[b,c]:[b];return a!==!1?d.join(" "):d},ga.abbrev=function(){var a=this.string(!1);return a[0].charAt(0)+(a[1]&&a[1].charAt(0)||"")},ga.clone=function(){return new A(this.string(),this.forceY)},z.toggle=function(a,c){var e=this.cache,f=this.options,g=this.tooltip;if(c){if(/over|enter/.test(c.type)&&e.event&&/out|leave/.test(e.event.type)&&f.show.target.add(c.target).length===f.show.target.length&&g.has(c.relatedTarget).length)return this;e.event=d.event.fix(c)}if(this.waiting&&!a&&(this.hiddenDuringWait=D),!this.rendered)return a?this.render(1):this;if(this.destroyed||this.disabled)return this;var h,i,j,k=a?"show":"hide",l=this.options[k],m=this.options.position,n=this.options.content,o=this.tooltip.css("width"),p=this.tooltip.is(":visible"),q=a||1===l.target.length,r=!c||l.target.length<2||e.target[0]===c.target;return(typeof a).search("boolean|number")&&(a=!p),h=!g.is(":animated")&&p===a&&r,i=h?F:!!this._trigger(k,[90]),this.destroyed?this:(i!==E&&a&&this.focus(c),!i||h?this:(d.attr(g[0],"aria-hidden",!a),a?(this.mouse&&(e.origin=d.event.fix(this.mouse)),d.isFunction(n.text)&&this._updateContent(n.text,E),d.isFunction(n.title)&&this._updateTitle(n.title,E),!C&&"mouse"===m.target&&m.adjust.mouse&&(d(b).bind("mousemove."+S,this._storeMouse),C=D),o||g.css("width",g.outerWidth(E)),this.reposition(c,arguments[2]),o||g.css("width",""),l.solo&&("string"==typeof l.solo?d(l.solo):d(W,l.solo)).not(g).not(l.target).qtip("hide",new d.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete e.origin,C&&!d(W+'[tracking="true"]:visible',l.solo).not(g).length&&(d(b).unbind("mousemove."+S),C=E),this.blur(c)),j=d.proxy(function(){a?(da.ie&&g[0].style.removeAttribute("filter"),g.css("overflow",""),"string"==typeof l.autofocus&&d(this.options.show.autofocus,g).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):g.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(a?"visible":"hidden")},this),l.effect===E||q===E?(g[k](),j()):d.isFunction(l.effect)?(g.stop(1,1),l.effect.call(g,this),g.queue("fx",function(a){j(),a()})):g.fadeTo(90,a?1:0,j),a&&l.target.trigger("qtip-"+this.id+"-inactive"),this))},z.show=function(a){return this.toggle(D,a)},z.hide=function(a){return this.toggle(E,a)},z.focus=function(a){if(!this.rendered||this.destroyed)return this;var b=d(W),c=this.tooltip,e=parseInt(c[0].style.zIndex,10),f=y.zindex+b.length;return c.hasClass($)||this._trigger("focus",[f],a)&&(e!==f&&(b.each(function(){this.style.zIndex>e&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+$).qtip("blur",a)),c.addClass($)[0].style.zIndex=f),this},z.blur=function(a){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass($),this._trigger("blur",[this.tooltip.css("zIndex")],a),this)},z.disable=function(a){return this.destroyed?this:("toggle"===a?a=!(this.rendered?this.tooltip.hasClass(aa):this.disabled):"boolean"!=typeof a&&(a=D),this.rendered&&this.tooltip.toggleClass(aa,a).attr("aria-disabled",a),this.disabled=!!a,this)},z.enable=function(){return this.disable(E)},z._createButton=function(){var a=this,b=this.elements,c=b.tooltip,e=this.options.content.button,f="string"==typeof e,g=f?e:"Close tooltip";b.button&&b.button.remove(),e.jquery?b.button=e:b.button=d("<a />",{"class":"qtip-close "+(this.options.style.widget?"":S+"-icon"),title:g,"aria-label":g}).prepend(d("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),b.button.appendTo(b.titlebar||c).attr("role","button").click(function(b){return c.hasClass(aa)||a.hide(b),E})},z._updateButton=function(a){if(!this.rendered)return E;var b=this.elements.button;a?this._createButton():b.remove()},z._setWidget=function(){var a=this.options.style.widget,b=this.elements,c=b.tooltip,d=c.hasClass(aa);c.removeClass(aa),aa=a?"ui-state-disabled":"qtip-disabled",c.toggleClass(aa,d),c.toggleClass("ui-helper-reset "+k(),a).toggleClass(Z,this.options.style.def&&!a),b.content&&b.content.toggleClass(k("content"),a),b.titlebar&&b.titlebar.toggleClass(k("header"),a),b.button&&b.button.toggleClass(S+"-icon",!a)},z._storeMouse=function(a){return(this.mouse=d.event.fix(a)).type="mousemove",this},z._bind=function(a,b,c,e,f){if(a&&c&&b.length){var g="."+this._id+(e?"-"+e:"");return d(a).bind((b.split?b:b.join(g+" "))+g,d.proxy(c,f||this)),this}},z._unbind=function(a,b){return a&&d(a).unbind("."+this._id+(b?"-"+b:"")),this},z._trigger=function(a,b,c){var e=new d.Event("tooltip"+a);return e.originalEvent=c&&d.extend({},c)||this.cache.event||F,this.triggering=a,this.tooltip.trigger(e,[this].concat(b||[])),this.triggering=E,!e.isDefaultPrevented()},z._bindEvents=function(a,b,c,e,f,g){var h=c.filter(e).add(e.filter(c)),i=[];h.length&&(d.each(b,function(b,c){var e=d.inArray(c,a);e>-1&&i.push(a.splice(e,1)[0])}),i.length&&(this._bind(h,i,function(a){var b=this.rendered?this.tooltip[0].offsetWidth>0:!1;(b?g:f).call(this,a)}),c=c.not(h),e=e.not(h))),this._bind(c,a,f),this._bind(e,b,g)},z._assignInitialEvents=function(a){function b(a){return this.disabled||this.destroyed?E:(this.cache.event=a&&d.event.fix(a),this.cache.target=a&&d(a.target),clearTimeout(this.timers.show),void(this.timers.show=l.call(this,function(){this.render("object"==typeof a||c.show.ready)},c.prerender?0:c.show.delay)))}var c=this.options,e=c.show.target,f=c.hide.target,g=c.show.event?d.trim(""+c.show.event).split(" "):[],h=c.hide.event?d.trim(""+c.hide.event).split(" "):[];this._bind(this.elements.target,["remove","removeqtip"],function(){this.destroy(!0)},"destroy"),/mouse(over|enter)/i.test(c.show.event)&&!/mouse(out|leave)/i.test(c.hide.event)&&h.push("mouseleave"),this._bind(e,"mousemove",function(a){this._storeMouse(a),this.cache.onTarget=D}),this._bindEvents(g,h,e,f,b,function(){return this.timers?void clearTimeout(this.timers.show):E}),(c.show.ready||c.prerender)&&b.call(this,a)},z._assignEvents=function(){var c=this,e=this.options,f=e.position,g=this.tooltip,h=e.show.target,i=e.hide.target,j=f.container,k=f.viewport,l=d(b),q=d(a),r=e.show.event?d.trim(""+e.show.event).split(" "):[],s=e.hide.event?d.trim(""+e.hide.event).split(" "):[];d.each(e.events,function(a,b){c._bind(g,"toggle"===a?["tooltipshow","tooltiphide"]:["tooltip"+a],b,null,g)}),/mouse(out|leave)/i.test(e.hide.event)&&"window"===e.hide.leave&&this._bind(l,["mouseout","blur"],function(a){/select|option/.test(a.target.nodeName)||a.relatedTarget||this.hide(a)}),e.hide.fixed?i=i.add(g.addClass(Y)):/mouse(over|enter)/i.test(e.show.event)&&this._bind(i,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+e.hide.event).indexOf("unfocus")>-1&&this._bind(j.closest("html"),["mousedown","touchstart"],function(a){var b=d(a.target),c=this.rendered&&!this.tooltip.hasClass(aa)&&this.tooltip[0].offsetWidth>0,e=b.parents(W).filter(this.tooltip[0]).length>0;b[0]===this.target[0]||b[0]===this.tooltip[0]||e||this.target.has(b[0]).length||!c||this.hide(a)}),"number"==typeof e.hide.inactive&&(this._bind(h,"qtip-"+this.id+"-inactive",o,"inactive"),this._bind(i.add(g),y.inactiveEvents,o)),this._bindEvents(r,s,h,i,m,n),this._bind(h.add(g),"mousemove",function(a){if("number"==typeof e.hide.distance){var b=this.cache.origin||{},c=this.options.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&this.hide(a)}this._storeMouse(a)}),"mouse"===f.target&&f.adjust.mouse&&(e.hide.event&&this._bind(h,["mouseenter","mouseleave"],function(a){return this.cache?void(this.cache.onTarget="mouseenter"===a.type):E}),this._bind(l,"mousemove",function(a){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(aa)&&this.tooltip[0].offsetWidth>0&&this.reposition(a)})),(f.adjust.resize||k.length)&&this._bind(d.event.special.resize?k:q,"resize",p),f.adjust.scroll&&this._bind(q.add(f.container),"scroll",p)},z._unassignEvents=function(){var c=this.options,e=c.show.target,f=c.hide.target,g=d.grep([this.elements.target[0],this.rendered&&this.tooltip[0],c.position.container[0],c.position.viewport[0],c.position.container.closest("html")[0],a,b],function(a){return"object"==typeof a});e&&e.toArray&&(g=g.concat(e.toArray())),f&&f.toArray&&(g=g.concat(f.toArray())),this._unbind(g)._unbind(g,"destroy")._unbind(g,"inactive")},d(function(){q(W,["mouseenter","mouseleave"],function(a){var b="mouseenter"===a.type,c=d(a.currentTarget),e=d(a.relatedTarget||a.target),f=this.options;b?(this.focus(a),c.hasClass(Y)&&!c.hasClass(aa)&&clearTimeout(this.timers.hide)):"mouse"===f.position.target&&f.position.adjust.mouse&&f.hide.event&&f.show.target&&!e.closest(f.show.target[0]).length&&this.hide(a),c.toggleClass(_,b)}),q("["+U+"]",X,o)}),y=d.fn.qtip=function(a,b,e){var f=(""+a).toLowerCase(),g=F,i=d.makeArray(arguments).slice(1),j=i[i.length-1],k=this[0]?d.data(this[0],S):F;return!arguments.length&&k||"api"===f?k:"string"==typeof a?(this.each(function(){var a=d.data(this,S);if(!a)return D;if(j&&j.timeStamp&&(a.cache.event=j),!b||"option"!==f&&"options"!==f)a[f]&&a[f].apply(a,i);else{if(e===c&&!d.isPlainObject(b))return g=a.get(b),E;a.set(b,e)}}),g!==F?g:this):"object"!=typeof a&&arguments.length?void 0:(k=h(d.extend(D,{},a)),this.each(function(a){var b,c;return c=d.isArray(k.id)?k.id[a]:k.id,c=!c||c===E||c.length<1||y.api[c]?y.nextid++:c,b=r(d(this),c,k),b===E?D:(y.api[c]=b,d.each(R,function(){"initialize"===this.initialize&&this(b)}),void b._assignInitialEvents(j))}))},d.qtip=e,y.api={},d.each({attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&f.options&&"object"==typeof f&&"object"==typeof f.options&&f.options.suppress)return arguments.length<2?d.attr(c,ca):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr(ca,b))}return d.fn["attr"+ba].apply(this,arguments)},clone:function(a){var b=d.fn["clone"+ba].apply(this,arguments);return a||b.filter("["+ca+"]").attr("title",function(){return d.attr(this,ca)}).removeAttr(ca),b}},function(a,b){if(!b||d.fn[a+ba])return D;var c=d.fn[a+ba]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+ba]=d.cleanData,d.cleanData=function(a){for(var b,c=0;(b=d(a[c])).length;c++)if(b.attr(T))try{b.triggerHandler("removeqtip")}catch(e){}d["cleanData"+ba].apply(this,arguments)}),y.version="3.0.3",y.nextid=0,y.inactiveEvents=X,y.zindex=15e3,y.defaults={prerender:E,id:E,overwrite:D,suppress:D,content:{text:D,attr:"title",title:E,button:E},position:{my:"top left",at:"bottom right",target:E,container:E,viewport:E,adjust:{x:0,y:0,mouse:D,scroll:D,resize:D,method:"flipinvert flipinvert"},effect:function(a,b){d(this).animate(b,{duration:200,queue:E})}},show:{target:E,event:"mouseenter",effect:D,delay:90,solo:E,ready:E,autofocus:E},hide:{target:E,event:"mouseleave",effect:D,delay:0,fixed:E,inactive:E,leave:"window",distance:E},style:{classes:"",widget:E,width:E,height:E,def:D},events:{render:F,move:F,show:F,hide:F,toggle:F,visible:F,hidden:F,focus:F,blur:F}};var ha,ia,ja,ka,la,ma="margin",na="border",oa="color",pa="background-color",qa="transparent",ra=" !important",sa=!!b.createElement("canvas").getContext,ta=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,ua={},va=["Webkit","O","Moz","ms"];sa?(ka=a.devicePixelRatio||1,la=function(){var a=b.createElement("canvas").getContext("2d");return a.backingStorePixelRatio||a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||1}(),ja=ka/la):ia=function(a,b,c){return"<qtipvml:"+a+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(b||"")+' style="behavior: url(#default#VML); '+(c||"")+'" />'},d.extend(v.prototype,{init:function(a){var b,c;c=this.element=a.elements.tip=d("<div />",{"class":S+"-tip"}).prependTo(a.tooltip),sa?(b=d("<canvas />").appendTo(this.element)[0].getContext("2d"),b.lineJoin="miter",b.miterLimit=1e5,b.save()):(b=ia("shape",'coordorigin="0,0"',"position:absolute;"),this.element.html(b+b),a._bind(d("*",c).add(c),["click","mousedown"],function(a){a.stopPropagation()},this._ns)),a._bind(a.tooltip,"tooltipmove",this.reposition,this._ns,this),this.create()},_swapDimensions:function(){this.size[0]=this.options.height,this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width,this.size[1]=this.options.height},_useTitle:function(a){var b=this.qtip.elements.titlebar;return b&&(a.y===K||a.y===O&&this.element.position().top+this.size[1]/2+this.options.offset<b.outerHeight(D))},_parseCorner:function(a){var b=this.qtip.options.position.my;return a===E||b===E?a=E:a===D?a=new A(b.string()):a.string||(a=new A(a),a.fixed=D),a},_parseWidth:function(a,b,c){var d=this.qtip.elements,e=na+s(b)+"Width";return(c?u(c,e):u(d.content,e)||u(this._useTitle(a)&&d.titlebar||d.content,e)||u(d.tooltip,e))||0},_parseRadius:function(a){var b=this.qtip.elements,c=na+s(a.y)+s(a.x)+"Radius";return da.ie<9?0:u(this._useTitle(a)&&b.titlebar||b.content,c)||u(b.tooltip,c)||0},_invalidColour:function(a,b,c){var d=a.css(b);return!d||c&&d===a.css(c)||ta.test(d)?E:d},_parseColours:function(a){var b=this.qtip.elements,c=this.element.css("cssText",""),e=na+s(a[a.precedance])+s(oa),f=this._useTitle(a)&&b.titlebar||b.content,g=this._invalidColour,h=[];return h[0]=g(c,pa)||g(f,pa)||g(b.content,pa)||g(b.tooltip,pa)||c.css(pa),h[1]=g(c,e,oa)||g(f,e,oa)||g(b.content,e,oa)||g(b.tooltip,e,oa)||b.tooltip.css(e),d("*",c).add(c).css("cssText",pa+":"+qa+ra+";"+na+":0"+ra+";"),h},_calculateSize:function(a){var b,c,d,e=a.precedance===H,f=this.options.width,g=this.options.height,h="c"===a.abbrev(),i=(e?f:g)*(h?.5:1),j=Math.pow,k=Math.round,l=Math.sqrt(j(i,2)+j(g,2)),m=[this.border/i*l,this.border/g*l];return m[2]=Math.sqrt(j(m[0],2)-j(this.border,2)),m[3]=Math.sqrt(j(m[1],2)-j(this.border,2)),b=l+m[2]+m[3]+(h?0:m[0]),c=b/l,d=[k(c*f),k(c*g)],e?d:d.reverse()},_calculateTip:function(a,b,c){c=c||1,b=b||this.size;var d=b[0]*c,e=b[1]*c,f=Math.ceil(d/2),g=Math.ceil(e/2),h={br:[0,0,d,e,d,0],bl:[0,0,d,0,0,e],tr:[0,e,d,0,d,e],tl:[0,0,0,e,d,e],tc:[0,e,f,0,d,e],bc:[0,0,d,0,f,e],rc:[0,0,d,g,0,e],lc:[d,0,d,e,0,g]};return h.lt=h.br,h.rt=h.bl,h.lb=h.tr,h.rb=h.tl,h[a.abbrev()]},_drawCoords:function(a,b){a.beginPath(),a.moveTo(b[0],b[1]),a.lineTo(b[2],b[3]),a.lineTo(b[4],b[5]),a.closePath()},create:function(){var a=this.corner=(sa||da.ie)&&this._parseCorner(this.options.corner);return this.enabled=!!this.corner&&"c"!==this.corner.abbrev(),this.enabled&&(this.qtip.cache.corner=a.clone(),this.update()),this.element.toggle(this.enabled),this.corner},update:function(b,c){if(!this.enabled)return this;var e,f,g,h,i,j,k,l,m=this.qtip.elements,n=this.element,o=n.children(),p=this.options,q=this.size,r=p.mimic,s=Math.round;b||(b=this.qtip.cache.corner||this.corner),r===E?r=b:(r=new A(r),r.precedance=b.precedance,"inherit"===r.x?r.x=b.x:"inherit"===r.y?r.y=b.y:r.x===r.y&&(r[b.precedance]=b[b.precedance])),f=r.precedance,b.precedance===G?this._swapDimensions():this._resetDimensions(),e=this.color=this._parseColours(b),e[1]!==qa?(l=this.border=this._parseWidth(b,b[b.precedance]),p.border&&1>l&&!ta.test(e[1])&&(e[0]=e[1]),this.border=l=p.border!==D?p.border:l):this.border=l=0,k=this.size=this._calculateSize(b),n.css({width:k[0],height:k[1],lineHeight:k[1]+"px"}),j=b.precedance===H?[s(r.x===L?l:r.x===N?k[0]-q[0]-l:(k[0]-q[0])/2),s(r.y===K?k[1]-q[1]:0)]:[s(r.x===L?k[0]-q[0]:0),s(r.y===K?l:r.y===M?k[1]-q[1]-l:(k[1]-q[1])/2)],sa?(g=o[0].getContext("2d"),g.restore(),g.save(),g.clearRect(0,0,6e3,6e3),h=this._calculateTip(r,q,ja),i=this._calculateTip(r,this.size,ja),o.attr(I,k[0]*ja).attr(J,k[1]*ja),o.css(I,k[0]).css(J,k[1]),this._drawCoords(g,i),g.fillStyle=e[1],g.fill(),g.translate(j[0]*ja,j[1]*ja),this._drawCoords(g,h),g.fillStyle=e[0],g.fill()):(h=this._calculateTip(r),h="m"+h[0]+","+h[1]+" l"+h[2]+","+h[3]+" "+h[4]+","+h[5]+" xe",j[2]=l&&/^(r|b)/i.test(b.string())?8===da.ie?2:1:0,o.css({coordsize:k[0]+l+" "+k[1]+l,antialias:""+(r.string().indexOf(O)>-1),left:j[0]-j[2]*Number(f===G),top:j[1]-j[2]*Number(f===H),width:k[0]+l,height:k[1]+l}).each(function(a){var b=d(this);b[b.prop?"prop":"attr"]({coordsize:k[0]+l+" "+k[1]+l,path:h,fillcolor:e[0],filled:!!a,stroked:!a}).toggle(!(!l&&!a)),!a&&b.html(ia("stroke",'weight="'+2*l+'px" color="'+e[1]+'" miterlimit="1000" joinstyle="miter"'))})),a.opera&&setTimeout(function(){m.tip.css({display:"inline-block",visibility:"visible"})},1),c!==E&&this.calculate(b,k)},calculate:function(a,b){if(!this.enabled)return E;var c,e,f=this,g=this.qtip.elements,h=this.element,i=this.options.offset,j={};
return a=a||this.corner,c=a.precedance,b=b||this._calculateSize(a),e=[a.x,a.y],c===G&&e.reverse(),d.each(e,function(d,e){var h,k,l;e===O?(h=c===H?L:K,j[h]="50%",j[ma+"-"+h]=-Math.round(b[c===H?0:1]/2)+i):(h=f._parseWidth(a,e,g.tooltip),k=f._parseWidth(a,e,g.content),l=f._parseRadius(a),j[e]=Math.max(-f.border,d?k:i+(l>h?l:-h)))}),j[a[c]]-=b[c===G?0:1],h.css({margin:"",top:"",bottom:"",left:"",right:""}).css(j),j},reposition:function(a,b,d){function e(a,b,c,d,e){a===Q&&j.precedance===b&&k[d]&&j[c]!==O?j.precedance=j.precedance===G?H:G:a!==Q&&k[d]&&(j[b]=j[b]===O?k[d]>0?d:e:j[b]===d?e:d)}function f(a,b,e){j[a]===O?p[ma+"-"+b]=o[a]=g[ma+"-"+b]-k[b]:(h=g[e]!==c?[k[b],-g[b]]:[-k[b],g[b]],(o[a]=Math.max(h[0],h[1]))>h[0]&&(d[b]-=k[b],o[b]=E),p[g[e]!==c?e:b]=o[a])}if(this.enabled){var g,h,i=b.cache,j=this.corner.clone(),k=d.adjusted,l=b.options.position.adjust.method.split(" "),m=l[0],n=l[1]||l[0],o={left:E,top:E,x:0,y:0},p={};this.corner.fixed!==D&&(e(m,G,H,L,N),e(n,H,G,K,M),j.string()===i.corner.string()&&i.cornerTop===k.top&&i.cornerLeft===k.left||this.update(j,E)),g=this.calculate(j),g.right!==c&&(g.left=-g.right),g.bottom!==c&&(g.top=-g.bottom),g.user=this.offset,o.left=m===Q&&!!k.left,o.left&&f(G,L,N),o.top=n===Q&&!!k.top,o.top&&f(H,K,M),this.element.css(p).toggle(!(o.x&&o.y||j.x===O&&o.y||j.y===O&&o.x)),d.left-=g.left.charAt?g.user:m!==Q||o.top||!o.left&&!o.top?g.left+this.border:0,d.top-=g.top.charAt?g.user:n!==Q||o.left||!o.left&&!o.top?g.top+this.border:0,i.cornerLeft=k.left,i.cornerTop=k.top,i.corner=j.clone()}},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns),this.qtip.elements.tip&&this.qtip.elements.tip.find("*").remove().end().remove()}}),ha=R.tip=function(a){return new v(a,a.options.style.tip)},ha.initialize="render",ha.sanitize=function(a){if(a.style&&"tip"in a.style){var b=a.style.tip;"object"!=typeof b&&(b=a.style.tip={corner:b}),/string|boolean/i.test(typeof b.corner)||(b.corner=D)}},B.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create(),this.qtip.reposition()},"^style.tip.(height|width)$":function(a){this.size=[a.width,a.height],this.update(),this.qtip.reposition()},"^content.title|style.(classes|widget)$":function(){this.update()}},d.extend(D,y.defaults,{style:{tip:{corner:D,mimic:E,width:6,height:6,border:D,offset:0}}});var wa,xa,ya="qtip-modal",za="."+ya;xa=function(){function a(a){if(d.expr[":"].focusable)return d.expr[":"].focusable;var b,c,e,f=!isNaN(d.attr(a,"tabindex")),g=a.nodeName&&a.nodeName.toLowerCase();return"area"===g?(b=a.parentNode,c=b.name,a.href&&c&&"map"===b.nodeName.toLowerCase()?(e=d("img[usemap=#"+c+"]")[0],!!e&&e.is(":visible")):!1):/input|select|textarea|button|object/.test(g)?!a.disabled:"a"===g?a.href||f:f}function c(a){j.length<1&&a.length?a.not("body").blur():j.first().focus()}function e(a){if(h.is(":visible")){var b,e=d(a.target),g=f.tooltip,i=e.closest(W);b=i.length<1?E:parseInt(i[0].style.zIndex,10)>parseInt(g[0].style.zIndex,10),b||e.closest(W)[0]===g[0]||c(e)}}var f,g,h,i=this,j={};d.extend(i,{init:function(){return h=i.elem=d("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return E}}).hide(),d(b.body).bind("focusin"+za,e),d(b).bind("keydown"+za,function(a){f&&f.options.show.modal.escape&&27===a.keyCode&&f.hide(a)}),h.bind("click"+za,function(a){f&&f.options.show.modal.blur&&f.hide(a)}),i},update:function(b){f=b,j=b.options.show.modal.stealfocus!==E?b.tooltip.find("*").filter(function(){return a(this)}):[]},toggle:function(a,e,j){var k=a.tooltip,l=a.options.show.modal,m=l.effect,n=e?"show":"hide",o=h.is(":visible"),p=d(za).filter(":visible:not(:animated)").not(k);return i.update(a),e&&l.stealfocus!==E&&c(d(":focus")),h.toggleClass("blurs",l.blur),e&&h.appendTo(b.body),h.is(":animated")&&o===e&&g!==E||!e&&p.length?i:(h.stop(D,E),d.isFunction(m)?m.call(h,e):m===E?h[n]():h.fadeTo(parseInt(j,10)||90,e?1:0,function(){e||h.hide()}),e||h.queue(function(a){h.css({left:"",top:""}),d(za).length||h.detach(),a()}),g=e,f.destroyed&&(f=F),i)}}),i.init()},xa=new xa,d.extend(w.prototype,{init:function(a){var b=a.tooltip;return this.options.on?(a.elements.overlay=xa.elem,b.addClass(ya).css("z-index",y.modal_zindex+d(za).length),a._bind(b,["tooltipshow","tooltiphide"],function(a,c,e){var f=a.originalEvent;if(a.target===b[0])if(f&&"tooltiphide"===a.type&&/mouse(leave|enter)/.test(f.type)&&d(f.relatedTarget).closest(xa.elem[0]).length)try{a.preventDefault()}catch(g){}else(!f||f&&"tooltipsolo"!==f.type)&&this.toggle(a,"tooltipshow"===a.type,e)},this._ns,this),a._bind(b,"tooltipfocus",function(a,c){if(!a.isDefaultPrevented()&&a.target===b[0]){var e=d(za),f=y.modal_zindex+e.length,g=parseInt(b[0].style.zIndex,10);xa.elem[0].style.zIndex=f-1,e.each(function(){this.style.zIndex>g&&(this.style.zIndex-=1)}),e.filter("."+$).qtip("blur",a.originalEvent),b.addClass($)[0].style.zIndex=f,xa.update(c);try{a.preventDefault()}catch(h){}}},this._ns,this),void a._bind(b,"tooltiphide",function(a){a.target===b[0]&&d(za).filter(":visible").not(b).last().qtip("focus",a)},this._ns,this)):this},toggle:function(a,b,c){return a&&a.isDefaultPrevented()?this:void xa.toggle(this.qtip,!!b,c)},destroy:function(){this.qtip.tooltip.removeClass(ya),this.qtip._unbind(this.qtip.tooltip,this._ns),xa.toggle(this.qtip,E),delete this.qtip.elements.overlay}}),wa=R.modal=function(a){return new w(a,a.options.show.modal)},wa.sanitize=function(a){a.show&&("object"!=typeof a.show.modal?a.show.modal={on:!!a.show.modal}:"undefined"==typeof a.show.modal.on&&(a.show.modal.on=D))},y.modal_zindex=y.zindex-200,wa.initialize="render",B.modal={"^show.modal.(on|blur)$":function(){this.destroy(),this.init(),this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}},d.extend(D,y.defaults,{show:{modal:{on:E,effect:D,blur:D,stealfocus:D,escape:D}}}),R.viewport=function(c,d,e,f,g,h,i){function j(a,b,c,e,f,g,h,i,j){var k=d[f],s=u[a],t=v[a],w=c===Q,x=s===f?j:s===g?-j:-j/2,y=t===f?i:t===g?-i:-i/2,z=q[f]+r[f]-(n?0:m[f]),A=z-k,B=k+j-(h===I?o:p)-z,C=x-(u.precedance===a||s===u[b]?y:0)-(t===O?i/2:0);return w?(C=(s===f?1:-1)*x,d[f]+=A>0?A:B>0?-B:0,d[f]=Math.max(-m[f]+r[f],k-C,Math.min(Math.max(-m[f]+r[f]+(h===I?o:p),k+C),d[f],"center"===s?k-x:1e9))):(e*=c===P?2:0,A>0&&(s!==f||B>0)?(d[f]-=C+e,l.invert(a,f)):B>0&&(s!==g||A>0)&&(d[f]-=(s===O?-C:C)+e,l.invert(a,g)),d[f]<q[f]&&-d[f]>B&&(d[f]=k,l=u.clone())),d[f]-k}var k,l,m,n,o,p,q,r,s=e.target,t=c.elements.tooltip,u=e.my,v=e.at,w=e.adjust,x=w.method.split(" "),y=x[0],z=x[1]||x[0],A=e.viewport,B=e.container,C={left:0,top:0};return A.jquery&&s[0]!==a&&s[0]!==b.body&&"none"!==w.method?(m=B.offset()||C,n="static"===B.css("position"),k="fixed"===t.css("position"),o=A[0]===a?A.width():A.outerWidth(E),p=A[0]===a?A.height():A.outerHeight(E),q={left:k?0:A.scrollLeft(),top:k?0:A.scrollTop()},r=A.offset()||C,"shift"===y&&"shift"===z||(l=u.clone()),C={left:"none"!==y?j(G,H,y,w.x,L,N,I,f,h):0,top:"none"!==z?j(H,G,z,w.y,K,M,J,g,i):0,my:l}):C},R.polys={polygon:function(a,b){var c,d,e,f={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10},adjustable:E},g=0,h=[],i=1,j=1,k=0,l=0;for(g=a.length;g--;)c=[parseInt(a[--g],10),parseInt(a[g+1],10)],c[0]>f.position.right&&(f.position.right=c[0]),c[0]<f.position.left&&(f.position.left=c[0]),c[1]>f.position.bottom&&(f.position.bottom=c[1]),c[1]<f.position.top&&(f.position.top=c[1]),h.push(c);if(d=f.width=Math.abs(f.position.right-f.position.left),e=f.height=Math.abs(f.position.bottom-f.position.top),"c"===b.abbrev())f.position={left:f.position.left+f.width/2,top:f.position.top+f.height/2};else{for(;d>0&&e>0&&i>0&&j>0;)for(d=Math.floor(d/2),e=Math.floor(e/2),b.x===L?i=d:b.x===N?i=f.width-d:i+=Math.floor(d/2),b.y===K?j=e:b.y===M?j=f.height-e:j+=Math.floor(e/2),g=h.length;g--&&!(h.length<2);)k=h[g][0]-f.position.left,l=h[g][1]-f.position.top,(b.x===L&&k>=i||b.x===N&&i>=k||b.x===O&&(i>k||k>f.width-i)||b.y===K&&l>=j||b.y===M&&j>=l||b.y===O&&(j>l||l>f.height-j))&&h.splice(g,1);f.position={left:h[0][0],top:h[0][1]}}return f},rect:function(a,b,c,d){return{width:Math.abs(c-a),height:Math.abs(d-b),position:{left:Math.min(a,c),top:Math.min(b,d)}}},_angles:{tc:1.5,tr:7/4,tl:5/4,bc:.5,br:.25,bl:.75,rc:2,lc:1,c:0},ellipse:function(a,b,c,d,e){var f=R.polys._angles[e.abbrev()],g=0===f?0:c*Math.cos(f*Math.PI),h=d*Math.sin(f*Math.PI);return{width:2*c-Math.abs(g),height:2*d-Math.abs(h),position:{left:a+g,top:b+h},adjustable:E}},circle:function(a,b,c,d){return R.polys.ellipse(a,b,c,c,d)}},R.svg=function(a,c,e){for(var f,g,h,i,j,k,l,m,n,o=c[0],p=d(o.ownerSVGElement),q=o.ownerDocument,r=(parseInt(c.css("stroke-width"),10)||0)/2;!o.getBBox;)o=o.parentNode;if(!o.getBBox||!o.parentNode)return E;switch(o.nodeName){case"ellipse":case"circle":m=R.polys.ellipse(o.cx.baseVal.value,o.cy.baseVal.value,(o.rx||o.r).baseVal.value+r,(o.ry||o.r).baseVal.value+r,e);break;case"line":case"polygon":case"polyline":for(l=o.points||[{x:o.x1.baseVal.value,y:o.y1.baseVal.value},{x:o.x2.baseVal.value,y:o.y2.baseVal.value}],m=[],k=-1,i=l.numberOfItems||l.length;++k<i;)j=l.getItem?l.getItem(k):l[k],m.push.apply(m,[j.x,j.y]);m=R.polys.polygon(m,e);break;default:m=o.getBBox(),m={width:m.width,height:m.height,position:{left:m.x,top:m.y}}}return n=m.position,p=p[0],p.createSVGPoint&&(g=o.getScreenCTM(),l=p.createSVGPoint(),l.x=n.left,l.y=n.top,h=l.matrixTransform(g),n.left=h.x,n.top=h.y),q!==b&&"mouse"!==a.position.target&&(f=d((q.defaultView||q.parentWindow).frameElement).offset(),f&&(n.left+=f.left,n.top+=f.top)),q=d(q),n.left+=q.scrollLeft(),n.top+=q.scrollTop(),m},R.imagemap=function(a,b,c){b.jquery||(b=d(b));var e,f,g,h,i,j=(b.attr("shape")||"rect").toLowerCase().replace("poly","polygon"),k=d('img[usemap="#'+b.parent("map").attr("name")+'"]'),l=d.trim(b.attr("coords")),m=l.replace(/,$/,"").split(",");if(!k.length)return E;if("polygon"===j)h=R.polys.polygon(m,c);else{if(!R.polys[j])return E;for(g=-1,i=m.length,f=[];++g<i;)f.push(parseInt(m[g],10));h=R.polys[j].apply(this,f.concat(c))}return e=k.offset(),e.left+=Math.ceil((k.outerWidth(E)-k.width())/2),e.top+=Math.ceil((k.outerHeight(E)-k.height())/2),h.position.left+=e.left,h.position.top+=e.top,h};var Aa,Ba='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';d.extend(x.prototype,{_scroll:function(){var b=this.qtip.elements.overlay;b&&(b[0].style.top=d(a).scrollTop()+"px")},init:function(c){var e=c.tooltip;d("select, object").length<1&&(this.bgiframe=c.elements.bgiframe=d(Ba).appendTo(e),c._bind(e,"tooltipmove",this.adjustBGIFrame,this._ns,this)),this.redrawContainer=d("<div/>",{id:S+"-rcontainer"}).appendTo(b.body),c.elements.overlay&&c.elements.overlay.addClass("qtipmodal-ie6fix")&&(c._bind(a,["scroll","resize"],this._scroll,this._ns,this),c._bind(e,["tooltipshow"],this._scroll,this._ns,this)),this.redraw()},adjustBGIFrame:function(){var a,b,c=this.qtip.tooltip,d={height:c.outerHeight(E),width:c.outerWidth(E)},e=this.qtip.plugins.tip,f=this.qtip.elements.tip;b=parseInt(c.css("borderLeftWidth"),10)||0,b={left:-b,top:-b},e&&f&&(a="x"===e.corner.precedance?[I,L]:[J,K],b[a[1]]-=f[a[0]]()),this.bgiframe.css(b).css(d)},redraw:function(){if(this.qtip.rendered<1||this.drawing)return this;var a,b,c,d,e=this.qtip.tooltip,f=this.qtip.options.style,g=this.qtip.options.position.container;return this.qtip.drawing=1,f.height&&e.css(J,f.height),f.width?e.css(I,f.width):(e.css(I,"").appendTo(this.redrawContainer),b=e.width(),1>b%2&&(b+=1),c=e.css("maxWidth")||"",d=e.css("minWidth")||"",a=(c+d).indexOf("%")>-1?g.width()/100:0,c=(c.indexOf("%")>-1?a:1*parseInt(c,10))||b,d=(d.indexOf("%")>-1?a:1*parseInt(d,10))||0,b=c+d?Math.min(Math.max(b,d),c):b,e.css(I,Math.round(b)).appendTo(g)),this.drawing=0,this},destroy:function(){this.bgiframe&&this.bgiframe.remove(),this.qtip._unbind([a,this.qtip.tooltip],this._ns)}}),Aa=R.ie6=function(a){return 6===da.ie?new x(a):E},Aa.initialize="render",B.ie6={"^content|style$":function(){this.redraw()}}})}(window,document);
//# sourceMappingURL=jquery.qtip.min.map
/*!
 * jQuery.qTip.js: Application of qTip2 jQuery plugin to WSU OUE websites. Please see
 *     https://github.com/qTip2/qTip2/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license [https://opensource.org/licenses/MIT]
 */
 
( function ( $ ) {

var thisFileName = 'jquery.qTip.js';

// Code executed once DOM is ready
$( function () {
	var thisFuncName = 'DOM loaded';
	var thisFuncDesc = 'Code executed after the DOM has loaded';
	var qTipSlctr = '.has-tool-tip';
	
	try {
		assertQTipPluginLoaded();
		processQTips(qTipSlctr);
	} catch (errorMsg) {
		$.logError(thisFileName, thisFuncName, thisFuncDesc, errorMsg);
	}
} );

function assertQTipPluginLoaded() {
	if ( !$.fn.qtip ) {
		throw 'The QTip2 plugin is missing; please verify that you included it as a build dependency.';
	}
}

function processQTips(qTipSlctr) {
	// TODO: Refactor for improved maintainability
	var $this;
	var qTipContentSource; // Either a span or a div tag will be accepted.
	var qTipStyle; // Blue and dark qTips are implemented.
	var qTipCntnt; // Object enabling the optional use of titles within qTips.
	$( qTipSlctr ).each( function () {
		$this = $( this );
		$this.hasClass( 'blue' ) ? qTipStyle = 'qtip-blue' : qTipStyle = 'qtip-dark';
		if ( $this.hasClass( 'parental-neighbor-is-source' ) ) {
			qTipCntnt = new QTipContent( $this.parent().next( 'div' ) );
			if ( qTipCntnt.qTipTitle == null ) {
				$this.qtip( {
					style: qTipStyle,
					content: {
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse', // Track the mouse as the positioning target
						adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
			else {
				$this.qtip( {
					style: qTipStyle,
					content: {
						title: qTipCntnt.qTipTitle,
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse', // Track the mouse as the positioning target
						adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
		} else {
			$this.hasClass( 'span-is-source' ) ?
				qTipContentSource = 'span' :
				qTipContentSource = 'div';
			qTipCntnt = new QTipContent( $this.next( qTipContentSource ) );
			if ( qTipCntnt.qTipTitle == null ) {
				$this.qtip( {
					style: qTipStyle,
					content: {
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse',
						adjust: { x: 5, y: 15 }
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			} else {
				$this.qtip( {
					style: qTipStyle,
					content: {
						title: qTipCntnt.qTipTitle,
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse',
						adjust: { x: 5, y: 15 }
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
		}
	} );       
}

/*!
 *  QTip content class
 */
function QTipContent( $qTipSlctr ) {
	var regExPttrn1 = /^\(tooltip: ?(.+)\|(.+)(?=\))\)$/;
	var regExPttrn2 = /^(.+)\|(.+)$/;
	var regExReplPttrn;
	var regExResult;
	this.qTipTitle = null;
	this.qTipText = null;
	this.qTipInnerHTML = null;
	regExResult = regExPttrn1.exec( $qTipSlctr.text() );
	if ( regExResult != null && regExResult.length == 3 ) {
		this.qTipTitle = regExResult[1];
		this.qTipText = regExResult[2];
		regExReplPttrn = /^(.+)\|/;
		this.qTipInnerHTML = ( regExResult[1] + '|' +
			regExResult[2] ).replace( regExReplPttrn, '' );
	} else {
		regExResult = regExPttrn2.exec( $qTipSlctr.text() );
		if ( regExResult != null && regExResult.length == 3 ) {
			this.qTipTitle = regExResult[1];
			this.qTipText = regExResult[2];
			regExReplPttrn = /^(.+)\|/;
			this.qTipInnerHTML = $qTipSlctr.html().replace( regExReplPttrn, '' );
		} else {
			this.qTipText = $qTipSlctr.text();
			this.qTipInnerHTML = $qTipSlctr.html();
		}
	}
}

} )( jQuery );
/*!*
 * jQuery.textResize.js
 * Released under GNU GPLv2
 *
 * Based on FitText.js 1.2 (https://github.com/davatron5000/FitText.js) by Dave Rupert
 *  (http://daverupert.com).
 */
(function($){
    $.fn.textResize = function( scalingFactor, options ) {
        // Set up default options in case the caller passed no attributes
        var scalingAmount = scalingFactor || 1,
            settings = $.extend({
                "minFontSize" : Number.NEGATIVE_INFINITY,
                "maxFontSize" : Number.POSITIVE_INFINITY,
				"againstSelf" : true
            }, options);
        return this.each(function () {
            var $this = $(this);
			var $parent = undefined;
			if (!settings.againstSelf) {
				$parent = $this.parents(".column").first();
			}
          
            // Resizer() keeps font-size proportional to object width as constrainted by the user
            var resizer = function () {
				if(!settings.againstSelf) {
					$this.css("font-size", Math.max(Math.min($parent.innerWidth() / (scalingAmount*10),
						parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				}
				else {
					$this.css("font-size", Math.max(Math.min($this.width() / (scalingAmount*10),
						parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				}
            };
          
            // Call once to set the object's font size based on current window size, then call as resize or orientation-change events are triggered.
            resizer();
            $(window).on("resize.textresize orientationchange.textresize", resizer);
        });
    };
})(jQuery);

// Now use the plugin on the WSU Undergraduate education website (i.e. delete or modify the following statement if you are going to utilize this plugin on your own site).
(function($){
	var clmnWidth = 926; // px - default column width
	var dfltSpineWidth = 198; // px - default width of spine
	
    $(document).ready(function () {
		initArticleHeaderText();
		initTextAutoResizers(".auto-fits-text");
    });

	function initArticleHeaderText() {
		//TODO: Refactor to rely on auto
		var $columns = $(".column");
        $columns.find(".article-header .header-content h1").each(function () {
            $(this).textResize(1.277142857142857, {"minFontSize" : "34.8"});
        });
        $columns.find(".article-header .header-content h2").each(function () {
            $(this).textResize(1.847840465639262, {"minFontSize" : "24.0"});
        });
        $columns.find(".article-header .header-content h3").each(function () {
            $(this).textResize(4.110097222222222, {"minFontSize" : "10.7"});
        });
	}
	
	function initTextAutoResizers(cssClass) {
		var $textAutoResizers = new TextAutoResizers(cssClass, dfltSpineWidth);
		$textAutoResizers.initTextAutoResizing();
	}
	
	function TextAutoResizers(cssClass, spineWidth) {	
		var $resizers = $(cssClass);
		
		this.initTextAutoResizing = function () {
			$resizers.each(function() {
				var textAutoResizer = new TextAutoResizingElem($(this), spineWidth);
			});
		}		
		
		function TextAutoResizingElem($jqObj, spineWidth) {
			var $this = $jqObj;
			initTextAutoResizing();
			
			function initTextAutoResizing() {
				if ($.isJQueryObj($this)) {
					var fontSz = parseFloat($this.css("font-size"));
					var scalingAmt = calculateScalingAmount(fontSz);
					if ($this.hasClass("has-max-size")) {
						$this.textResize(scalingAmt, {"minFontSize" : "10.7px", "maxFontSize" : fontSz, "againstSelf" : 0});
					} else {
						$this.textResize(scalingAmt, {"minFontSize" : "10.7px", "againstSelf" : 0});
					}					
				}
			}
			
			function calculateScalingAmount(fontSz) {
				var maxColumnWidth = findMaxColumnWidth();
				return maxColumnWidth / (fontSz * 10);
			}
			
			function findMaxColumnWidth() {
				var $parentCol = $this.parents(".column").first();
				var maxColWidth = findMaxColWidth($parentCol);
				return maxColWidth;
			}
			
			function findMaxColWidth($parentCol) {
				var maxRowWidth = 990; // Sets the default max row width.
				var maxWidthCss = $parentCol.css("max-width"); // In case the max width was explicitly set for the parental column...
				if (maxWidthCss != "none") {
					maxRowWidth = parseFloat(maxWidthCss);
				} else {
					maxRowWidth = findMaxRowWidthFromBinder(maxRowWidth); // In case the max width was implicitly set...
				}
				return divideUpMaxRowWidth(maxRowWidth, $parentCol); // Return the max column width by dividing up the max row width as needed.
			}
			
			function findMaxRowWidthFromBinder(dfltMaxRowWidth) {
				var maxRowWidth = dfltMaxRowWidth;
				var maxCssWidth = findBindersMaxWidthCss();
				if (maxCssWidth != "none") {
					maxRowWidth = parseFloat(maxCssWidth) - spineWidth; // The binder's max width includes the spine's fixed width, so subtract it off to achieve actual max width of row.
				}
				return maxRowWidth; // i.e., returns the max width in numerical form.
			}
			
			function findBindersMaxWidthCss() {
				var maxWidthCss = "none";
				var $binder = $("#binder");
				if ($binder.length == 1) {
					if ($binder.hasClass("max-1188")) {
						maxWidthCss = "1188";
					} else if ($binder.hasClass("max-1386")) {
						maxWidthCss = "1386";						
					} else if ($binder.hasClass("max-1584")) {
						maxWidthCss = "1584";						
					} else if ($binder.hasClass("max-1782")) {
						maxWidthCss = "1782";						
					} else if ($binder.hasClass("max-1980")) {
						maxWidthCss = "1980";						
					}
				}
				return maxWidthCss; // i.e., returns a string containing the parental binder's max width as specified in CSS
			}
			
			function divideUpMaxRowWidth(maxRowWidth, $parentCol) {
				var maxColWidth = maxRowWidth;
				var $parentRow = ($.isJQueryObj($parentCol)) ? $parentCol.parent(".row") : undefined;
				if ($parentCol.css("max-width") == "none" && $.isJQueryObj($parentRow)) {
					if ($parentRow.hasClass("halves")) {
						maxColWidth /= 2;
					} else if ($parentRow.hasClass("thirds")) {
						maxColWidth /= 3;
					} else if ($parentRow.hasClass("quarters")) {
						maxColWidth /= 4;
					}
				}
				return maxColWidth;
			}
		}
	}
})(jQuery);

/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(t,r),delete n[r]),r.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s=200==Math.round(t(o.width)),r.isBoxSizeOuter=s,i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var n=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var r=i.toDashed(n),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(o&&o.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,n,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=parseFloat(n),s=parseFloat(o),a=this.layout.size;-1!=n.indexOf("%")&&(r=r/100*a.width),-1!=o.indexOf("%")&&(s=s/100*a.height),r=isNaN(r)?0:r,s=isNaN(s)?0:s,r-=e?a.paddingLeft:a.paddingRight,s-=i?a.paddingTop:a.paddingBottom,this.position.x=r,this.position.y=s},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),o&&!this.isTransitioning)return void this.layoutPosition();var r=t-i,s=e-n,a={};a.transform=this.getTranslate(r,s),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
/*!
 * jQuery.masonry-custom.js
 * ------------------------
 * DESCRIPTION:
 *     Application of imagesLoaded and Masonry libraries, both written by David DeSandro, to WSU OUE
 *     websites. (Please see [https://github.com/desandro/imagesloaded] and [https://github.com/desa
 *     ndro/masonry] for David's repositories.) 
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 */
( function ($) {

// ---- DOM IS READY: Code executed after the DOM is ready for use. --------------------------------
$( function () {
	var $masonryTrgts = $( 'ul.cascaded-layout' );
	$masonryTrgts.each( function () {
		var $thisCascade = $( this );
		var proceedWithLayout = true;
		var sizerFound = false;
		var gutterSizerFound = false;
		var $cascadeChilren = $thisCascade.children();
		$cascadeChilren.each( function () { // Look for the correct layout
			var $thisChild = $( this );
			if ( !$thisChild.hasClass( 'cascaded-item' ) ) {
				if ( !$thisChild.hasClass( 'cascade-sizer' ) ) {
					if ( !$thisChild.hasClass( 'gutter-sizer' ) ) {
						if ( !$thisChild.hasClass( 'cascade-other' ) ) {
							return proceedWithLayout = false;
						}
					} else {
						gutterSizerFound = true;
					}
				} else {
					sizerFound = true;
				}
			}
		} );
		if ( proceedWithLayout && ( !sizerFound || !gutterSizerFound ) ) proceedWithLayout = false;
		if ( proceedWithLayout ) {
			$thisCascade.masonry( {
				columnWidth: '.cascade-sizer',
				gutter: '.gutter-sizer',
				itemSelector: '.cascaded-item',
				percentPosition: true
			} );
			$thisCascade.attr( 'data-masonry-active', '1' );
			$thisCascade.imagesLoaded().progress( function() {
				$thisCascade.masonry( 'layout' );
			} );
		}
	} );
});

// ---- WINDOW LOADED: Code executed after the browser window has fully loaded ---------------------
$( window ).on( 'load', function () {
	var $masonryTrgts = $( 'ul.cascaded-layout' );
	$masonryTrgts.each( function () {
		var $thisCascade = $( this );
		var proceedWithLayout = true;
		var sizerFound = false;
		var gutterSizerFound = false;
		var $cascadeChilren = $thisCascade.children();
		$cascadeChilren.each( function () {

			// Verify that the layout is correct
			var $thisChild = $( this );
			if ( !$thisChild.hasClass( 'cascaded-item' ) ) {
				if ( !$thisChild.hasClass( 'cascade-sizer' ) ) {
					if ( !$thisChild.hasClass( 'gutter-sizer' ) ) {
						if ( !$thisChild.hasClass( 'cascade-other' ) ) {
							return proceedWithLayout = false;
						}
					} else {
						gutterSizerFound = true;
					}
				} else {
					sizerFound = true;
				}
			}
		});
		if ( proceedWithLayout && ( !sizerFound || !gutterSizerFound ) ) proceedWithLayout = false;
		if ( proceedWithLayout ) {
			$thisCascade.masonry( 'layout' );
		}
	} );
} );
} )( jQuery );

/*!
 * Site-specific JS for the WSU Office of Undergraduate Research website.
 *
 * @author - Daniel Rieck ( danielcrieck@gmail.com ) [https://github.com/invokeImmediately]
 */

( function ( $ ) {

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Main execution

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1.1: DOM Ready

$( function () {
	var ugrSiteURL;

	// Tweak HTML source to work around some quirks of WordPress setup
	addPageHeaderToNews();
	checkForEventsCalendarPage();
	initTravelAwardForm( {
		formContainer: '#gform_wrapper_6',
		validatedField: '.travel-award__eligibility',
		validator: '.travel-award__validator'
	} );
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Class Declarations

// TODO: Provide inline documentation
function OueTermYearInputs( slctrWhichFields ) {

	// DECLARE PRIVATE PROPERTIES
	var _selector = slctrWhichFields;
	var _$fields = $( slctrWhichFields );
	var _$inputs = _$fields.find( 'input' );
	var _regExFilterFinal = /^[A-Za-z]+ (?:[0-9]{2}|[0-9]{4})$/;
	var _regExPreventExtraChars = /^[A-Za-z]+ [0-9]{4}$/;
	var _regExStartWithAlphas = /^[A-Za-z]*$/;
	var _regExStartEndWithNumbers = /^[A-Za-z]+ [0-9]{0,3}$/;
	var _validAlphaKeyCodes;
	var _validNumberKeyCodes;
	var _validSpaceKeyCode = [32]
	var _validOtherKeyCodes = [8, 9, 13, 16, 17, 18, 20, 35, 36, 37, 39, 46, 91, 92, 93, 144];
	var _allValidKeyCodes;
	var _msgInputIsWrong = 'Please revise what you entered into the "Expeced WSU Gradution Term" '
		+ 'field. Input should be in Term YYYY format (e.g., Fall 2019).';

	// DECLARE PRIVILEGED METHODS
	this.setValidKeyCodes = function() {
		_validNumberKeyCodes = createArrayFromNumberSequence( 48, 57 ).concat( 
			createArrayFromNumberSequence( 94, 105 ) );
		_validAlphaKeyCodes = createArrayFromNumberSequence( 65, 90 );
		_allValidKeyCodes = _validAlphaKeyCodes.concat(_validSpaceKeyCode, _validNumberKeyCodes, 
			_validOtherKeyCodes);
	};

	this.applyKeyDownHandler = function() {
		_$inputs.keydown( function( e ) {
			var $this = $(this);
			var inputText = $this.val();

			if( !~_allValidKeyCodes.indexOf( e.keyCode ) ) {
				e.preventDefault();
			} else if ( !~_validOtherKeyCodes.indexOf( e.keyCode ) ) {
				if ( inputText.match( _regExStartWithAlphas ) && !( ~_validNumberKeyCodes.indexOf( 
						e.keyCode ) || ~_validAlphaKeyCodes.indexOf( e.keyCode ) || 
						~_validSpaceKeyCode.indexOf( e.keyCode ) ) ) {
					e.preventDefault();
				} else if ( inputText.match( _regExStartEndWithNumbers ) && 
						!~_validNumberKeyCodes.indexOf( e.keyCode ) ) {
					e.preventDefault();
				} else if ( inputText.match( _regExPreventExtraChars ) ) {
					e.preventDefault();
				}
			}            
		} );
	};

	this.applyBlurHandler = function() {
		_$inputs.blur( function( e ) {
			var $this = $(this);
			var inputText = $this.val();

			if ( inputText != "" && !inputText.match( _regExFilterFinal ) ) {
				alert( _msgInputIsWrong );
				$this.val("");
			}
		} );
	};

	// EXECUTE REMAINING CONSTRUCTION INSTRUCTIONS
	this.setValidKeyCodes();
	this.applyKeyDownHandler();
	this.applyBlurHandler();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Function Declarations

/**
 * Adds a page header containing navigational context to the news section of the website.
 */
function addPageHeaderToNews() {
	// Tweak HTML source to work around some quirks of WordPress setup.
	var $body;
	var $firstCol;
	var $colParent;
	var headerHtml = '<section class="row page-header page-header--news"><div class="column one pag\
e-header__column-1"><h1 class="page-header__text-title">News</h1></div></section>';
	var siteURL = window.location.pathname;


	switch (siteURL) {
		case '/news/':
			$firstCol = $( 'div.column.one' ).first();
			$colParent = $firstCol.parent( 'section' );
			$colParent.before( headerHtml );
			break;
		default:
			$body = $( 'body' );
			if ( $body.hasClass( 'single-post' ) && $body.hasClass( 'post-template-default' ) ) {
				$colParent = $body.find( '.row' ).first();
				$colParent.before( headerHtml );
			}
	}
}

// TODO: Add inline documentation
function checkForEventsCalendarPage() {
	var $body = $( 'body' );
	if ( $body.hasClass( 'tribe-theme-spine' ) ) {
		fixEventsCalendarHeader( $body );
	}
}

/**
 * Creates an array containing the sequence of n_i = i + lower bound from a lower to an upper bound.
 *
 * Contents of the array follow the pattern [start, start + 1, start + 2, ..., end - 1, end].
 *
 * @param {number} start - The lower bound of the number sequence.
 * @param {number} end - The upper bound of the number sequence.
 *
 * @return {array} Returns an empty array if there is a type problem or if end is less than start.
 */
function createArrayFromNumberSequence ( start, end ) {
	var result;

	if ( typeof start === 'number' && typeof end === 'number' && start <= end ) {
		result = Array.apply(null, { length: ( end - start + 1 ) } )
			.map(Number.call, Number)
			.map( function( i ) { return i + start; } );
	} else {
		result = [];
	}

	return result;
}

// TODO: Add inline documentation
function fixEventsCalendarHeader( $body ) {
	var $main;
	var $mainHeader;
	var $subHeaderDefault;

	if ( $.isJQueryObj( $body ) ) {
		console.log( 'Attempting to fix header.' )
		$main = $body.find( '#wsuwp-main' );
		$mainHeader = $main.find( '.main-header' );
		$subHeaderDefault = $mainHeader.find( '.sub-header-default' );
		$subHeaderDefault.text( 'Office of Undergraduate Research' );		
	}
}

/**
 * Intialize a travel scholarship form when it is present on the active web page.
 *
 * @param {string} selForm - The selector for isolating the travel scholarship form from the DOM.
 */
function initTravelAwardForm( sels ) {
	var checkboxValidators;

	checkboxValidators = new GfCheckboxValidators( sels );
	if ( checkboxValidators.get$form().length ) {
		try {
			checkboxValidators.finishHidingValidators();
			checkboxValidators.initValidation();
		} catch ( err ) {
			console.log( err.name + ': ' + err.message );
		}
	}
}

} )( jQuery );
