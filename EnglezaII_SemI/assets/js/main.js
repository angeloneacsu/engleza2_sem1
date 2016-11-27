

if (typeof (console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {
    };
}/*******************************************************/
/* Local storage
 *
 */
var dbName = "e1";
var tableName = 'r';
var user_table = 'u';
var currentuser = 'c';

function createDb() {
//     Initialise. If the database doesn't exist, it is created
    try {

        lib = new localStorageDB(dbName, localStorage);

//        if (lib.isNew()) {
        // Check if the database was just created. Useful for initial database setup

        if (!lib.tableExists(tableName)) {
            lib.createTable(tableName, ['p', "e", "r", 's', 'u','d']);
        }
        if (!lib.tableExists(user_table)) {
            lib.createTable(user_table, ['u']);
        }
        if (!lib.tableExists(currentuser)) {
            lib.createTable(currentuser, ['u']);
        }
        // commit the database to localStorage
        // all create/drop/insert/update/delete operations should be committed
        lib.commit();

//        }
    } catch (err) {

    }
    user_select();
}

Date.prototype.today = function() {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear()
};
//For the time now
Date.prototype.timeNow = function() {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
};


/**
 * 
 */
function is_local() {
    switch (window.location.protocol) {
        case 'http:':
        case 'https:':
            return false;
            break;
        case 'file:':
            return true;
            break;
        default:
            //some other protocol
    }
}



//se apeleaza prima data cand se intra in manual
//function loginUser() {
//    try {
////    $(".nav-container").append(
////            '<div class="user_block"><span class="user_ico"></span><a href="" class="user_text" id="userName"><span id=""></span></a></div>'
////            )
//
//        var manualEnglezaAllUsers = "manualEnglezaAllUsers1";
//        var manualEnglezaUserLogin = "manualEnglezaUserLogin1";
//        var localStorage = new MyLocalStorage();
//        var sessionStorage = new MySessionStorage();
//
//        $("#loginDialog").empty();
//        if (sessionStorage.getItem(manualEnglezaUserLogin) == null) {
//            if (localStorage.getItem(manualEnglezaAllUsers) != null) {
//                $("#loginDialog").append("<b>Selecteaza utilizator:</b><select id='combo'></select>" +
//                        "<input type='submit' id='loginSelect' value='Intra'/><br><br><br><br>");
//                $.each(JSON.parse(localStorage.getItem(manualEnglezaAllUsers)), function(key, value) {
//                    $("#combo").append("<option>" + key + "</option>");
//                });
//            }
//            $("#loginDialog").append("<b>Creeaza utilizator</b>&nbsp;&nbsp;&nbsp; <br><b>Nume:</b> <input type='text' id='idInputName'>" +
//                    "<input type='submit' id='saveName' value='Intra'/><br><br>");
//        } else {
//            $("#loginDialog").prepend("<br><b>Bine ai venit " + sessionStorage.getItem(manualEnglezaUserLogin) +
//                    "!</b>&nbsp;&nbsp;<input type='submit' id='login' value='Intra'/><br><br><br>");
//
//            $("#loginDialog").append("<b>Selecteaza alt utilizator:</b><select id='combo'></select>&nbsp;&nbsp;<input type='submit' id='loginSelect' value='Intra'/>");
//
//            $("#loginDialog").append("<br><br><b>Creeaza utilizator</b>&nbsp;&nbsp;&nbsp; <br><b>Nume:</b> <input type='text' id='idInputName'>" +
//                    "&nbsp;&nbsp;<input type='submit' id='saveName' value='Intra'/><br><br>");
//
//            $.each(JSON.parse(localStorage.getItem(manualEnglezaAllUsers)), function(key, value) {
//                $("#combo").append("<option>" + key + "</option>");
//            });
//        }
//    } catch (err) {
//
//    }
//}

var tbl_id;
function insertResponse(pagina, exercitiu, raspuns, status) {

    try {
        var newDate = new Date();
        var datetime = newDate.today().substring(0, 6)+newDate.today().substring(8,10) + " " + newDate.timeNow().substring(0, 5);
        var curr_user = lib.query(currentuser, {ID: '1'});
        var id_curr_user = lib.query(user_table, {u: curr_user[0].u});

        if (status == "wrong") {
            status = 'w';
        } else {
            status = 'k';
        }

        lib.insert(tableName, {
            p: pagina,
            e: exercitiu,
            r: raspuns,
            s: status,
            u: id_curr_user[0].ID,
            d: datetime
        });

        lib.commit();

    } catch (err) {

    }

}
function user_select() {

    try {
        var curr_user;
        $('.user_block').remove();
        $(".nav-container").append(
                '<div class="user_block"><span class="user_ico"></span><a href="" class="user_text"><span id=""></span></a></div>'
                );

        login_html = '<div class="login_overlayer"></div>' +
                '<div class="container_login">' +
                '   <form class="" onsubmit="return setuser()">' +
                '<h3 class="form-signin-heading">Creează utilizator:</b></h3>' +
                '<div><input type="text" class="input-block-level" id="user" placeholder="Nume"></div>' +
                '<p><button class="btn  btn-primary" type="submit" onclick="return setuser();">Intră</button></p>' +
                '</form>' +
                '</div>';

        if (lib.rowCount(currentuser) == 0) {
            $('body').append(login_html);

        }
        curr_user = lib.query(currentuser, {ID: '1'});

        if (curr_user[0] != undefined) {
            $('.user_text').html(curr_user[0].u);
        }
    } catch (err) {

    }
}
function newuser() {
    try {
        var arr_users = lib.queryAll(user_table, {
            sort: [["u", "ASC"]]
        });
        var user_select_html = '<option value="nan">Selectează</option>';
        $.each(arr_users, function(index, value) {
            user_select_html += '<option value="' + value.id + '">' + value.u + '</option>';
        });
        login_html = '<div class="login_overlayer"></div>' +
                '<div class="container_login double " >' +
                '   <form class="form-signin pad_r" onsubmit="return setuser(\'select\')" ">' +
                '<h3 class="form-signin-heading">Selectează utilizator:</b></h3>' +
                '<div><select id="select_user">' +
                user_select_html +
                '</select></div>' +
                '<p><button class="btn  btn-primary" type="submit" onclick="return setuser(\'select\')"  >Intră</button></p>' +
                '</form>' +
                '   <form class="form-signin pad_l" onsubmit="return setuser()" >' +
                '<h3 class="form-signin-heading">Creează <br/>utilizator:</b></h3>' +
                '<div><input type="text" class="input-block-level" id="user" placeholder="Nume"></div>' +
                '<p><button class="btn  btn-primary" type="submit" onclick="setuser();">Intră</button></p>' +
                '</form>' +
                '</div>';

        $('.login_overlayer').remove();
        $('.container_login').remove();
        $('body').append(login_html);
    } catch (err) {

    }
}
function setuser(type) {
    try {
        var type = type || 'input';
        var user;

//    var tip = $('#tip option:selected').text();
        var tip = 'elev';
        $('#user').removeClass('error');
        $('#select_user').removeClass('error');

        if (type == 'input') {
            user = $('#user').val();
            if (user == "") {
                $('#user').addClass('error');
                return false;
            }
        } else if (type == 'select') {
            user = $("#select_user option:selected").html();

            if (user == "Selecteaza" || user == 'Selectează') {
                $('#select_user').addClass('error');
                return false;
            }
        }


//    if (tip == "Select") {
//
//        $('#tip').addClass('error');
//        return false;
//    }
        var arr_unic = lib.query(user_table, function(row) {
            if (row.u == user) {
                return true;
            } else {
                return false;
            }
        });

        if (arr_unic.length < 1) {
            lib.insert(user_table, {
                u: user
//                tip: tip
            });
        }

        lib.insertOrUpdate(currentuser, {ID: '1'}, {
            u: user
//            tip: tip
        });
        lib.commit();

        if (location.href.contains('rezultate.html')) {
            location.reload()
        }
        $('.container_login').hide();
        $('.login_overlayer').fadeOut(100);
        curr_user = lib.query(currentuser, {ID: '1'});

        $('.user_text').html(curr_user[0].u);
        return false;
    } catch (err) {

    }
}
function indb() {
    obj_data = lib.query(tableName);

}
/****************************/
/*
 *
 */

function randomnumber(from, to) {
    return Math.floor((Math.random() * to) + from);
}

function goToPage(type) {

    var curentlocation = $(location).attr('href');
    var locationdata = curentlocation.split('/');

    if (curentlocation.indexOf('pages') != -1) {
        var locationdatalength = locationdata.length - 2;
        var curentpages = locationdata[locationdatalength];
        var curentpage = curentpages.split('-')[1];
        curentpage = parseInt(curentpage);
        if (type == 'next') {
            if (generaldata.nr_pagini >= curentpage + 2) {
                newpage = parseFloat(curentpage) + 1;
                newpageplusone = parseFloat(newpage) + 1;
                newpageurl = newpage + '-' + newpageplusone;

                newlocation = curentlocation.replace(curentpages, newpageurl);
                if (newlocation.indexOf('index.html') == -1) {
                    newlocation += "/index.html";
                }
                $(location).attr('href', newlocation);
            }
        } else if (type == 'prev') {
            if (curentpage - 2 >= 1) {
                newpage = parseFloat(curentpage) - 3;
                newpageplusone = parseFloat(newpage) + 1;
                newpageurl = newpage + '-' + newpageplusone;

                newlocation = curentlocation.replace(curentpages, newpageurl);
                if (newlocation.indexOf('index.html') == -1) {
                    newlocation += "/index.html";
                }
                $(location).attr('href', newlocation);
            }
        } else if (type == 'last_page') {
            if (generaldata.nr_pagini >= curentpage + 2) {
                newpage = parseFloat(generaldata.nr_pagini) - 1;
                newpageplusone = generaldata.nr_pagini;
                newpageurl = newpage + '-' + newpageplusone;
                newlocation = curentlocation.replace(curentpages, newpageurl);
                if (newlocation.indexOf('index.html') == -1) {
                    newlocation += "/index.html";
                }
                $(location).attr('href', newlocation);
            }
        } else if (type == 'first_page') {
            if (curentpage - 2 >= 1) {
                newpage = 0;
                newpageplusone = 1;
                newpageurl = newpage + '-' + newpageplusone;
                newlocation = curentlocation.replace(curentpages, newpageurl);
                if (newlocation.indexOf('index.html') == -1) {
                    newlocation += "/index.html";
                }
                $(location).attr('href', newlocation);
            }
        } else if (type == 'gotopage') {
            var goto = parseFloat($('.go-to-input').val());
            var maxpag = generaldata.nr_pagini;

            if (goto && goto !== 0 && maxpag >= goto) {

                newpage = parseFloat(goto);
                if (newpage % 2 == 0) {
                    newpageminusone = parseFloat(newpage) + 1;
                    newpageurl = newpage + '-' + newpageminusone;
                    newlocation = curentlocation.replace(curentpages, newpageurl);
                    if (newlocation.indexOf('index.html') == -1) {
                        newlocation += "/index.html";
                    }
                    if (newlocation.indexOf('index.html') == -1) {
                        newlocation += "/index.html";
                    }
                    $(location).attr('href', newlocation);
                } else if (parseFloat(generaldata.nr_pagini) >= goto + 1) {
                    newpageplusone = parseFloat(newpage) - 1;
                    newpageurl = newpageplusone + '-' + newpage;
                    newlocation = curentlocation.replace(curentpages, newpageurl);
                    if (newlocation.indexOf('index.html') == -1) {
                        newlocation += "/index.html";
                    }
                    $(location).attr('href', newlocation);
                }

            }
        }
    } else {

        var locationdatalength = locationdata.length - 1;


        var replacedata = locationdata[locationdatalength];

        if (type !== 'gotopage') {
            newlocation = curentlocation.replace(replacedata, 'cuprins.html');

            $(location).attr('href', newlocation);
        } else {

            var goto = parseFloat($('.go-to-input').val());
            var maxpag = generaldata.nr_pagini;

            if (goto && goto !== 0 && maxpag >= goto) {

                newpage = parseFloat(goto);
                if (newpage % 2 == 0) {
                    newpageminusone = parseFloat(newpage) + 1;
                    newpageurl = 'pages/' + newpage + '-' + newpageminusone;
                    if (replacedata == '') {

                        newlocation = curentlocation + newpageurl;
                    } else {
                        newlocation = curentlocation.replace(replacedata, newpageurl);
                    }
                    if (newlocation.indexOf('index.html') == -1) {
                        newlocation += "/index.html";
                    }
                    $(location).attr('href', newlocation);
                } else if (parseFloat(generaldata.nr_pagini) >= goto + 1) {
                    newpageplusone = parseFloat(newpage) - 1;
                    newpageurl = 'pages/' + newpageplusone + '-' + newpage;
                    if (replacedata == '') {

                        newlocation = curentlocation + newpageurl;
                    } else {
                        newlocation = curentlocation.replace(replacedata, newpageurl);
                    }
                    if (newlocation.indexOf('index.html') == -1) {
                        newlocation += "/index.html";
                    }
                    $(location).attr('href', newlocation);
                }

            }
        }
    }
}
/**
 *
 * counts json length
 */
$.extend({
    keyCount: function(o) {
        if (typeof o == "object") {
            var i, count = 0;
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
        } else {
            return false;
        }
    }
});
/**
 *
 * Numeric only control handler
 */

jQuery.fn.ForceNumericOnly = function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            if (e.which == 13) {
                goToPage('gotopage');
            }
            return (key == 8 || key == 9 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
        });
    });
};
/**********shuffle ************/
(function($) {

    $.fn.shuffle = function() {
        return this.each(function() {
            var items = $(this).children().clone(true);
            return (items.length) ? $(this).html($.shuffle(items)) : this;
        });
    }

    $.shuffle = function(arr) {
        for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x)
            ;
        return arr;
    }
})(jQuery);

