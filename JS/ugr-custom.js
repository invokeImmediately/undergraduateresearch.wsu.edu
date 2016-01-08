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
        traverseInputs('.ugrf-name');
        traverseInputs('.ugrf-wsu-id');
        traverseCheckboxInputs('.ugrf-scholarship-selections');
        traverseInputs('.ugrf-institution');
        traverseAddressInputs('.ugrf-mailing-address');
        traverseAddressInputs('.ugrf-permanent-address');
        traverseInputs('.ugrf-major');
        traverseInputs('.ugrf-email');
        traverseInputs('.ugrf-phone');
        traverseInputs('.ugrf-mentor-name');
        traverseInputs('.ugrf-mentor-email');
	});
    
    function traverseInputs (selector) {
        if ($.type(selector) === "string") {
            $(selector).each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.blur(function () {
                        var $thisParent, $parentsInputs;
                        var inputReady = true;
                        
                        if ($thisChild.val() == "") {
                            $thisChild.removeClass('value-entered');
                        }
                        else {
                            $thisChild.addClass('value-entered');
                        }
                        
                        $thisParent = $thisChild.parents(selector);
                        $parentsInputs = $thisParent.find('input');
                        $parentsInputs.each(function () {
                            if ($(this).val() == "") {
                                inputReady = false;
                            }
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
    
    function traverseAddressInputs (selector) {
        if ($.type(selector) === "string") {
            $(selector).each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
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
    
    function traverseCheckboxInputs (selector) {
        if ($.type(selector) === "string") {
            $(selector).each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.change(function () {
                        var $thisParent, $parentsInputs;
                        var inputReady = false;
                        
                        $thisParent = $thisChild.parents(selector);
                        $parentsInputs = $thisParent.find('input');
                        $parentsInputs.each(function () {
                            if ($(this).prop('checked') == true && !inputReady) {
                                inputReady = true;
                            }
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