/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
( function ( $ ) {

"use strict";

$( function () {
	var ugrSiteURL;
	var termYearInputs;

	// Tweak HTML source to work around some quirks of WordPress setup
	var ugrSiteURL = window.location.pathname;
	switch( ugrSiteURL ) {
		case '/news/':
			$( 'div.column.one' ).first().parent( 'section' ).before( '<section class="row single g'
				+ 'utterpad-top"><div class="column one"><section class="article-header header-news'
				+ 'Events"><div class="header-content"><h2>Undergraduate Research News</h2><h3>What'
				+ '\'s going on with our students and programs</h3></div></section></div></section>'
			);
			break;
	}
	
	// Set up advanced interactive behaviors of gravity forms
	traverseAddressInputs( '.ugrf-mailing-address' );
	termYearInputs = New OueTermYearInputs( '.oue-term-year-field' );

	// Handle use of max-1188 class override
	checkForMax1386Page();

} );

function traverseAddressInputs ( selector ) {
	if ( $.type( selector ) === "string" ) {
		$( selector ).each( function () {
			var $this = $( this );
			var $inputs = $this.find( 'input' );
			$inputs.each( function () {
				var $thisChild = $( this );
				if ( $thisChild.val() == "" ) {
					$thisChild.removeClass( 'value-entered' );
				}
				else {
					$thisChild.addClass( 'value-entered' );
				}
				$thisChild.blur( function () {                      
					if ( $thisChild.val() == "" ) {
						$thisChild.removeClass( 'value-entered' );
					}
					else {
						$thisChild.addClass( 'value-entered' );
					}
					
					var $thisParent = $thisChild.parents( selector );
					var $parentsInputs = $thisParent.find( 'input' );
					var counter = 0;
					var inputReady = true;
					$parentsInputs.each( function () {
						if ( counter != 1 && $( this ).val() == "" ) {
							inputReady = false;
						}
						counter++;
					} );
					
					if ( inputReady ) {
						$thisParent.addClass( 'inputs-ready' );
					}
					else {
						$thisParent.removeClass( 'inputs-ready' );
					}
				} );
			} );
		} );
	}
}

// NOTE: Assumes jQuery is in use.
function OueTermYearInputs( slctrWhichFields ) {

	// DECLARE PRIVATE PROPERTIES
	var _selector = slctrWhichFields;
	var _$fields = $( slctrWhichFields );
	var _regExFilterFinal = /^[A-Za-z]+ (?:[0-9]{2}|[0-9]{4})$/;
	var _regExPreventExtraChars = /^[A-Za-z]+ [0-9]{4}$/;
	var _regExStartWithAlphas = /^[A-Za-z]*$/;
	var _regExStartEndWithNumbers = /^[A-Za-z]+ [0-9]{0,3}$/;
	var _validAlphaKeyCodes;
	var _validNumberKeyCodes;
	var _validOtherKeyCodes = [8, 9, 13, 16, 17, 18, 20, 32, 35, 36, 37, 39, 46, 91, 92, 93, 144];
	var _allValidKeyCodes;
	var _msgInputIsWrong = 'Please revise what you entered into the "Expeced WSU Gradution Term" '
		+ 'field. Input should be in Term YYYY format (e.g., Fall 2019).';

	// DECLARE PRIVILEGED METHODS
	this.setValidKeyCodes = function() {
		_validNumberKeyCodes = createArrayFromNumberSequence( 48, 57 ).concat( 
			createArrayFromNumberSequence( 94, 105 ) );
		_validAlphaKeyCodes = createArrayFromNumberSequence( 65, 90 );
		_allValidKeyCodes = _validAlphaKeyCodes.concat(_validNumberKeyCodes, _validOtherKeyCodes);
	}

	this.applyKeyDownHandler = function() {
		_$fields.keydown( function( e ) {
			var $this = $(this);
			var inputText = $this.val();

			if( !~_allValidKeyCodes.indexOf( e.keyCode ) ) {
				e.preventDefault();
			} else if ( !~_validOtherKeyCodes.indexOf( e.keyCode ) ) {
				if ( inputText.match( _regExStartWithAlphas ) && !~_validNumberKeyCodes.indexOf( 
						e.keyCode ) ) {
					e.PreventDefault();
				} else if ( inputText.match( _regExStartEndWithNumbers ) && 
						!~_validNumberKeyCodes.indexOf( e.keyCode ) ) {
					e.PreventDefault();
				} else if ( inputText.match( _regExPreventExtraChars ) ) {
					e.PreventDefault();
				}
			}            
		} );
	};

	this.applyBlurHandler = function() {
		_$fields.blur( function( e ) {
			var $this = $(this);
			var inputText = $this.val();

			if ( !inputText.match( _regExFilterFinal ) ) {
				e.PreventDefault();
				alert( _msgInputIsWrong );
			}
		} );
	}

	// EXECUTE REMAINING CONSTRUCTION INSTRUCTIONS
	this.setValidKeyCodes();
	this.applyKeyDownHandler();
	this.applyBlurHandler();

}

// Creates an array object containing elements as follows:
// 	[start, start + 1, start + 2, ..., end - 1, end]
// Returns an empty array if there is a type problem or if end is less than start.
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

function checkForMax1386Page() {
	var $body = $( 'body' );
	var $binder;
	
	if ( $body.hasClass( 'use-max-width-1386' ) ) {
		$binder = $( '#binder' );
		if ( $binder.hasClass( 'max-1188' ) ) {
			$binder.removeClass( 'max-1188' );
			$binder.addClass( 'max-1386' );
		}
	}
}

} )( jQuery );
/***************************************************************************************************************************
 * jQuery.oue-custom.js: custom JavaScript code common to all WSU Undergraduate Education websites                         *
 ***************************************************************************************************************************/
"use strict";

