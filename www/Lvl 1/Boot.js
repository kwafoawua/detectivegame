var Boot = function () {};

module.exports = Boot;
Boot.prototype.preload = function () {
    this.load.image('loading', 'www/img/preloader/loading.png');
    this.load.image('preloader_empty', 'www/img/preloader/preload_full_bar.png');
    this.load.image('preloader_full', 'www/img/preloader/preload_full_bar.png');
};
Boot.prototype.create = function () {
    game.stage.disableVisibilityChange = true; //game doesn't stop when window loses focus.
    game.input.maxPointers = 1; //The maximum number of Pointers allowed to be active at any one time. A value of -1 is only limited by the total number of pointers. For lots of games it's useful to set this to 1.
    game.state.start('Preloader');
};