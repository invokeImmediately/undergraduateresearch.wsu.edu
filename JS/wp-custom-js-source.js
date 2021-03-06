/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
( function ( $ ) {

"use strict";

// DECLARE CLASSES

// NOTE: Assumes jQuery is in use.
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
	}

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
	}

	// EXECUTE REMAINING CONSTRUCTION INSTRUCTIONS
	this.setValidKeyCodes();
	this.applyKeyDownHandler();
	this.applyBlurHandler();

}

// 'DOCUMENT READY' CODE EXECUTION SECTION
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
	termYearInputs = new OueTermYearInputs( '.oue-term-year-field' );

	// Handle use of max-1188 class override
	checkForMax1386Page();

} );

// FUNCTION DECLARATIONS

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
			setupDropDownTogglePermanence($this, activatingClass);
        });
		$toggles.on("keydown", function(e) {
			var regExMask = /Enter| /g;
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(activatingClass);
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
	$(function () {
        if($("div.gform_body").length > 0) {
			initWsuIdInputs(".gf-is-wsu-id");
            setupActvtrChckbxs(".oue-gf-actvtr-checkbox");
            setupActvtrChain(".oue-gf-actvtr-chain");
            setupUploadChain(".oue-gf-upload-chain");
			
            // TODO: streamline functions by querying all ul.gform_fields li.gfield, then determine 
            //   how to handle object by finding div children with gfield_container_class. Best to
            //   implement as a class.
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
    
    /******************************************************************************************\
    | Highlight required INPUTS until a value has been properly entered                        |
    \******************************************************************************************/
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

    /******************************************************************************************\
    | Highlight required CHECKBOXES until at least one has been checked                        |
    \******************************************************************************************/
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

    /******************************************************************************************\
    | Highlight required TEXT AREA inputs until a value has been properly entered              |
    \******************************************************************************************/
    function checkRqrdTxtAreas ($fields) {
		checkRqrdInpts($fields);
    }

    function hghlghtRqrdTxtAreas ($fields) {
		hghlghtRqrdInpts($fields);
    }

    /******************************************************************************************\
    | Highlight required RICH TEXT EDITOR containters until a value has been properly entered  |
    \******************************************************************************************/
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

    /******************************************************************************************\
    | Highlight required SELECTS until at least one has been checked                           |
    \******************************************************************************************/
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

    /******************************************************************************************\
    | Initialize RegEx filtration of inputs that accept WSU ID numbers                         |
    \******************************************************************************************/
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
			else if (!~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) &&
					inputText.length >= 9) {
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
				errorMsg += " What you pasted will automatically be corrected; please check the "
					+ "result to see if further corrections are needed."
				alert(errorMsg);
            }
            else if (inputText.length > 9) {
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.slice(0,9));
				alert("WSU ID numbers are no greater than nine (9) digits in length. What you "
					+ "pasted will automatically be corrected; please check the result to see if "
					+ "further corrections are needed.");
            }
        });
        $wsuIdInputs.blur(function () {
            var $this = $(this);
            var regExFinalPttrn = /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
            var inputText = $this.val();
			if (inputText != "") {
				if (regExFinalPttrn.exec(inputText) == null) {					
					$this.val("");
					alert("Please try again: when the leading zero is included, WSU ID numbers are "
						+ "nine (9) digits long. (You can also drop the leading zero and enter in "
						+ "eight (8) digits.)");
				}
			}
        });
    }
	
    /******************************************************************************************\
    | Setup activator checkboxes that disappear once one is selected                           |
    \******************************************************************************************/
    function setupActvtrChckbxs (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                $thisParent.addClass("gf-activated");
            });
        }
    }
    
    /******************************************************************************************\
    | Setup a chain of activator checkboxes, wherein once a checkbox is activated/deactivated, |
    | only its closest previous sibling is hidden/shown.                                       |
    \******************************************************************************************/
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

    /******************************************************************************************\
    | Setup a chain of file uploading inputs, wherein only the left-most input in the tree is  |
    | visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.   |
    \******************************************************************************************/
    function setupUploadChain (selector) {
        if ($.type(selector) === "string") {

            // CHECK IF UPLOADS ALREADY EXIST:
            //  It is possible to arrive at this point in execution after the user has submitted a
            //  form containing errors that also already contains transcripts uploaded to input
            //  fields that will be hidden by default. The following blocks of code resolve this
            //  situation by showing such fields, as well as their nearest neighbors.
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
                                if($thisSblngInput.prop("files") != null && 
                                		$thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                        $parentNextSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null &&
                                		$thisSblngInput.prop("files").length > 0) {
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
                        alert("A file with the same name has already been uploaded; please choose "
                        	+ "a different file.");
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
/* qtip2 v3.0.3 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Wed May 11 2016 22:31:31 */

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