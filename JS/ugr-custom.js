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
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Function Declarations

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

// TODO: Add inline documentation
function fixEventsCalendarHeader( $body ) {
	var $main;
	var $mainHeader;
	var $subHeaderDefault;

	if ( $.isJQueryObj( $body ) ) {
		$main = $body.find( '#wsuwp-main' );
		$mainHeader = $main.find( '.main-header' );
		$subHeaderDefault = $mainHeader.find( '.sub-header-default' );
		$subHeaderDefault.text( 'Office of Undergraduate Research' );		
	}
}

} )( jQuery );