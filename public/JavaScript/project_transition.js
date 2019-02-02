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

    //PROJECT TABS AND VIEW - OLD DESIGN
    // $('.project_tab').click(function() {
    //     hideAllProjects();
    //     switch ($(this).attr('name')) {
    //         case "Telus":
    //             $('#project_1').show();
    //             break;
    //         case "Psycle":
    //             $('#project_2').show();
    //             break;
    //         case "Scavange":
    //             $('#project_3').show();
    //             break;
    //         case "Idle":
    //             $('#project_4').show();
    //             break;
    //         default:
    //             //do nothing
    //     }
    // });

    // function hideAllProjects() {
    //     $('#project_1').hide();
    //     $('#project_2').hide();
    //     $('#project_3').hide();
    //     $('#project_4').hide();
    // }

    // $(".project_card").on("mouseover", function () {
    //     var window_width = window.matchMedia("(min-width: 768px)");
    //     var card_name = this.classList[1];
    //     if (window_width.matches) {
    //         $('.project_card.' + card_name).animate({ height: '90%', marginTop: 0 }, "fast");
    //     }
    // });

    // $(".project_card").on("mouseleave", function () {
    //     var window_width = window.matchMedia("(min-width: 768px)");
    //     var card_name = this.classList[1];
    //     if (window_width.matches) {
    //         $('.project_card.' + card_name).animate({ height: '60px', marginTop: 200 }, "fast");
    //     }
    // });
});