(function ($) {
	var thisFileName = "jQuery.oue-custom.js";

	/*******************************************************************************************************************
	 * ADDITION OF FUNCTIONS to jQuery                                                                                 *
	 *******************************************************************************************************************/
	 
	/**
	 * jQuery.isJQueryObj
	 * DESCRIPTION: Checking function to verify that the passed parameter is a valid jQuery object.
	 */
	$.isJQueryObj = function ($obj) {
		return ($obj && ($obj instanceof $ || $obj.constructor.prototype.jquery));
	}
	
	/**
	 * jQuery.logError
	 * DESCRIPTION: Log an error using the browser console in JSON notation.
	 * PARAMETERS:
	 *   - fileName: the name of the JS source file wherein the error was encountered
	 *   - fnctnName: the name of the function that called $.logError
	 *   - fnctnDesc: a description of what the calling function is supposed to do
	 *   - errorMsg: the message that describes what went wrong within the calling function
	 */
	$.logError = function (fileName, fnctnName, fnctnDesc, errorMsg) {
		var thisFuncName = "jQuery.logError";
		var thisFuncDesc = "Log an error using the browser console in JSON notation.";
		var bitMask;
		
		bitMask = typeof fileName === "string";
		bitMask = (typeof fnctnName === "string") | (bitMask << 1);
		bitMask = (typeof fnctnDesc === "string") | (bitMask << 1);
		bitMask = (typeof errorMsg === "string") | (bitMask << 1);
		if (bitMask === 15) {
			console.log("error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName + "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};");
		} else {
			var incorrectTypings;
			var bitMaskCopy;
			var newErrorMsg;
			
			// Determine how many incorrectly typed arguments were encountered
			for (var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++) {
				incorrectTypings += bitMaskCopy & 1;
				bitMaskCopy = bitMaskCopy >> 1;
			}
			
			// Construct a new error message
			if (incorrectTypings == 1) {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly typed argument."
			} else {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed arguments."
			}
			newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n";
			newErrorMsg += "\t\tfileName = " + fileName + "\n";
			if (!(bitMask & 1)) {
				newErrorMsg = "\t\ttypeof filename = " + (typeof fileName) + "\n";
			}
			newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
			if(!((bitMask & 2) >> 1)) {
				newErrorMsg = "\t\ttypeof fnctnName = " + (typeof fnctnName) + "\n";
			}
			newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
			if(!((bitMask & 4) >> 2)) {
				newErrorMsg = "\t\ttypeof fnctnDesc = " + (typeof fnctnDesc) + "\n";
			}
			newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
			if(!((bitMask & 8) >> 3)) {
				newErrorMsg = "\t\ttypeof errorMsg = " + (typeof errorMsg) + "\n";
			}

			// Recursively call jQuery.logError with the new error message.
			$.logError(
				thisFileName,
				thisFuncName,
				thisFuncDesc,
				newErrorMsg
			);
		}
	}

	/*******************************************************************************************************************
	 * Function calls made once the DOM IS READY                                                                       *
	 *******************************************************************************************************************/
    $(function () {
		var argsList = new Object(); // List of arguments that will be passed to functions
		var args;
		
		// Set up organized list of arguments to be passed to functions called during document initialization
		argsList.fixDogears = {
			slctrSiteNav: "#spine-sitenav",
			slctrDogeared: "li.current.active.dogeared",
			removedClasses: "current active dogeared"
		};
		argsList.addBlankTargetAttributes = {
			slctrSpine: "#spine",
			slctrExternalLinks: "a.external"
		};
		argsList.checkForLrgFrmtSingle = {
			slctrSingle: ".single.large-format-friendly",
			slctrMainHdr: "header.main-header",
			slctrHdrGroup: ".header-group",
			centeringClass: "centered"
		};
		argsList.initHrH2Motif = {
			slctrStandardH2: ".column > h2:not(.fancy), .column > section > h2:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			h2ClassesAdded: "no-top-margin",
			hrClassesAdded: "narrow-bottom-margin dark-gray thicker",
			animAddDrtn: 250
		};
		argsList.initFancyHrH2Motif = {
			slctrFancyH2: ".column > h2.fancy, .column > section > h2.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin dark-gray thicker encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initHrH3Motif = {
			slctrStandardH3: ".column > h3:not(.fancy), .column > section > h3:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "narrow-bottom-margin crimson",
			animAddDrtn: 250
		};
		argsList.initFancyHrH3Motif = {
			slctrFancyH3: ".column > h3.fancy, .column > section > h3.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin crimson encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initDropDownToggles = {
			slctrToggle: ".drop-down-toggle",
			slctrWhatsToggled: ".toggled-panel",
			activatingClass: "activated",
			animDuration: 500
		};
		argsList.initReadMoreToggles = {
			slctrToggleIn: ".read-more-toggle-in-ctrl",
			slctrToggleOut: ".read-more-toggle-out-ctrl",
			slctrPanel: ".read-more-panel",
			animDuration: 500
		};
		argsList.initContentFlippers = {
			slctrCntntFlppr: ".content-flipper",
			slctrFlppdFront: ".flipped-content-front",
			slctrFlppdBack: ".flipped-content-back",
			animDuration: 500
		};
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
		argsList.addDefinitionListButtons = {
			slctrDefList: argsList.initDefinitionLists.slctrDefList,
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			btnDisablingClass: "disabled",
			dtActivatingClass: argsList.initDefinitionLists.dtActivatingClass,
			ddRevealingClass: argsList.initDefinitionLists.ddRevealingClass,
			animSldDrtn: argsList.initDefinitionLists.animSldDrtn
		};
		argsList.initQuickTabs = {
			slctrQtSctn: "section.row.single.quick-tabs"
		};
		argsList.initTocFloating = {
			slctrToc: "p.vpue-jump-bar",
			slctrBackToToc: "p.vpue-jump-back"
		};
		argsList.initTriggeredByHover = {
			slctrTrggrdOnHvr: ".triggered-on-hover",
			slctrCntntRvld: ".content-revealed",
			slctrCntntHddn: ".content-hidden",
			animDuration: 200
		};
		
		// Call document initialization functions
		args = argsList.fixDogears;
        fixDogears(
			args.slctrSiteNav,
			args.slctrDogeared,
			args.removedClasses
		);
		
		args = argsList.addBlankTargetAttributes;
		addBlankTargetAttributes(
			args.slctrSpine,
			args.slctrExternalLinks
		);
		
		args = argsList.checkForLrgFrmtSingle;
        checkForLrgFrmtSingle(
			args.slctrSingle,
			args.slctrMainHdr,
			args.slctrHdrGroup,
			args.centeringClass
		);
		
		args = argsList.initHrH2Motif;
        initHrH2Motif(
			args.slctrStandardH2,
			args.slctrPrevHr,
			args.h2ClassesAdded,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH2Motif;
        initFancyHrH2Motif(
			args.slctrFancyH2,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initHrH3Motif;
        initHrH3Motif(
			args.slctrStandardH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH3Motif;
        initFancyHrH3Motif(
			args.slctrFancyH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initDropDownToggles;
        initDropDownToggles(
			args.slctrToggle,
			args.slctrWhatsToggled,
			args.activatingClass,
			args.animDuration
		);
		
		args = argsList.initReadMoreToggles;
        initReadMoreToggles(
			args.slctrToggleIn,
			args.slctrToggleOut,
			args.slctrPanel,
			args.animDuration
		);
		
		args = argsList.initContentFlippers;
        initContentFlippers(
			args.slctrCntntFlppr,
			args.slctrFlppdFront,
			args.slctrFlppdBack,
			args.animDuration
		);
		
		args = argsList.initDefinitionLists;
        initDefinitionLists(
			args.slctrDefList,
			args.slctrLrgFrmtSection,
			args.slctrColOne,
			args.slctrColTwo,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn,
			args.animHghtDrtn
		);
		
		args = argsList.addDefinitionListButtons;
        addDefinitionListButtons(
			args.slctrDefList,
			args.expandAllClass,
			args.collapseAllClass,
			args.btnDeactivatingClass,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn
		);
		
		args = argsList.initQuickTabs;
		initQuickTabs(
			args.slctrQtSctn
		);
		
		args = argsList.initTocFloating;
		initTocFloating(
			args.slctrToc,
			args.slctrBackToToc
		);

		args = argsList.initTriggeredByHover;
        initTriggeredByHover(
			args.slctrTrggrdOnHvr,
			args.slctrCntntRvld,
			args.slctrCntntHddn,
			args.animDuration
		);
		
		// TODO: initScrollingSidebars("...");
        
    });
    
	/*******************************************************************************************************************
	 * WINDOW LOAD event bindings                                                                                      *
	 *******************************************************************************************************************/
    $(window).on("load", function () {
		var params = new Object();
		var theseParams;
		
		// Set up parameters for functions called during the window load event
		params.finalizeLrgFrmtSideRight = {
			slctrSideRight: ".side-right.large-format-friendly",
			slctrColOne: ".column.one",
			slctrColTwo: ".column.two",
			trggrWidth: 1051,
			animDuration: 100
		};
		params.showDefinitionListButtons = {
			slctrDefList: "dl.toggled",
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			animFadeInDrtn: 400
		};
		params.initWelcomeMessage = {
			slctrWlcmMsg: "#welcome-message",
			slctrPostWlcmMsg: "#post-welcome-message",
			msgDelay: 1000,
			fadeOutDuration: 500,
			fadeInDuration: 500
		};
		
		// Make calls to functions
		theseParams = params.finalizeLrgFrmtSideRight;
        finalizeLrgFrmtSideRight(
			theseParams.slctrSideRight,
			theseParams.slctrColOne,
			theseParams.slctrColTwo,
			theseParams.trggrWidth,
			theseParams.animDuration
		);
		theseParams = params.showDefinitionListButtons;
		showDefinitionListButtons(
			theseParams.slctrDefList,
			theseParams.expandAllClass,
			theseParams.collapseAllClass,
			theseParams.animFadeInDrtn
		);
		theseParams = params.initWelcomeMessage;
		initWelcomeMessage(
			theseParams.slctrWlcmMsg,
			theseParams.slctrPostWlcmMsg,
			theseParams.msgDelay,
			theseParams.fadeOutDuration,
			theseParams.fadeInDuration
		);
    });
    
	/*******************************************************************************************************************
	 * WINDOW RESIZE event bindings                                                                                    *
	 *******************************************************************************************************************/
    $(window).resize(function () {
        resizeLrgFrmtSideRight(".side-right.large-format-friendly", "div.column.one", "div.column.two",
         1051, 100);
    });
    
	/*******************************************************************************************************************
	 * DOCUMENT INITIALIZATION function definitions (designed to be called after DOM is ready)                         *
	 *******************************************************************************************************************/
	
	/**
	 * addBlankTargetAttributes
	 * DESCRIPTION: Adds missing blank target attributes to links within the WSU Spine as needed.
	 * PARAMETERS:
	 *   - slctrSpine: selector string for locating the spine object within the DOM
	 *   - slctrExternalLinks: selector string for locating links within the spine that lead to destination external to the domain
	 */
	function addBlankTargetAttributes(slctrSpine, slctrExternalLinks) {
		var thisFnctnName = "addBlankTargetAttributes";
		var thisFnctnDesc = "Adds missing blank target attributes to links within the WSU Spine as needed.";
		if (typeof slctrSpine === "string" && typeof slctrExternalLinks === "string") {
			var $spine = $(slctrSpine);
			if ($spine.length === 1) {
				var $links = $spine.find(slctrExternalLinks);
				$links.each(function () {
					var $thisLink = $(this);
					if ($thisLink.attr("target") != "_blank") {
						$thisLink.attr("target", "_blank");
						var relStr = $thisLink.attr("rel");
						if (relStr == undefined) {
							$thisLink.attr("rel", "noopener noreferrer");
						} else {
							if (relStr.search(/noopener/i) < 0) {
								relStr += " noopener";
							}
							if (relStr.search(/noreferrer/i) < 0) {
								relStr += " noreferrer";
							}
							$thisLink.attr("rel", relStr);
						}
					}
				});
			} else {
				$.logError(
					thisFileName, thisFnctnName, thisFnctnDesc,
					"I could not locate the WSU Spine element within the DOM."
				);
			}
		} else {
			$.logError(
				thisFileName, thisFnctnName, thisFnctnDesc,
				"I was passed one or more incorrectly typed parameters. Here's what I was passed:\n\ttypeof slctrSpine = " + (typeof slctrSpine) + "\n\ttypeof slctrExternalLinks = " + (typeof slctrExternalLinks)
			);
		}
	}
	
	/**
	 * addDefinitionListButtons
	 * DESCRIPTION: Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists.
	 * PARAMETERS:
	 *   - slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
	 *   - expandAllClass: CSS class for controlling the layout of expand all buttons
	 *   - collapseAllClass: CSS class for controlling the layout of collapse all buttons
	 *   - btnDisablingClass: CSS class applied to disable expand/collapse all buttons
	 *   - dtActivatingClass: CSS class used to indicate an active/expanded state for definition terms
	 *   - ddRevealingClass: CSS class used to realize a revealed, visible state on definitions
	 */
    function addDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, btnDisablingClass,
	 dtActivatingClass, ddRevealingClass, animSldDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists";
		
		// Find and remove any pre-existing expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $existingExpandAlls = $lists.children("." + expandAllClass);
		var $existingCollapseAlls = $lists.children("." + collapseAllClass);
		if ($existingExpandAlls.length > 0) {
			$existingExpandAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Expand all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		if ($existingCollapseAlls.length > 0) {
			$existingCollapseAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Collapse all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		
		// Add initially hidden (via CSS) expand/collapse all buttons to definition lists
		$lists.prepend('<div class="collapse-all-button">[-] Collapse All</div>');
		$lists.prepend('<div class="expand-all-button">[+] Expand All</div>');
		var slctrExpandAll = slctrDefList + " > ." + expandAllClass;
		var $expandAlls = $(slctrExpandAll);
		var slctrCollapseAll = slctrDefList + " > ." + collapseAllClass;
		var $collapseAlls = $(slctrCollapseAll);
		
		// Bind handling functions to button click events
		$expandAlls.click(function() {
			var $thisExpand = $(this);
			if (!$thisExpand.hasClass(btnDisablingClass)) {
				var $nextCollapse = $thisExpand.next("." + collapseAllClass);
				var $parentList = $thisExpand.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if (!$thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.addClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.addClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: $thisDefTermNext[0].scrollHeight
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on an expand all button to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
		$collapseAlls.click(function() {
			var $thisCollapse = $(this);
			if (!$thisCollapse.hasClass(btnDisablingClass)) {
				var $prevExpand = $thisCollapse.prev("." + expandAllClass);
				var $parentList = $thisCollapse.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if ($thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.removeClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.removeClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: 0
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on collapse all button #" + $thisCollapse.index() + "to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
    }
    
    function checkForLrgFrmtSingle(slctrSingle, slctrMainHdr, slctrHdrGroup, centeringClass) {
        var $lrgFrmtSnglSctns = $(slctrSingle);
        if ($lrgFrmtSnglSctns.length > 0) {
            var $mainHeader = $(slctrMainHdr);
            $mainHeader.addClass(centeringClass);
            var $mnHdrChldDiv = $mainHeader.find(slctrHdrGroup);
            $mnHdrChldDiv.addClass(centeringClass);
        }
    }
    
    function fixDogears(slctrSiteNav, slctrDogeared, removedClasses) {
        // Fix bug wherein the wrong items in the spine become dogeared
        var $dogearedItems = $(slctrSiteNav).find(slctrDogeared);
        if ($dogearedItems.length > 1) {
            var currentURL = window.location.href;
            var currentPage = currentURL.substring(currentURL.substring(0, currentURL.length - 1).lastIndexOf("/") + 1, currentURL.length - 1);
            $dogearedItems.each(function () {
                var $this = $(this);
                var $navLink = $this.children("a");
                if ($navLink.length == 1) {
                    var navLinkURL = $navLink.attr("href");
                    var navLinkPage = navLinkURL.substring(navLinkURL.substring(0, navLinkURL.length - 1).lastIndexOf("/") + 1, navLinkURL.length - 1);
                    if (navLinkPage != currentPage) {
                        $this.removeClass(removedClasses);
                    }
                }
            });
        }
    }

    function initContentFlippers(slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration) {
        $(slctrCntntFlppr).click(function () {
            var $this = $(this);
            $this.next(slctrFlppdFront).toggle(animDuration);
            $this.next(slctrFlppdFront).next(slctrFlppdBack).fadeToggle(animDuration);
        });
        $(slctrFlppdFront).click(function () {
            var $this = $(this);
            $this.toggle(animDuration);
            $this.next(slctrFlppdBack).fadeToggle(animDuration);
        });
    }
    
    function initDefinitionLists(slctrDefList, slctrLrgFrmtSection, slctrColOne, slctrColTwo,
     dtActivatingClass, ddRevealingClass, animHghtDrtn) {
		var $listDts = $(slctrDefList + " dt");
		$listDts.attr("tabindex", 0);
        $listDts.click(function() {
            var $this = $(this);
            $this.toggleClass(dtActivatingClass);
			var $thisNext = $this.next("dd");
            $thisNext.toggleClass(ddRevealingClass);
			if ($thisNext.hasClass(ddRevealingClass)) {
				$thisNext.stop().animate({
					maxHeight: $thisNext[0].scrollHeight
				});
			} else {
				$thisNext.stop().animate({
					maxHeight: 0
				});
			}
			var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
			var $prntNxt = $parent.next(slctrColTwo);
			$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
        });
		$listDts.on("keydown", function(e) {
			var regExMask = /Enter| /g; // TODO: Divide and conquer
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(dtActivatingClass);
				var $thisNext = $this.next("dd");
				$thisNext.toggleClass(ddRevealingClass);
				if ($thisNext.hasClass(ddRevealingClass)) {
					$thisNext.stop().animate({
						maxHeight: $thisNext[0].scrollHeight
					});
				} else {
					$thisNext.stop().animate({
						maxHeight: 0
					});
				}
				var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
				var $prntNxt = $parent.next(slctrColTwo);
				$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
			}
		});
        $(slctrDefList + " dd").removeClass(ddRevealingClass);
    }
    
    function initDropDownToggles(slctrToggle, slctrWhatsToggled, activatingClass, animDuration) {
		var $toggles =  $(slctrToggle);
		$toggles.attr("tabindex", 0);
		$toggles.addClass("no-anchor-highlighting");
		effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration);
        $toggles.click(function () {
            var $this = $(this);
			$this.blur();
            $this.toggleClass(activatingClass);
            $this.next(slctrWhatsToggled).toggle(animDuration);
			setupDropDownTogglePermanence($this, activatingClass);
        }); // TODO: change implementation to height + overflow based hiding approach
		$toggles.on("keydown", function(e) {
			var regExMask = /Enter| /g;
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(activatingClass);
				$this.next(slctrWhatsToggled).toggle(animDuration);
				setupDropDownTogglePermanence($this, activatingClass);
			}
		});
    }
	
	function effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration) {
		var thisFuncName = "effectDropDownTogglePermanence";
		var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element based on previous user interactions during the session.";
		if ($.isJQueryObj($toggles)) {
			$toggles.each(function() {
				var $this = $(this);
				if ($this[0].id) {
					try {
						var state = sessionStorage.getItem($this[0].id);
						if (state == "expanded") {
							$this.toggleClass(activatingClass);
							$this.next(slctrWhatsToggled).toggle(animDuration);							
						}
					} catch(e) {
						$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
					}
				} else {
					$.logError(thisFileName, thisFuncName, thisFuncDesc,
						"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
				}
			});
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
	
	function setupDropDownTogglePermanence($toggle, activatingClass) {
		var thisFuncName = "setupDropDownTogglePermanence";
		var thisFuncDesc = "Records the expansion state of a drop down toggle element in local storage to later effect permanence.";
		if ($.isJQueryObj($toggle)) {
			if ($toggle[0].id) {
				try {
					var state = $toggle.hasClass(activatingClass) ? "expanded" : "collapsed";
					sessionStorage.setItem($toggle[0].id, state);
				} catch(e) {
					$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
				}
			} else {
				$.logError(thisFileName, thisFuncName, thisFuncDesc,
					"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
			}
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
    
    function initFancyHrH2Motif(slctrFancyH2, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrFancyH2).each(function () {
                $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
    function initFancyHrH3Motif(slctrFancyH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrFancyH3).each(function () {
            $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
    function initHrH2Motif(slctrStandardH2, slctrPrevHr, h2ClassesAdded, hrClassesAdded, animAddDrtn) {
        $(slctrStandardH2).each(function () {
                var $this = $(this);
				var $prevElem = $this.prev(slctrPrevHr);
				if ($prevElem.length > 0) {
					$this.addClass(h2ClassesAdded);
					$prevElem.addClass(hrClassesAdded, animAddDrtn);
				}
        });
    }
    
    function initHrH3Motif(slctrStandardH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrStandardH3).each(function () {
            $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
	function initQuickTabs(slctrQtSctn) {
		var $qtSctn = $(slctrQtSctn);
		$qtSctn.each(function () {
			var $thisSctn = $(this);
			var $tabCntnr = $thisSctn.find("div.column > ul");
			var $tabs = $tabCntnr.find("li");
			var $panelCntnr = $thisSctn.find("table");
			var $panels = $panelCntnr.find("tbody:first-child > tr");
			if($tabs.length == $panels.length) {
				var idx;
				var jdx;
				for (idx = 0; idx < $tabs.length; idx++) {
					$tabs.eq(idx).click(function() {
						var $thisTab = $(this);
						var kdx = $tabs.index($thisTab);
						if (kdx == 0) {
							if ($thisTab.hasClass("deactivated")) {
								$thisTab.removeClass("deactivated");
								$panels.eq(kdx).removeClass("deactivated");
								for (jdx = 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						} else {
							if (!$thisTab.hasClass("activated")) {
								if (!$tabs.eq(0).hasClass("deactivated")) {
									$tabs.eq(0).addClass("deactivated");
									$panels.eq(0).addClass("deactivated");
								}
								for (jdx = 1; jdx < kdx; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$thisTab.addClass("activated");
								$panels.eq(kdx).addClass("activated");
								for (jdx = kdx + 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						}
					});
				}
			}
		});
	}

    function initReadMoreToggles(slctrToggleIn, slctrToggleOut, slctrPanel, animDuration) {
        $(slctrToggleIn).click(function () {
            var $this = $(this);
            var $next = $this.next(slctrPanel);
            $this.toggle(animDuration);
            $this.$next.toggle(animDuration);
            $this.$next.next(slctrToggleOut).toggle(animDuration);
        });
        $(slctrToggleOut).click(function () {
            var $this = $(this);
            var $next = $this.next(slctrPanel);
            $this.toggle(animDuration);
            $this.$next.toggle(animDuration);
            $this.$next.next(slctrToggleIn).toggle(animDuration);
        });
    }
	
	function initTocFloating(slctrToc, slctrBackToToc) {
		var $toc = $(slctrToc);
		var $backToToc = $(slctrBackToToc);
		var $linkToTop = $backToToc.first().children("a");
		var $mainHeader = $("header.main-header");
		if($toc.length === 1 && $mainHeader.length === 1) {
			var $window = $(window);
			var tocTrigger = $toc.offset().top + $toc.height() + 100;
			var $tocClone = $toc.clone().addClass("floating").removeAttr("id").insertAfter($toc);
			$tocClone.find("span.title + br").remove();
			$tocClone.find("span.title").remove();
			var counter = 1;
			$tocClone.find("br").each(function () {
				if (counter % 2 != 0) {
					$(this).before(" //");
				}
				$(this).remove();
				counter++;
			});
			if($linkToTop.length === 1) {
				var linkText = $linkToTop.text();
				var idxMatched = linkText.search(/\u2014Back to ([^\u2014]+)\u2014/);
				if(idxMatched != -1) {
					var $linkToTopClone = $linkToTop.clone();
					$linkToTopClone.text(linkText.replace(/\u2014Back to ([^\u2014]+)\u2014/, "$1"));
					$tocClone.prepend(" //&nbsp;");
					$linkToTopClone.prependTo($tocClone);
					$backToToc.remove();
				} else {
					$.logError("initTocFloating", "Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find the correct textual pattern within the link back to the top of the page.' }");
				}
			} else {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find a single hyperlink within the first link back to the top of the page.' }");
			}
			$window.scroll(function(e) {
				var windowScrollPos = $window.scrollTop();
				if(windowScrollPos > tocTrigger && !$tocClone.is(":visible")) {
					$tocClone.width($mainHeader.width() * .8);
					$tocClone.css({
						left: $mainHeader.offset().left + $mainHeader.width() / 2,
					});
					$tocClone.fadeIn(300);
				}
				else if(windowScrollPos <= tocTrigger && $tocClone.is(":visible")) {
					$tocClone.hide();
				}
			});
			$window.resize(function () {
				$tocClone.width($mainHeader.width() * .8);
				$tocClone.css({
					left: $mainHeader.offset().left + $mainHeader.width() / 2,
				});
			});
		}
		else {
			if($toc.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
			if($mainHeader.length === 0) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Could not find the main header  element within the DOM.' }");
			}
			else if($mainHeader.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
		}
	}
    
    function initTriggeredByHover(slctrTrggrdOnHvr, slctrCntntRvld, slctrCntntHddn, animDuration) {
        $(slctrTrggrdOnHvr).mouseenter(function () {
            var $this = $(this);
            var $rvldCntnt = $this.find(slctrCntntRvld);
            var $hddnCntnt = $this.find(slctrCntntHddn);
            $rvldCntnt.stop().show(animDuration);
            $hddnCntnt.stop().hide(animDuration);
        }).mouseleave(function () {
            var $this = $(this);
            var $rvldCntnt = $this.find(slctrCntntRvld);
            var $hddnCntnt = $this.find(slctrCntntHddn);
            $rvldCntnt.stop().hide(animDuration);
            $hddnCntnt.stop().show(animDuration);
        });
    }
    
    function initWelcomeMessage(slctrWlcmMsg, slctrPostWlcmMsg, msgDelay, fadeOutDuration,
     fadeInDuration) {
        $(slctrWlcmMsg).delay(msgDelay).fadeOut(fadeOutDuration, function () {
            $(slctrPostWlcmMsg).fadeIn(fadeInDuration);
        });
    }

	/*******************************************************************************************************************
	 * LOADED WINDOW FUNCTIONS                                                                                         * 
	 *******************************************************************************************************************/
    function finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
        if($(window).width() >= trggrWidth) {
            $(slctrSideRight + ">" + slctrColTwo).each(function () {
                var $this = $(this);
                var $thisPrev = $this.prev(slctrColOne);
                if($this.height() != $thisPrev.height() ) {
                    $this.height($thisPrev.height());
                }
                var crrntOpacity = $this.css("opacity");
                if (crrntOpacity == 0) {
                    $this.animate({opacity: 1.0}, animDuration);
                }
            });
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
	function showDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, animFadeInDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Display expand/collapse all buttons, which were initially hidden";
		
		// Display expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $expandAlls = $lists.children("." + expandAllClass);
		var $collapseAlls = $lists.children("." + collapseAllClass);
		$lists.animate({
			marginTop: "+=39px"
		}, animFadeInDrtn, function() {
			$expandAlls.fadeIn(animFadeInDrtn);
			$collapseAlls.fadeIn(animFadeInDrtn);
		});
	}
		
	/*******************************************************************************************************************
	 * WINDOW-RESIZE TRIGGERED FUNCTIONS                                                                               *
	 *******************************************************************************************************************/
    function resizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
        finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration);
    }
	
})(jQuery);
/***************************************************************************************************************************
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
})(jQuery);/**
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
/************************************************************************************************************\
| JQUERY-MEDIATED ENHANCED INTERACTIVITY OF GRAVITY FORM FIELDS                                              |
\************************************************************************************************************/
(function ($) {
    "use strict";
    
	$(document).bind("gform_post_render", function () {
		var $rqrdFlds =  $("li.gfield_contains_required");
		checkRqrdInpts($rqrdFlds.find("input"));
		checkRqrdChckbxs($rqrdFlds.find("ul.gfield_checkbox, ul.gfield_radio"));
		checkRqrdTxtAreas($rqrdFlds.find("textarea"));
	});
	$(document).ready(function () {
        if($("div.gform_body").length > 0) {
			initWsuIdInputs(".gf-is-wsu-id");
            setupActvtrChckbxs(".oue-gf-actvtr-checkbox");
            setupActvtrChain(".oue-gf-actvtr-chain");
            setupUploadChain(".oue-gf-upload-chain");
			
            // TODO: streamline functions by querying all ul.gform_fields li.gfield, then determine 
            //   how to handle object by finding div children with gfield_container_class.
			var $rqrdFlds =  $("li.gfield_contains_required");
			hghlghtRqrdInpts($rqrdFlds.find("input"));
			hghlghtRqrdChckbxs($rqrdFlds.find("ul.gfield_checkbox, ul.gfield_radio"));
			hghlghtRqrdTxtAreas($rqrdFlds.find("textarea"));
			hghlghtRqrdSelects($rqrdFlds.find("select"));
        }
    });
	$(window).load(function () {
		hghlghtRqrdRchTxtEdtrs( $( '.gfield_contains_required.uses-rich-editor' ) );
	});
    
    /****************************************************************************************************\
    | Highlight required INPUTS until a value has been properly entered                                  |
    \****************************************************************************************************/
    function checkRqrdInpts ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				if ($thisInput.val() == "") {
					$thisInput.removeClass("gf-value-entered");
				}
				else {
					$thisInput.addClass("gf-value-entered");
				}
            });
        }
    }
	
    function hghlghtRqrdInpts ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				$thisInput.blur(function () {
					if ($thisInput.val() == "") {
						$thisInput.removeClass("gf-value-entered");
					}
					else {
						$thisInput.addClass("gf-value-entered");
					}
				});
            });
        }
    }

    /****************************************************************************************************\
    | Highlight required CHECKBOXES until at least one has been checked                                  |
    \****************************************************************************************************/
    function checkRqrdChckbxs ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $this = $(this);
                var $inputs = $this.find("input");
				var inputReady = false;
                $inputs.each(function () {
					if ($(this).prop("checked") == true && !inputReady) {
						inputReady = true;
					}
				});
				if (inputReady) {
					$this.addClass("gf-value-entered");
				}
				else {
					$this.removeClass("gf-value-entered");
				}
			});
		}
	}

    function hghlghtRqrdChckbxs ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $this = $(this);
                var $inputs = $this.find("input");
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.change(function () {
                        var $thisParent, $parentsInputs;
                        var inputReady = false;
                        
                        $thisParent = $thisChild.parents("ul.gfield_checkbox, ul.gfield_radio");
                        $parentsInputs = $thisParent.find("input");
                        $parentsInputs.each(function () {
                            if ($(this).prop("checked") == true && !inputReady) {
                                inputReady = true;
                            }
                        });
                        if (inputReady) {
                            $thisParent.addClass("gf-value-entered");
                        }
                        else {
                            $thisParent.removeClass("gf-value-entered");
                        }
                    });
                });
            });
        }
    }

    /****************************************************************************************************\
    | Highlight required TEXT AREA inputs until a value has been properly entered                        |
    \****************************************************************************************************/
    function checkRqrdTxtAreas ($fields) {
		checkRqrdInpts($fields);
    }

    function hghlghtRqrdTxtAreas ($fields) {
		hghlghtRqrdInpts($fields);
    }

    /****************************************************************************************************\
    | Highlight required RICH TEXT EDITOR containters until a value has been properly entered            |
    \****************************************************************************************************/
	function hghlghtRqrdRchTxtEdtrs($fields) {
        if ($.isJQueryObj($fields) && $fields.length > 0) {
            $fields.each(function () {
				var $edtrFrm = $(this).find("iframe");
				$edtrFrm.each(function () {
					var $edtrBdy = $(this).contents().find("#tinymce");
					$edtrBdy.css( {
						 backgroundColor: 'rgba(255,0,0,0.1)',
						 fontFamily: '"Open sans", sans-serif'
					} );
					$edtrBdy.focus(function () {
						$(this).css("background-color", "rgba(255,255,255,1)");
					});
					$edtrBdy.blur(function () {
						var $this = $(this);
						if($this.text().replace(/\n|\uFEFF/g, "") == "") {
							$this.css("background-color","rgba(255,0,0,0.1)");
						}
					});
				});
			});
		}
	}

    /****************************************************************************************************\
    | Highlight required SELECTS until at least one has been checked                                     |
    \****************************************************************************************************/
    function hghlghtRqrdSelects ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				var $childSlctdOptn = $thisInput.find("option:selected");
				var optionVal = $childSlctdOptn.text();                        
				if (optionVal != "") {
					$thisInput.addClass("gf-value-entered");
				}
				else {
					$thisInput.removeClass("gf-value-entered");
				}
				$thisInput.change(function () {
					$childSlctdOptn = $thisInput.find("option:selected");
					optionVal = $childSlctdOptn.text();                        
					if (optionVal != "") {
						$thisInput.addClass("gf-value-entered");
					}
					else {
						$thisInput.removeClass("gf-value-entered");
					}
				});
            });
        }
    }

    /****************************************************************************************************\
    | Initialize RegEx filtration of inputs that accept WSU ID numbers                                   |
    \****************************************************************************************************/
    function initWsuIdInputs(slctrInputs) {
        var $wsuIdInputs = $(slctrInputs).find("input[type='text']");
		$wsuIdInputs.keydown(function(e) {
            var $this = $(this);
            var inputText = $this.val();
			if((e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) &&
			 !~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) &&
			 !(e.keyCode == 86 && e.ctrlKey)) {
				e.preventDefault();
			}
			else if (!~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) && inputText.length >= 9) {
				e.preventDefault();
				alert("Note: WSU ID numbers are no greater than nine (9) digits in length.");
			}
		});
        $wsuIdInputs.on("paste", function (e) {
            var $this = $(this);
			var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
			var inputText = clipboardData.getData('Text');
            var regExMask = /[^0-9]+/g;
            if (regExMask.exec(inputText) != null) {
				var errorMsg = "Note: WSU ID numbers can only contain digits.";
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.replace(regExMask, ""));
                inputText = $this.val();
				if (inputText.length > 9) {
					$this.val(inputText.slice(0,9));
					errorMsg += " Also, they must be no greater than nine (9) digits in length.";
				}
				errorMsg += " What you pasted will automatically be corrected; please check the result to see if further corrections are needed."
				alert(errorMsg);
            }
            else if (inputText.length > 9) {
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.slice(0,9));
				alert("WSU ID numbers are no greater than nine (9) digits in length. What you pasted will automatically be corrected; please check the result to see if further corrections are needed.");
            }
        });
        $wsuIdInputs.blur(function () {
            var $this = $(this);
            var regExFinalPttrn = /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
            var inputText = $this.val();
			if (inputText != "") {
				if (regExFinalPttrn.exec(inputText) == null) {					
					$this.val("");
					alert("Please try again: when the leading zero is included, WSU ID numbers are nine (9) digits long. (You can also drop the leading zero and enter in eight (8) digits.)");
				}
			}
        });
    }
	
    /****************************************************************************************************\
    | Setup activator checkboxes that disappear once one is selected                                     |
    \****************************************************************************************************/
    function setupActvtrChckbxs (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                $thisParent.addClass("gf-activated");
            });
        }
    }
    
    /****************************************************************************************************\
    | Setup a chain of activator checkboxes, wherein once a checkbox is activated/deactivated,           |
    | only its closest previous sibling is hidden/shown.                                                 |
    \****************************************************************************************************/
    function setupActvtrChain (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                var $parentPrevSblngs = $thisParent.prevAll(selector);
                if($thisChild.prop("checked")) {
                    $parentPrevSblngs.first().addClass("gf-hidden");
                }
                else {
                    $parentPrevSblngs.first().removeClass("gf-hidden");
                }
            });
        }
    }

    /****************************************************************************************************\
    | Setup a chain of file uploading inputs, wherein only the left-most input in the tree is            |
    | visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.             |
    \****************************************************************************************************/
    function setupUploadChain (selector) {
        if ($.type(selector) === "string") {
            /* CHECK IF UPLOADS ALREADY EXIST:
             *  It is possible to arrive at this point in execution after the user has submitted a
             *  form containing errors that also already contains transcripts uploaded to input
             *  fields that will be hidden by default. The following blocks of code resolve this
             *  situation by showing such fields, as well as their nearest neighbors.
             */
            var $inputs = $(selector + " input[type='file']");
            $inputs.each(function () {
                var $thisInput = $(this);
                var $nextDiv = $thisInput.nextAll("div[id]").first();
                if($nextDiv.length > 0) {
                    $thisInput.addClass("gf-value-entered");
                    var $parentOfInput = $thisInput.parents(selector).first();
                    $parentOfInput.removeClass("gf-hidden");
                    var $parentNextSblngs = $parentOfInput.nextAll(selector).first();
                    $parentNextSblngs.removeClass("gf-hidden");
                }
            });
            $(".gform_body").on("change", selector + " input[type='file']", function () {
                var $thisInput = $(this);
                if($thisInput.prop("files") != null && $thisInput.prop("files").length > 0) {
                    var valuePassed = true;
                    var $parentOfInput = $thisInput.parents(selector).first();
                    var $parentNextSblngs = $parentOfInput.nextAll(selector);
                    var $parentPrevSblngs = $parentOfInput.prevAll(selector);
                    if($parentNextSblngs.length != 0 || $parentPrevSblngs.length != 0) {
                        var originalFileName = $thisInput.prop("files").item(0).name;
                        $parentPrevSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && $thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                        $parentNextSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && $thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                    }
                    if(valuePassed) {                      
                        $thisInput.addClass("gf-value-entered");
                        $parentNextSblngs.first().removeClass("gf-hidden");
                    }
                    else
                    {
                        alert("A file with the same name has already been uploaded; please choose a different file.");
                        $thisInput.get(0).value = "";
                    }
                }
                else {
                    $thisChild.removeClass("gf-value-entered");
                }
            });
        }
    }
    
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
/*!
 * jQuery.qTip.js: Application of qTip2 jQuery plugin to WSU OUE websites. Please see
 *     https://github.com/qTip2/qTip2/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license [https://opensource.org/licenses/MIT]
 */
 
