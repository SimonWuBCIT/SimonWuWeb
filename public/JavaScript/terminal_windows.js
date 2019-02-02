/*****************************************************
 ***** Functions to be loaded when page is ready *****
 *****************************************************/
$(document).ready(function() {

    /***********************************************************
     ***** Binds to the close button to close each section ***** 
     ***********************************************************/
    $('.close_button').click(function() {
        let element = $(this).closest('.section');
        if (element.length <= 0) {
            element = $(this).closest('.portrait');
        }
        element.hide();
    });

    /***********************************************************************
     ***** Binds to the search bar to trigger command on Enter pressed *****
     ***********************************************************************/
    $('.terminal_command').keydown(function(event) {
        if (event.key == "Enter") {
            let value = this.value;
            switch (value) {
                case "ls courses":
                    $('.section.courses').show();
                    break;
                case "man simonwu":
                    $('.section.about_me').show();
                    break;
                case "man simon_wu":
                    $('.section.about_me').show();
                    break;
                case "ls education":
                    $('.section.education').show();
                    break;
                case "whereis simonwu":
                    $('.portrait').show();
                    break;
                case "whereis simon_wu":
                    $('.portrait').show();
                    break;
                default:
                    //do nothing
            }
            this.value = "";
        }
    });
})
