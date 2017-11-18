/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
 './ugr-custom.js',
 '../WSU-UE---JS/jQuery.oue-custom.js',
 '../WSU-UE---JS/jQuery.oue-animate.js',
 '../WSU-UE---JS/jQuery.textResize.js',
 '../WSU-UE---JS/jQuery.forms.js',
 '../../jquery.AreYouSure/jQuery.are-you-sure.js',
 '../WSU-UE---JS/jQuery.are-you-sure.js',
 '../../qTip2/dist/jquery.qtip.min.js',
 '../WSU-UE---JS/jQuery.qTip.js',
 '../WSU-UE---JS/jQuery.cookieObjs.js'
 ], './wp-custom-js-source.js', function() {
    console.log('Concatenation complete.');     
 });
