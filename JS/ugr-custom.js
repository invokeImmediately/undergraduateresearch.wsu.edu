/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
    "use strict";
    
	$(document).ready(function () {            
        /**********************************************************************************************
         * Tweak HTML source to work around some quirks of WordPress setup                            *
         **********************************************************************************************/
        var ugrSiteURL = window.location.pathname;
        switch(ugrSiteURL) {
            case '/news/':
                $('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>WSU Undergraduate Research News</h2><h3>What\'s going on with our students and programs</h3></div></section></div></section>');
                break;
        }
        
        /**********************************************************************************************
         * Set up advanced interactive behaviors of gravity forms                                     *
         **********************************************************************************************/
        traverseAddressInputs('.ugrf-mailing-address');
	});
    
    function traverseAddressInputs (selector) {
        if ($.type(selector) === "string") {
            $(selector).each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
                    if ($thisChild.val() == "") {
                        $thisChild.removeClass('value-entered');
                    }
                    else {
                        $thisChild.addClass('value-entered');
                    }
                    $thisChild.blur(function () {                      
                        if ($thisChild.val() == "") {
                            $thisChild.removeClass('value-entered');
                        }
                        else {
                            $thisChild.addClass('value-entered');
                        }
                        
                        var $thisParent = $thisChild.parents(selector);
                        var $parentsInputs = $thisParent.find('input');
                        var counter = 0;
                        var inputReady = true;
                        $parentsInputs.each(function () {
                            if (counter != 1 && $(this).val() == "") {
                                inputReady = false;
                            }
                            counter++;
                        });
                        
                        if (inputReady) {
                            $thisParent.addClass('inputs-ready');
                        }
                        else {
                            $thisParent.removeClass('inputs-ready');
                        }
                    });
                });
            });
        }
    }
})(jQuery);