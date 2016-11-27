
function dictionar(data_obj) {
    this.data_obj = data_obj;
    this.html_hook_id = data_obj.id;
    this.first_init = true;

    this.arr_start_page = $.map(data_obj.start_page, function(value, index) {
        return value;
    });

}

dictionar.prototype.init = function() {

    this.is_verification_started = false;
    this.sstare_iteratie = 'corect';
    this.local_arr_validitate = [];
    this.local_arr_valid_obj = [];

    $('.game_frame').hide();
    $('.item_ch').hide();
    $("#" + this.html_hook_id + ' .verificare').removeClass('inactiv');
    $("#" + this.html_hook_id).show();
    $("#" + this.html_hook_id + ' .top .section_desc').html(this.data_obj.section);
    $("#" + this.html_hook_id + ' .top .title').html(this.data_obj.titlu);


    var arr_start_page = this.arr_start_page;

    $("#" + this.html_hook_id + ' .elements_data').each(function(index, value) {

        var el_index = index;
        $('.img_element', this).attr('src', 'assets/images/game/' + arr_start_page[el_index].imagine);
        $('.sunet', this).attr('data-audio', arr_start_page[el_index].sunet);
        $('.name', this).attr('data-name', arr_start_page[el_index].name);
    });

    if (this.first_init) {
        this.add_events();
    }

};
dictionar.prototype.add_events = function() {
    var _this = this;
    this.first_init = false;

    $("#" + this.html_hook_id + ' .name_tag').on('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass('show')) {
            $(this).html('...');

        } else {
            $(this).html($(this).attr('data-name'));
        }
        $(this).toggleClass('show');
    });

    $("#" + this.html_hook_id + ' .all_name_tags').on('click', function(e) {

        e.preventDefault();
     
        if (!$(this).hasClass('showall')) {

            $("#" + _this.html_hook_id + ' .name_tag').each(function() {
                $(this).addClass('show');
                $(this).html($(this).attr('data-name'));

            })
        } else {
        
            $("#" + _this.html_hook_id + ' .name_tag').removeClass('show');
            $("#" + _this.html_hook_id + ' .name_tag').html('...');
        }
        $(this).toggleClass('showall');

    });

}
/*randomize arrauy*/




$(document).ready(function() {
    console.debug(obj_dictionar);
    var item_dictionar = new dictionar(obj_dictionar);
    $('#dictionar .name_tag').html('...');
    $('.dictionar_container').on('vclick', function(e) {
        e.preventDefault();
        item_dictionar.init();

        $('.section').hide();
        $('.wrapper').addClass('remove_shadow_and_white');
        $('.wrapper').css({
            height: 'auto'
        });
    });
});

        