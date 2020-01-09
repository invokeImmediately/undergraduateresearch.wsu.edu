/*!*************************************************************************************************
 * gulpfile.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Gulp automation task definition file for setting up tasks that build CSS and JS
 * files for use on the WSUWP website of the Office of Undergraduate Research at WSU.
 *
 * DESCRIPTION: This gulp automation task definition file is designed for use on the following
 *   project that is maintained on GitHub:
 *   https://github.com/invokeImmediately/undergraduateresearch.wsu.edu
 *
 * LICENSE: ISC - Copyright (c) 2020 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL C. RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO
 *   THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT
 *   SHALL DANIEL C. RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
 *   ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gulp task dependencies..................................................................40
// §2: Specificiation of build settings .......................................................45
//   §2.1: getCssBuildSettings()...............................................................48
//   §2.2: getJsBuildSettings()................................................................99
// §3: Entry point: Set up of build taks......................................................131
////////////////////////////////////////////////////////////////////////////////////////////////////

( function() {

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gulp task dependencies

var gulpBuilder = require( './WSU-UE---JS/gulpBuilder.js' );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Specificiation of build settings 

////////
// §2.1: getCssBuildSettings()

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */
function getCssBuildSettings() {
	var commentRemovalNeedle = /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm;
	var dependenciesPath = './WSU-UE---CSS/';
	var destFolder = './CSS/';
	var fontImportStr = '@import url(\'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,4\
00,400i,600,600i,700,700i|Roboto+Condensed:400,400i,700,700i|PT+Serif:400,400i,700,700i|Roboto+Mono\
:400,400i,700,700i&display=swap\');\r\n';
	var insertingMediaQuerySectionHeader = {
			'before': /^@media/,
			'lineBefore': '/*! ====================================================================\
============================\r\n*** Media queries section\r\n*** ==================================\
==============================================================\r\n***   SUMMARY: Media queries buil\
t from precompiled CSS written in the Less language extension of\r\n***    CSS. Queries in this sec\
tion are a combination of those designed for use on DAESA websites***\r\n    and those intended spe\
cifically for use on the Office of Undergraduate Research website.\r\n***\r\n***   DESCRIPTION: Ful\
ly documented, precompiled source code from which this section of the custom\r\n***    stylesheet w\
as built is developed and maintained on the following two GitHub projects:\r\n***    https://github\
.com/invokeImmediately/WSU-UE---CSS/\r\n***    https://github.com/invokeImmediately/undergraduatere\
search.wsu.edu/\r\n***   AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImme\
diately)\r\n***\r\n***   LICENSE: ISC - Copyright (c) 2020 Daniel C. Rieck.\r\n***\r\n***     Permi\
ssion to use, copy, modify, and/or distribute this software for any purpose with or\r\n***     with\
out fee is hereby granted, provided that the above copyright notice and this permission\r\n***     \
notice appear in all copies.\r\n***\r\n***     THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL C. RIECK\
 DISCLAIMS ALL WARRANTIES WITH REGARD TO\r\n***     THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES \
OF MERCHANTABILITY AND FITNESS. IN NO EVENT\r\n***     SHALL DANIEL C. RIECK BE LIABLE FOR ANY SPEC\
IAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR\r\n***     ANY DAMAGES WHATSOEVER RESULTING FROM\
 LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF\r\n***     CONTRACT, NEGLIGENCE OR OTHER TOR\
TIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE\r\n***     OR PERFORMANCE OF THIS SOFTWA\
RE.\r\n*** ========================================================================================\
========\r\n**/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '/*! Built with the Less CSS preprocessor [http://lesscss.org/]. Plea\
se see [https://github.com/invokeImmediately/undergraduateresearch.wsu.edu] for a repository of sou\
rce code. */\r\n';
 	var sourceFile = './CSS/ugr-custom.less';

	return new gulpBuilder.CssBuildSettings(commentRemovalNeedle, dependenciesPath,
 		destFolder, fontImportStr, insertingMediaQuerySectionHeader, minCssFileExtension,
 		minCssFileHeaderStr, sourceFile);
}

////////
// §2.2: getJsBuildSettings()

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.oue-animate.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.css-data.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./WSU-UE---JS/jQuery.masonry-custom.js',
			'./JS/ugr-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'ugr-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Entry point: Set up of build task

/* -------------------------------------------------------------------------------------------------
** Main execution sequence
*/

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );

} )();
