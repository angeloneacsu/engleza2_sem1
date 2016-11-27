function static_click(data_obj) {
    this.data_obj = data_obj;
    this.html_hook_id = data_obj.id;
    this.first_init = true;

    this.arr_start_page = $.map(data_obj.start_page, function(value, index) {
        return value;
    });

}

static_click.prototype.init = function() {

    this.is_verification_started = false;
    this.sstare_iteratie = 'corect';
    this.local_arr_validitate = [];
    this.local_arr_valid_obj = [];

    $('.game_frame').hide(); $("#" + this.html_hook_id + ' .static_r').addClass('hidden');
    $('.item_ch').hide();
    $("#" + this.html_hook_id + ' .verificare').removeClass('inactiv');
    $("#" + this.html_hook_id).show();

//    $('.elements_data').removeClass(' c_true c_false');
//    $('.checkbox-holder div').removeClass('true checked c_true c_false c_uncheck_true c_uncheck_false');

//    $("#" + this.html_hook_id + ' .title').html(this.data_obj.titlu);
    $("#" + this.html_hook_id + ' .top p').remove();
    $("#" + this.html_hook_id + ' .top ').append("<p class='game_desc'>" + this.data_obj.game_desc + "</p>");
    $("#" + this.html_hook_id + ' .top ').append("<p class='unit_title'>" + this.data_obj.unit_title + "</p>");
$("#" + this.html_hook_id + ' .start_nr').html(this.data_obj.nr_exercitiu);
    $("#" + this.html_hook_id + ' .number_hook ').html(this.data_obj.unit_nr);
    $("#" + this.html_hook_id + ' .container').attr('data-audio', this.data_obj.sarcina.sunet);
    $("#" + this.html_hook_id + ' .static_audio').attr('data-audio', this.data_obj.sarcina.sunet);
    $("#" + this.html_hook_id + ' .container').attr('data-audio', this.data_obj.sarcina.sunet);
    play_audio(false, this.data_obj.sarcina.sunet);

    if (this.first_init) {
        this.add_events();
    }

};
static_click.prototype.add_events = function() {
    _this = this;
    this.first_init = false;$('#' + this.html_hook_id + ' .reia_sarcina').on("vclick", function() {_this.init();});

    /*static type1- on click fadein the element passed in data-target*/
    $('.onclick_show').unbind('click');
    $('.onclick_show').on('click', function(e) {
        e.preventDefault();
    
        $('#'+$(this).attr('data-target')).removeClass('hidden');
    });

    /*end type1 static*/

    /*static type2- on click fadein the element child element 'item_ch' */
     $('.clicl_elem').unbind('click');
    $('.clicl_elem').on('click', function() {
        $('.item_ch', this).fadeIn(500);
    });
    
    $('#' + this.html_hook_id + ' .fila_cta').unbind('click');    
    $('#' + this.html_hook_id + ' .fila_cta').on('click', function() {
        $(this).next('.fila_content').slide();

    });
    /*end type2 static*/


    /*static type3 - on click show or hide the value passed in data-name */
    $('#' + this.html_hook_id + '  .name_tag').unbind('click');  
    $('#' + this.html_hook_id + '  .name_tag').on('click', function(e) {
        e.preventDefault();
    
        if ($(this).hasClass('show')) {
            $(this).html('...');
        } else {
            $(this).html($(this).attr('data-name'));
        }
        $(this).toggleClass('show');
    });

/*show or hide the value of all name tag - elem*/
 $('#' + this.html_hook_id + '  .all_name_tags').unbind('click');  
    $('#' + this.html_hook_id + '  .all_name_tags').on('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass('showall')) {

            $('#' + this.html_hook_id + '  .name_tag').each(function() {
                $(this).addClass('show');
                $(this).html($(this).attr('data-name'));
            })
        } else {
            $('#' + this.html_hook_id + '  .name_tag').removeClass('show');
            $('#' + this.html_hook_id + '  .name_tag').html('...');
        }
        $(this).toggleClass('showall');

    });
    /*end type2 static*/
};

$(document).ready(function() {
    var item_static_click = new static_click(obj_static_ex);

    $('.static_container').on('vclick', function(e) {
        e.preventDefault();

        if ($(this).attr('data-gameId') == 'item_static_click') {
            item_static_click.init();
        }

        $('.section').hide();
        $('.wrapper').addClass('remove_shadow_and_white');
        $('.wrapper').css({
            height: "auto"
        });
    });
});

        