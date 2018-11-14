/*!
 * Site-specific JS for the WSU Office of Undergraduate Research website.
 *
 * @author - Daniel Rieck ( danielcrieck@gmail.com ) [https://github.com/invokeImmediately]
 */

( function ( $ ) {

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Main execution

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1.1: DOM Ready

$( function () {
	var ugrSiteURL;

	// Tweak HTML source to work around some quirks of WordPress setup
	addPageHeaderToNews();
	initTravelScholarshipForm( "#gform_wrapper_6" );
});

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

// TODO: Document this function.
function DisableTsfValidatorTabIndexing( $form, sels ) {
	var $field = $form.find( sels.validatedField );
	var $validator = $field.next( sels.validator );
	var $validator_input;

	if ( $field.length && $validator.length ) {
		$validator_input = $validator.find( "input" );
		$validator_input.attr( 'tabindex', '-1' );
	}
}

// TODO: Document this function.
function finishHidingTravelFormValidators( $form, sels ) {
	DisableTsfValidatorTabIndexing( $form, {
		validatedField: sels.eligibility,
		validator: sels.validators
	} );
}

/**
 * Intialize a travel scholarship form when it is present on the active web page.
 *
 * @param {string} selForm - The selector for isolating the travel scholarship form from the DOM.
 */
// TODO: Add error handling.
function initTravelScholarshipForm( selForm ) {
	var $form = $( selForm );
	var selValidators = '.travel-scholarship__validator';

	if ( $form.length ) {
		finishHidingTravelFormValidators( $form, {
			eligibility: '.travel-scholarship__eligibility',
			validators: selValidators
		} );
		initTsfEligibilityValidation( $form, {
			field: '.travel-scholarship__eligibility',
			validator: selValidators
		} );
	}
}

// TODO: Document this function.
function initTsfEligibilityValidation( $form, sels ) {
	var $field = $form.find( sels.field );
	var $checkBoxes;
	var $validator = $field.next( sels.validator );
	var $validator_input;

	if ( $field.length && $validator.length ) {
		$validator_input = $validator.find( "input" );
		$checkBoxes = $field.find( ":checkbox" );
		$checkBoxes.change( function () {
			var $this = $( this );
			var $cbs;
			var allChecked = true;
			var $parentField = $this.parents( sels.field );
			console.log('Checkbox changed.');
			$cbs = $parentField.find( ":checkbox" );
			$cbs.each( function () {
				var $this = $( this );
				if ( allChecked && !this.checked) {
					allChecked = false;
				}
			} );
			if ( allChecked && $validator_input.val() != "validated" ) {
				$validator_input.val( "validated" );
			} else if ( $validator_input.val() != "" ) {
				$validator_input.val( "" );
			}
		} );
	}
}

} )( jQuery );