/**
 *detects browser
 *
 *
 * usage:
 * BrowserDetect.browser == 'Explorer';
 BrowserDetect.version <= 9;
 */
var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1)
            return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
        }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
        }]

};
BrowserDetect.init();


/*********************************************/
/* PLAY AUDIO - play audio file
 /**********************************************/
var curent_audio_name;
var player;
function play_audio(el_obj, filename) {
    try {


        var file_name;
        if (el_obj == false) {
            file_name = filename;
        } else {
            file_name = $(el_obj).attr('data-audio');
        }
        file_name = file_name.replace('.mp3', '');
        if (player.paused) {

            if (curent_audio_name == file_name) {
                try {
                    player.play();
                } catch (err) {
                }
            } else {
                curent_audio_name = file_name;

                try {
                    player.setSrc('../../assets/sounds/' + file_name + '.mp3');
                } catch (err) {
                    player.load('../../assets/sounds/' + file_name + '.mp3');
                }

                try {
                    player.play();
                } catch (err) {
                }

            }

        } else if (curent_audio_name == file_name) {

            if (file_name == corect_audio_name || file_name == wrong_audio_name) {
                try {
                    player.setCurrentTime(0);
                    player.play();
                } catch (err) {
                }
            } else {
                player.pause();
            }

        } else {

            curent_audio_name = file_name;
            player.pause();
            try {

                player.setSrc('../../assets/sounds/' + file_name + '.mp3');
            } catch (err) {
                player.load('../../assets/sounds/' + file_name + '.mp3');
            }
            try {
                player.play();
            } catch (err) {
            }
        }
    } catch (err) {
    }
}

