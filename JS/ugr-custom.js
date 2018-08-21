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
	addPageHeaderToNews();

	// Set up advanced interactive behaviors of gravity forms
	traverseAddressInputs( '.ugrf-mailing-address' );
	termYearInputs = new OueTermYearInputs( '.oue-term-year-field' );

	// Handle use of max-1188 class override
	checkForMax1386Page();

} );

// FUNCTION DECLARATIONS

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
