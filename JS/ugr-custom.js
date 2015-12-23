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
            $('.ugrf-name').each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.blur(function () {
                        var idx, $thisParent, $parentsInputs;
                        var inputReady = true;
                        
                        if ($thisChild.val() == "") {
                            $thisChild.removeClass('value-entered');
                        }
                        else {
                            $thisChild.addClass('value-entered');
                        }
                        
                        $thisParent = $thisChild.parents('.ugrf-name');
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
            
            $('.ugrf-wsu-id').each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.blur(function () {
                        var idx, $thisParent, $parentsInputs;
                        var inputReady = true;
                        
                        if ($thisChild.val() == "") {
                            $thisChild.removeClass('value-entered');
                        }
                        else {
                            $thisChild.addClass('value-entered');
                        }
                        
                        $thisParent = $thisChild.parents('.ugrf-name');
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
	});
})(jQuery);