/*start stop animation*/
function show_anim(stare) {
    $('.avatar').hide();
    $('.avatar_corect').hide();
    $('.avatar_gresit').hide();
    if (stare == 'wrong') {
        $('.avatar_gresit').show().css({
            '-webkit-animation-play-state': 'initial',
            'animation-play-state': 'initial'
        });
    } else {
        $('.avatar_corect').show().css({
            '-webkit-animation-play-state': 'initial',
            'animation-play-state': 'initial'
        });

    }
}

/**
 *end browser detect
 */
zoomScale = 1;
try {
    if (window.matchMedia("(min-width: 1441px)").matches) {
        zoomScale = 1.2;
    }
    if (window.matchMedia("(max-width: 1440px)").matches) {
        zoomScale = 1.1;
    }
    if (window.matchMedia("(max-width: 1280px)").matches) {
        zoomScale = 0.92;
    }
    if (window.matchMedia("(max-width: 1115px)").matches) {
        zoomScale = 0.80;
    }
} catch (err) {
}

/************ zoom ******************/

var currFFZoom = 1;
var currFFZoom = zoomScale;
var currIEZoom = 100;

var curentzoom = 1;
var maxzoom = 7;

function calculatezoom(type) {

    if (type == 'zoom-in' && curentzoom + 1 <= maxzoom) {
        $('.zoom-lvl .z' + (curentzoom + 1)).addClass('inb');

        curentzoom = curentzoom + 1;
        return true;

    } else if (type == 'zoom-out' && curentzoom - 1 > 0) {
        $('.zoom-lvl .z' + curentzoom).removeClass('inb');
        curentzoom = curentzoom - 1;

        return true;
    } else {
        return false
    }

}
/**
 *end browser detect
 */
