
var no_choice = 'no_input';/* name of audio file toi be played on no choice event */
var corect_audio_name = 'check_right';
var wrong_audio_name = 'check_wrong';
var nr_total_iteratii = 3;
var curr_iter_nr = 1;
/* cate iteratii avem */
var nr_elem_in_iter = 5;
/* numarul maxim de variante gresite intr-o iteratie */
var max_nr_wrong = 3;
var is_verification_started;
var arr_usable_elem_corect = [];
var arr_usable_elem_wrong = [];
var arr_start_up = [];

var arr_validitate = [];
var arr_valid_obj = [];






function gameType_multipleChoice(data_obj) {
    this.data_obj = data_obj;
    this.html_hook_id = data_obj.id;
    this.first_init = true;

    this.arr_start_page = $.map(data_obj.start_page, function(value, index) {
        return value;
    });

}

gameType_multipleChoice.prototype.init = function() {  activ_help_btn = true;

    this.is_verification_started = false;
    this.sstare_iteratie = 'corect';
    this.local_arr_validitate = [];
    this.local_arr_valid_obj = [];
    $('.avatar').show();
    $('.avatar_corect').hide();
    $('.avatar_gresit').hide();

    $('.game_frame').hide();
    $("#" + this.html_hook_id + ' .verificare').removeClass('inactiv');
    $("#" + this.html_hook_id).show();

    $('.elements_data,.error').removeClass(' c_true c_false');
    $('.checkbox-holder div,.error').removeClass('true checked c_true c_false c_uncheck_true c_uncheck_false');
$("#" + this.html_hook_id + ' .top p').remove();$("#" + this.html_hook_id + ' .top ').append("<p class='game_desc'>" + this.data_obj.game_desc + "</p>");$("#" + this.html_hook_id + ' .top ').append("<p class='unit_title'>" + this.data_obj.unit_title + "</p>");$("#" + this.html_hook_id + ' .start_nr').html(this.data_obj.nr_exercitiu);

//    $("#" + this.html_hook_id + ' .title').html(this.data_obj.titlu);
    $("#" + this.html_hook_id + ' .number_hook ').html(this.data_obj.unit_nr);
    $("#" + this.html_hook_id + ' .container').attr('data-audio', this.data_obj.sarcina.sunet);
    play_audio(false, this.data_obj.sarcina.sunet);

    $("#" + this.html_hook_id + ' .ajutor').attr('data-audio', this.data_obj.ajutor.sunet);
    $("#" + this.html_hook_id + ' .help_text').html(this.data_obj.ajutor.text);

    var arr_start_page = this.arr_start_page;
    /*randomize elements*/
    arr_start_page = arr_start_page.sort(function() {
        return 0.5 - Math.random();
    });
    var html_hook_id = this.html_hook_id;
    $("#" + this.html_hook_id + ' .elements_data').each(function(index, value) {

        var el_index = index;
        $('.img_element', this).attr('src', 'assets/images/game/' + arr_start_page[el_index].imagine);

        /*random placement order*/
        var arr_random = [];

        for (var j = 0; j < $('.response', this).length; j++) {
            arr_random[j] = j;
        }
        var arr_random = $.randomize(arr_random);

        $('.response', this).each(function(index, value) {
            $(this).attr('data-status', arr_start_page[el_index].variante[arr_random[index]].status);
            $(this).html(arr_start_page[el_index].variante[arr_random[index]].valoare);
        });
    });

    if (this.first_init) {
        this.add_events();
    }

};
gameType_multipleChoice.prototype.add_events = function() {
    var _this = this;
    this.first_init = false;
   $('#' + this.html_hook_id + ' .reia_sarcina').on("vclick", function() {_this.init();});
   
    $('#' + this.html_hook_id + ' .checkbox-holder .response').on("vclick", function() {
        $(this).parent().find('.response').removeClass('checked');
        $(this).addClass('checked');
    });
    $('#' + this.html_hook_id + ' .verificare').on("vclick", function() {

        _this.verifica();
    });

};

gameType_multipleChoice.prototype.verifica = function() {
    var data = $("#" + this.html_hook_id + ' .elements_data');

    var local_arr_validitate = [];
    var local_arr_valid_obj = [];
    /* contains the elemts that ar true or false for each iteretion*/

    /* test if any selection has been made*/
    if (this.is_verification_started || $("#" + this.html_hook_id + ' .verificare').hasClass('inactiv')) {

        return false;
    }
    this.is_verification_started = true;

    $(data).each(function(index, value) {

        var valid = 'no_choice';
        var elem_obj;

        $('.checkbox-holder div', this).each(function(index, value) {
            if (($(this).attr('data-status') == 'true') && ($(this).hasClass('checked'))) {
                valid = true;
                elem_obj = $(this);
            } else if (($(this).attr('data-status') == 'false') && ($(this).hasClass('checked'))) {
                valid = false;
                elem_obj = $(this);
            }
        });

        local_arr_validitate.push(valid);
        local_arr_valid_obj.push(elem_obj);

    });

    this.local_arr_validitate = local_arr_validitate;
    this.local_arr_valid_obj = local_arr_valid_obj;

    if ($.inArray("no_choice", local_arr_validitate) > -1) {
        play_audio(false, no_choice);
        this.is_verification_started = false;
        return false;
    } else if ($.inArray(false, local_arr_validitate) > -1) {
        this.stare_iteratie = 'wrong';
    } else {
        this.stare_iteratie = 'correct';
    }

    var corect = local_arr_validitate.length;
    for (var i = 0; i < local_arr_validitate.length; i++) {
        if (local_arr_validitate[i] == false || local_arr_validitate[i] == 'no_choice_false') {
            corect--
        }
    }
    var rezultat = corect + '/' + local_arr_validitate.length;
    insertResponse(this.data_obj.nr_pagina, this.data_obj.nr_exercitiu, rezultat, this.stare_iteratie);
    this.take_action();

};

