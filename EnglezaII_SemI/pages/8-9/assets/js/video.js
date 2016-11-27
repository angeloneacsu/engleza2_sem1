
function gameType_gradAndDrop(id) {
    this.html_hook_id = id;
    this.first_init = true;
}

gameType_gradAndDrop.prototype.init = function() { 
    this.reset();

    if (this.first_init) {
        this.add_events();
    }
};
gameType_gradAndDrop.prototype.add_events = function() {
    _this = this;
    this.first_init = false;



    $('#' + this.html_hook_id + ' .verificare').on("vclick", function() {
        _this.verifica();
    });

};


$(document).ready(function() {

    var item_gameType_gradAndDrop = new gameType_gradAndDrop(obj_gameType_gradAndDrop);

    $('.gm_container').on('vclick', function(e) {
        e.preventDefault();
        if ($(this).attr('data-gameId') == 'item_gameType_gradAndDrop') {
            item_gameType_gradAndDrop.init();
        }

        $('.section').hide();
        $('.wrapper').addClass('remove_shadow_and_white');
        $('.wrapper').css({
            height: 'auto'
        });
    });
});

        