$(document).ready(function() {
//
//    $(window).resize(function() {
//        if (window.matchMedia("(max-width: 1366px)").matches) {
//            $.each($('.ui-draggable'), function() {
//                console.debug($(this).css('top'));
//                var top = $(this).css('top');
//                top = top.replace('px', '');
//                top = parseInt(top);
//          
//                $(this).css('top', top + 50);
//                console.debug($(this).css('top'));
//                 console.debug('-----------');
//            })
//        }
//        console.debug('--*********************************************---------');
//        console.debug('--*********************************************---------');
//    }).resize();

    MediaElementPlayer.prototype.enterFullScreen_org = MediaElementPlayer.prototype.enterFullScreen;
    MediaElementPlayer.prototype.enterFullScreen = function() {
        $('.nav,.top, .game-options,.starLeft,.starRight,.starTop').addClass('hide_all');
        this.enterFullScreen_org();
    };

    MediaElementPlayer.prototype.exitFullScreen_org = MediaElementPlayer.prototype.exitFullScreen;
    MediaElementPlayer.prototype.exitFullScreen = function() {
        $('.nav,.top, .game-options,.starLeft,.starRight,.starTop').removeClass('hide_all');
        this.exitFullScreen_org();
    };





    var max_chars = 20;
    $(document).on('keydown keyup', '#user', function(e) {
        if ($(this).val().length >= max_chars) {
            $(this).val($(this).val().substr(0, max_chars));
        }
    })


    createDb()/* create local storage db*/
    /**
     * zoom data
     */
    $('.total-no-of-pages').html('\\' + (generaldata.nr_pagini - 1));
    /******************************************************
     * AUDIO PLAYER
     */

    if ($('#player').length != 0) {
        player = new MediaElement('player', {
            startVolume: 0.8,
            // useful for <audio> player loops
            loop: false,
            // enables Flash and Silverlight to resize to content siz
            features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume'],
            // Hide controls when playing and mouse is not over the video
            alwaysShowControls: false,
            // when this player starts, it will pause other players
            pauseOtherPlayers: true,
            // array of keyboard commands
            success: function(mediaElement, domObject) {

            },
            error: function() {

            }
        });

    }
    if ($('#player_valid').length != 0) {
        player_valid = new MediaElement('player_valid', {
            startVolume: 0.8,
            // useful for <audio> player loops
            loop: false,
            // enables Flash and Silverlight to resize to content siz
            features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume'],
            // Hide controls when playing and mouse is not over the video
            alwaysShowControls: false,
            // when this player starts, it will pause other players
            pauseOtherPlayers: true,
            // array of keyboard commands
            success: function(mediaElement, domObject) {

            },
            error: function() {

            }
        });

    }

    $('.zoom-in').on('click', function() {
        if (calculatezoom('zoom-in') == true) {
            if (BrowserDetect.browser == 'Firefox') {
                var step = 0.02;
                currFFZoom += step;
                $('.content_container').css('MozTransform', 'scale(' + currFFZoom * 1.1 + ')');
            } else {
                var step = 2;
                currIEZoom += step;
                $('.content_container').css('zoom', ' ' + currIEZoom * 1.1 + '%');
            }
        }
    });

    $('.zoom-out').on('click', function() {

        if (calculatezoom('zoom-out') == true) {

            if (BrowserDetect.browser == 'Firefox') {
                var step = 0.02;
                currFFZoom -= step;
                $('.content_container').css('MozTransform', 'scale(' + currFFZoom + ')');

            } else {
                var step = 2;
                currIEZoom -= step;
                $('.content_container').css('zoom', ' ' + currIEZoom + '%');
            }
        }
    });

    $('div.next-page').click(function() {
        goToPage('next');
    });
    $('div.previous-page').click(function() {
        goToPage('prev');
    });
    $('div.last-page').click(function() {
        goToPage('last_page');
    });
    $('div.first-page').click(function() {
        goToPage('first_page');
    });

    $(".go-to-input").ForceNumericOnly();


    /*************** game buttons hover audio play  *****************/

//	$('.game-options > span').mouseover(function() {
//		if (Modernizr.touch) {
//
//			return false
//		}
//		if (!$(this).hasClass('inactiv')) {
//			play_audio(false, $(this).html());
//		}
//
//	});

    $('.game-options > span.tiparire').click(function() {
        window.print();
    });


    /*** end ****/

    /*****************************/
    /*
     * FANCY BOX
     */



    /*open image*/

    $(".fancybox").each(function() {
        var _this = this;
        $(this).fancybox({
            openEffect: 'elastic',
            closeEffect: 'elastic',
            padding: 5,
            beforeClose: function() {

                try {
                    player.setCurrentTime(0);
                    player.pause();

                } catch (err) {
                }
            }
        }
        );
    })




    /**** play sound on click on 'sound' class ****/

    $('.sunet').on(' vclick', function(e) {
        e.preventDefault();
        try {
            play_audio($(this));
        } catch (err) {
        }

    });

    /*play video*/
    var video_obj;
    $(".play").on('click', function(e) {
        video_obj = $(this).attr('data-video');

        e.preventDefault();
        $.fancybox.open($('.video_container'), {
            width: 800,
            height: 458,
            padding: 5,
            margin: 0,
            autoSize: false,
            beforeShow: function() {
                $('video').hide();
                $('#' + video_obj).show();
                $('#' + video_obj).closest('.mejs-container').show();
            },
            afterShow: function() {
                $('#' + video_obj).mediaelementplayer({
                    loop: false,
                    features: ['playpause', 'progress', 'duration', 'volume', 'fullscreen'],
                });

                $('.fancybox-inner').css({'overflow': 'hidden'});
                $('.fancybox-outer').append('<a class="video_stop" title="Stop"><span></span></a> ');
            },
            beforeClose: function() {
                $('.video_stop').fadeOut(10);
                $('.mejs-container, video').hide();
                try {
                    $('#' + video_obj)[0].setCurrentTime(0);
                    $('#' + video_obj)[0].player.pause();
                } catch (err) {
                }
            }

        }
        )
    });

    $('video').mediaelementplayer({
        loop: false,
        features: ['playpause', 'progress', 'duration', 'volume', 'fullscreen'],
        pauseOtherPlayers: true,
        startVolume: 0.5
    });
    var video_obj = '';
    $('.video_cta,.btn_video1').on('click', function(e) {

        e.preventDefault();
        $('.section').hide();
        $('.wrapper').addClass('remove_shadow_and_white');
        $('.wrapper').css({
            height: 'auto'
        });
        video_obj = $(this).attr('data-video');
        $('video,.mejs-container').hide();
        $('#' + video_obj).show();
        $('#' + video_obj).closest('.mejs-container').show();
        $('#' + video_obj)[0].setVolume(0.6);
//        $('#' + video_obj)[0].player.play();
        $('#video_container').show();
        $('#' + video_obj).closest('.mejs-container').show();
    });

    $('.video_play').on('click', function(e) {
        e.preventDefault();
        try {
            $('#' + video_obj)[0].player.play();
        } catch (err) {
        }
    });
    $('.video_stop').on('click', function(e) {
        e.preventDefault();
        try {
            $('#' + video_obj)[0].setCurrentTime(0);
            $('#' + video_obj)[0].player.pause();
        } catch (err) {
        }
    });
    $('.video_pause').on('click', function(e) {
        e.preventDefault();
        try {
            $('#' + video_obj)[0].player.pause();
        } catch (err) {
        }
    });

//    $(document).on('click', '.video_stop', function() {
//        try {
//            $('#' + video_obj)[0].setCurrentTime(0);
//            $('#' + video_obj)[0].player.pause();
//        } catch (err) {
//        }
//    });

    $(window).resize(function() {
        $.fancybox.reposition();
        $.fancybox.update();
    });

    /*******************************
     * HELP POP_UP
     ********************************/
    $('.ajutor').on('vclick', function() {
        var help_elem = $(this).closest('.game_frame').find('.help_container');
        var help_box_h;

        help_box_h = $(help_elem).height() / 2;
        $(help_elem).css({
            marginTop: -+help_box_h
        });
        if (activ_help_btn == true) {
            $(help_elem).show();
            $('.overlayer').show();
            play_audio($(this).closest('.game_frame').find('.ajutor'));
        }


    });

    $('.close_help').on('vclick', function(e) {
        e.preventDefault();
        try {
            player.setCurrentTime(0);
            player.pause();
        } catch (err) {
        }
        $('.help_container').hide();
        $('.overlayer').hide();
    });

    $('.reia_sarcina').on('vclick', function(e) {
        try {
//            player.setCurrentTime(0);
//            player.pause();
            player_valid.pause();
        } catch (err) {
        }
        e.preventDefault();
        $('.avatar').show();
        $('.avatar_corect').hide();
        $('.avatar_gresit').hide();
        play_audio($(this).closest('.game_frame').find('.container'));
    })
            ;
    /** CLOSE GAME POP_UP**/
    $('.close_it').on('vclick', function(e) {
        if ($(this).closest('#drag_and_drop').length > 0 || $(this).closest('#drag_and_drop1').length > 0 || $(this).closest('#drag_and_drop2').length > 0 || $(this).closest('#drag_and_drop3').length > 0 || $(this).closest('#drag_and_drop4').length > 0) {

            $('.wrapper').removeClass('scale_reset');
        }

        var random_sound_nr = randomnumber(1, 2);
        e.preventDefault();
        try {
//            player.setCurrentTime(0);
            player.pause();
            player_valid.pause();
        } catch (err) {
        }

        try {
            $('#' + video_obj)[0].setCurrentTime(0);
            $('#' + video_obj)[0].player.pause();
        } catch (err) {
        }
        $('.help_container').hide();
        $('.overlayer').hide();
        $('.game_frame').hide();
        $('.section').show();
        $('.wrapper').removeClass('remove_shadow_and_white');
        $('.wrapper').css({
            height: 'auto'
        });
        curr_iter_nr = 1;
        $('.curr').html(curr_iter_nr);

    });
    $('.user_text').on('vclick', function(e) {
        e.preventDefault();
        newuser();
    });
    $('.show_karaoke').click(function(e) {
        e.preventDefault();

        $(this).closest('.game_frame').find('.karaoke_block').toggleClass('hidden');
    })
    $('.video_cta').click(function(e) {
        e.preventDefault();

        $('.show_karaoke').show();
        try {
            play_audio($(this));
        } catch (err) {
        }
    });
    $('.btn_video1').click(function(e) {
        e.preventDefault();
        if ($(this).attr('data-noc') != 'true') {
            $('.show_karaoke').hide();

            try {
                $('.karaoke_block').addClass('hidden')();
            } catch (err) {

            }
        }
        try {
            play_audio($(this));
        } catch (err) {
        }

    });


    $('.video_title').click(function(e) {
        e.preventDefault();

        if ($(this).attr('data-title')) {
            $('#video_container .game_desc').html($(this).attr('data-title'));

        }
    });
    $('.verificare').click(function(e) {
        e.preventDefault();
        player.pause();
        $('.help_container').hide();
        $('.overlayer').hide();
    });
    $('.reia_sarcina').click(function(e) {
        e.preventDefault();
        $('.help_container').hide();
        $('.overlayer').hide();
    });
});

String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};