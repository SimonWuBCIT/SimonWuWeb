/*****************************************************
 ***** Functions to be loaded when page is ready *****
 *****************************************************/
$(document).ready(function () {
    $('.navigation_mobile').hide();
    // $('#project_2').hide();
    // $('#project_3').hide();
    // $('#project_4').hide();
    $('.project_text').hide();

    $('.logo').click(function() {
        if ($('.navigation_desktop').css("display") == "none") {
            $('.navigation_mobile').toggle();
        }
    });

    $('.up_button_container').click(function() {
        let text_element = $(this).closest('.project_description');
        let image_element = text_element.prev();
        let project_text = text_element.find('.project_text');
        
        if (!(image_element.height() === 0)) {
            image_element.animate({height: '0'}, "fast");
            text_element.animate({ height: '100%' }, "fast");
            project_text.show();
        } else {
            image_element.animate({ height: '90%' }, "fast");
            text_element.animate({height: '10%'}, "fast");
            project_text.hide();
        }
    });
});