gameType_multipleChoice.prototype.take_action = function() { activ_help_btn = false;

    _this = this;
    /*validare*/
    $(player_valid).off('ended');
    var random_sound_nr = randomnumber(1, 6);
    var valid;
    var elem_obj;


    if (this.local_arr_validitate.length > 1) {
        valid = this.local_arr_validitate.splice(0, 1);
        elem_obj = this.local_arr_valid_obj.splice(0, 1);

        if (valid[0] == true) {
            $(elem_obj[0]).addClass('c_true');
            $(elem_obj[0]).parent().parent().addClass('c_true');
            $(elem_obj[0]).parent().parent().find('.error').addClass('c_true');
            play_audio_valid(corect_audio_name);
        } else {
            $(elem_obj[0]).addClass('c_false');
            $(elem_obj[0]).parent().parent().addClass('c_false');
            $(elem_obj[0]).parent().parent().find('.error').addClass('c_false');
            play_audio_valid(wrong_audio_name);
        }

        $(player_valid).on('ended', function() {
            return _this.take_action();
        });


    } else if (this.local_arr_validitate.length == 1) {
        valid = this.local_arr_validitate.splice(0, 1);
        elem_obj = this.local_arr_valid_obj.splice(0, 1);

        if (valid[0] == true) {
            $(elem_obj[0]).addClass('c_true');
            $(elem_obj[0]).parent().parent().addClass('c_true');
            $(elem_obj[0]).parent().parent().find('.error').addClass('c_true');
            play_audio_valid(corect_audio_name);

        } else {
            $(elem_obj[0]).addClass('c_false');
            $(elem_obj[0]).parent().parent().addClass('c_false');
            $(elem_obj[0]).parent().parent().find('.error').addClass('c_false');
            play_audio_valid(wrong_audio_name);

        }

        $(player_valid).on('ended', function() {
            $(player_valid).off('ended');

            if (_this.stare_iteratie == 'wrong') {
                play_audio_valid('gresit_' + random_sound_nr);
            } else {
                play_audio_valid('corect_' + random_sound_nr);
            }
            show_anim(_this.stare_iteratie);
            if (_this.stare_iteratie == 'wrong') {
                $(player_valid).on('ended', function() {
                    return  _this.show_correct();
                });
            }

            $('.verificare').addClass('inactiv');

        });
    }
}
gameType_multipleChoice.prototype.show_correct = function() { activ_help_btn = false;
    _this = this;

    play_audio_valid(_this.data_obj.raspuns_corect.sunet);
    $(player_valid).off('ended');
    $(player_valid).on('ended', function() {
        $('.elements_data,.error').removeClass(' c_true c_false');
        $('.checkbox-holder div').removeClass('true checked c_true c_false c_uncheck_true c_uncheck_false');

        $("#" + _this.html_hook_id + ' .elements_data').each(function(index, value) {
            $('.checkbox-holder div', this).each(function(index, value) {
                if (($(this).attr('data-status') == 'true')) {
                    $(this).addClass('checked c_true');
                }
            });
        });
        $(player_valid).off('ended');
    });


}

/*randomize arrauy*/
$.randomize = function(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x)
        ;
    return arr;
};

var curent_audio_name_valid;
var player_valid;
function play_audio_valid(filename) {

    var file_name = filename;

    file_name = file_name.replace('.mp3', '');

    if (curent_audio_name_valid == file_name) {
        player_valid.setCurrentTime(0);
        player_valid.play();
    } else {
        curent_audio_name_valid = file_name;

        try {
            player_valid.setSrc('../../assets/sounds/' + file_name + '.mp3');
        } catch (err) {
            player_valid.load('../../assets/sounds/' + file_name + '.mp3');
        }
        player_valid.play();
    }

}
$(document).ready(function() {
    var item_gameType_multipleChoice = new gameType_multipleChoice(obj_gameType_multipleChoice);

    $('.gm_container').on('vclick', function(e) {
        e.preventDefault();

        if ($(this).attr('data-gameId') == 'item_gameType_multipleChoice') {
            item_gameType_multipleChoice.init();
        }

        $('.section').hide();
        $('.wrapper').addClass('remove_shadow_and_white');
        $('.wrapper').css({
            height: 'auto'
        });
    });
});

        