( function ( $ ) {

var thisFileName = 'jquery.are-you-sure.js';

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

function processQTips(qTipSlctr)
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


/*!
 *  QTip content class
 */
function QTipContent( $qTipSlctr ) {
	var regExPttrn1 = /^\(tooltip: ?(.+)\|(.+)(?=\))\)$/;
	var regExPttrn2 = /^(.+)\|(.+)$/;
	var regExResult;
	this.qTipTitle = null;
	this.qTipText = null;
	this.qTipInnerHTML = null;
	regExResult = regExPttrn1.exec( $qTipSlctr.text() );
	if ( regExResult != null && regExResult.length == 3 ) {
		this.qTipTitle = regExResult[1];
		this.qTipText = regExResult[2];
		regExPttrn = /^(.+)\|/;
		this.qTipInnerHTML = ( regExResult[1] + '|' + regExResult[2] ).replace( regExPttrn, '' );
	} else {
		regExResult = regExPttrn2.exec( $qTipSlctr.text() );
		if ( regExResult != null && regExResult.length == 3 ) {
			this.qTipTitle = regExResult[1];
			this.qTipText = regExResult[2];
			regExPttrn = /^(.+)\|/;
			this.qTipInnerHTML = $qTipSlctr.html().replace( regExPttrn, '' );
		} else {
			this.qTipText = $qTipSlctr.text();
			this.qTipInnerHTML = $qTipSlctr.html();
		}
	}
}

} )( jQuery );/* jQuery Cookie Plugin v1.4.1
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