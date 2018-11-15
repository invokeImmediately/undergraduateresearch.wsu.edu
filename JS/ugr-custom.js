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
	initTravelScholarshipForm( "#gform_wrapper_6" );
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

var GfCheckboxValidators = ( function() {
	function GfCheckboxValidators( $form, sels ) {
		this.$form = $form;
		this.sels = sels;
	}

	GfCheckboxValidators.prototype.finishHidingValidators = function () {
		var $field;
		var $validator;
		var $validator_input;

		if ( this.IsObjValid() ) {
			// Isolate validator and its target field in the DOM.
			$field = this.$form.find( this.sels.validatedField );
			$validator = $field.next( this.sels.validator );

			// Disable tab indexing to form validators.
			if ( $field.length && $validator.length ) {
				$validator_input = $validator.find( "input" );
				$validator_input.attr( 'tabindex', '-1' );
			}
		}
	};

	GfCheckboxValidators.prototype.initValidation = function() {
		var $checkBoxes;
		var $field;
		var $form = this.$form;
		var $validator;
		var $validator_input;
		var sels = this.sels;
		var stillValid;

		stillValid = this.IsObjValid();
		if ( !stillValid ) {
			throw Error( "Object properties did not pass validity check." );
		} else {
			// Find the appropriate fields within the form.
			$field = $form.find( sels.validatedField );
			$validator = $field.next( sels.validator );
		}

		stillValid = $field.length && $validator.length;
		if ( !stillValid ) {
			throw Error( "Couldn't find the validator and validated fields within the form." );
		} else {
			// Now find the input elements within the fields.
			$checkBoxes = $field.find( ":checkbox" );
			$validator_input = $validator.find( "input" );
		}

		stillValid = $checkBoxes.length && $validator_input.length;
		if ( !stillValid ) {
			throw Error( "Couldn't find the expected input elements within the form's validator and\
 validated fields." );
		} else {
			$checkBoxes.change( function () {
				var $this = $( this );
				var $cbs;
				var $parentField = $this.parents( sels.validatedField );
				var allChecked = true;

				// Check the state of all the checkbox inputs within the validated field.
				$cbs = $parentField.find( ":checkbox" );
				$cbs.each( function () {
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

	GfCheckboxValidators.prototype.IsObjValid = function() {
		var stillValid = true;
		var selsProps;

		if ( !( $.isJQueryObj( this.$form ) && this.$form.hasClass( 'gform_wrapper' ) ) ) {
			stillValid = false;
		}
		if ( stillValid && !( typeof this.sels === 'object' ) ) {
			stillValid = false
		} else if ( stillValid ) {
			selsProps = Object.getOwnPropertyNames( this.sels );
		}
		if ( stillValid && !( selsProps.length === 2 &&
				selsProps.find( function( elem ) { return elem === 'validatedField'; } ) &&
				selsProps.find( function( elem ) { return elem === 'validator'; } ) ) ) {
			stillValid = false;
		}

		return stillValid;
	};

	return GfCheckboxValidators;
} )();

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

/**
 * Intialize a travel scholarship form when it is present on the active web page.
 *
 * @param {string} selForm - The selector for isolating the travel scholarship form from the DOM.
 */
// TODO: Add error handling.
function initTravelScholarshipForm( selForm ) {
	var $form = $( selForm );
	var checkboxValidators;

	if ( $form.length ) {
		try {
			checkboxValidators = new GfCheckboxValidators( $form, {
				validatedField: '.travel-scholarship__eligibility',
				validator: '.travel-scholarship__validator'
			} );
			checkboxValidators.finishHidingValidators();
			checkboxValidators.initValidation();
		} catch ( err ) {
			console.log( err.name + ': ' + err.message );
		}
	}
}

} )( jQuery );
