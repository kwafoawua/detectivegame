'use strict';
var main, sprites, cursors, json, game, clues, detectives, dialog, line = '',
    text, index = 0,
    dialogStatus = true,
    detectiveCollisionGroup, mainCollisionGroup, wallCollisionGroup, clueCollisionGroup;
//va a estar divido en json.map, json.sprites
function Controller() {}
Controller.prototype.chargeMaps = function () {
    var xhr = new XMLHttpRequest();
    var array = [];
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            array = JSON.parse(xhr.responseText);
            that.loadMapSelector(array.maps);
        }
    };
    xhr.open('GET', 'http://localhost:3800/loadMaps', true);
    xhr.send();
};
Controller.prototype.loadMapSelector = function (array) {
    var select = document.getElementById('loadMaps');
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.value = array[i].split('.')[0];
        option.text = array[i].split('.')[0];
        select.appendChild(option);
    }
};
Controller.prototype.mapOnChange = function () {
    var optionValue = document.getElementById('loadMaps').value;
    var xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            json = JSON.parse(xhr.responseText);
            document.getElementById('game').innerHTML = '';
            if (game) {
                game.destroy();
                that.clean();
            }
            game = new Game();
        }
    };
    xhr.open('POST', 'http://localhost:3800/renderMap', true);
    var data = {
        'optionValue': optionValue
    };
    xhr.send(JSON.stringify(data));
};
Controller.prototype.clean = function () {
    main = null;
    sprites = null;
    cursors = null;
    game = null;
    clues = null;
    detectives = null;
    dialog = null;
    line = '';
    index = 0;
    text = null;
    dialogStatus = true;
    detectiveCollisionGroup = null;
    mainCollisionGroup = null;
    wallCollisionGroup = null;
    clueCollisionGroup = null;

};
Controller.prototype.closeWin = function () {
    document.getElementById('popClue').style.visibility = 'hidden';
};

function mouseDown(e) {
    if (e === null) {
        e = window.event;
    }
    divpopclue.addEventListener('mousemove', mouseMove, true);
};

function mouseUp(e) {
    divpopclue.removeEventListener('mousemove', mouseMove, true);
};

function mouseMove(e) {
    if (e === null) {
        e = window.event;
    }
    var data = e.target;
    data.style.left = e.clientX + "px";
    data.style.top = e.clientY + "px";
    data.style.position = "absolute";
};

function Game() {
    this.game = new Phaser.Game(json.map.width, json.map.height, Phaser.AUTO, 'game', {
        preload: this.preload,
        create: this.create,
        update: this.update,
        startDialog: this.startDialog,
        updateDialog: this.updateDialog,
        popClueProb: this.popClueProb
    });
    this.detectiveDestroyed = true;
    this.popup = null;
    this.popClue = null;
}
Game.prototype.preload = function () {
    for (var i = 0; i < json.sprites.length; i++) {
        this.game.load.image(json.sprites[i].id, json.sprites[i].url);
    }
    //this.game.load.image('theclue', 'img/dialog.png');
    //this.game.load.image('closeBtn', 'img/close.png');
};
Game.prototype.startDialog = function (body1, body2) {
    index++;
    if (index < dialog.length) {

        line = '';
        this.game.time.events.repeat(80, dialog[index].length + 1, this.updateDialog, this);
        //console.log('START DIALOG');

    } else {
        dialogStatus = false;
    }

};
Game.prototype.updateDialog = function () {
    if (line.length < dialog[index].length) {
        line = dialog[index].substr(0, line.length + 1);
        text.setText(line);
        //console.log('Line Length ' + line.length + ' Dialog length: ' + dialog[index].length + " Index: " + index);
    } else {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.startDialog, this);
    }
};
Game.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    sprites = this.game.add.physicsGroup(Phaser.Physics.P2JS);
    clues = this.game.add.physicsGroup(Phaser.Physics.P2JS);
    detectives = this.game.add.physicsGroup(Phaser.Physics.P2JS);
    detectiveCollisionGroup = this.game.physics.p2.createCollisionGroup();
    mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    wallCollisionGroup = this.game.physics.p2.createCollisionGroup();
    clueCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();
    // this.popClue = this.game.add.sprite(300, 300, 'theclue');
    //this.popClue.visible = false;

    var that = this;

    for (var i = 0; i < json.sprites.length; i++) {
        var width = json.sprites[i].posX * 20;
        var height = json.sprites[i].posY * 20;
        var id = json.sprites[i].id;
        var cont = json.sprites[i].rotationCont;
        if (json.sprites[i].spriteType === 'wall') {
            var wl = sprites.create(width + (json.sprites[i].width / 2), height + (json.sprites[i].height / 2), id);
            wl.body.static = true;
            wl.body.setCollisionGroup(wallCollisionGroup);
            wl.body.collides([wallCollisionGroup, mainCollisionGroup]);

            if (json.sprites[i].isRotated) {
                wl.body.angle = json.sprites[i].rotation[cont - 1];
            }
        } else if (json.sprites[i].spriteType === 'mainchar') {
            main = this.game.add.sprite(width, height, id);
            this.game.physics.p2.enable(main, false);
            main.body.collideWorldBounds = true;
            main.body.fixedRotation = true;
            main.body.setCollisionGroup(mainCollisionGroup);
            main.body.collides(wallCollisionGroup, null, this);
            main.body.collides(detectiveCollisionGroup, null, this);
            main.body.collides(clueCollisionGroup, null, this);
        } else if (json.sprites[i].spriteType === 'clue') {
            var cl = clues.create(width + (json.sprites[i].width / 2), height + (json.sprites[i].height / 2), id);
            cl.body.static = true;
            cl.inputEnabled = true;
            cl.input.useHandCursor = false;
            cl.body.setCollisionGroup(clueCollisionGroup);
            cl.body.collides([clueCollisionGroup, mainCollisionGroup]);
            cl.events.onInputDown.add(this.popClueProb, this);

            if (json.sprites[i].isRotated) {
                cl.body.angle = json.sprites[i].rotation[cont - 1];
            }

        } else {
            var dv = detectives.create(width + (json.sprites[i].width / 2), height + (json.sprites[i].height / 2), id);
            dv.body.static = true;
            dv.body.setCollisionGroup(detectiveCollisionGroup);
            dv.body.collides([detectiveCollisionGroup, mainCollisionGroup]);
            dialog = json.sprites[i].dialog;
            text = this.game.add.text(50, 585, '', {
                font: '18px Arial',
                fill: '#FFFFFF'
            });
        }
    }
    //this.popClue.inputEnabled = true;
    //this.popClue.input.enableDrag();
    //this.popClue.input.useHandCursor = true;
    cursors = this.game.input.keyboard.createCursorKeys();
    this.startDialog();
};
Game.prototype.update = function () {
    main.body.velocity.x = 0;
    main.body.velocity.y = 0;
    // main.body.collides(detectiveCollisionGroup, this.startDialog, this);

    if (cursors.down.isDown) {
        main.body.velocity.y = 100;
    } else if (cursors.up.isDown) {
        main.body.velocity.y = -100;
    }
    if (cursors.left.isDown) {
        main.body.velocity.x = -100;
    } else if (cursors.right.isDown) {
        main.body.velocity.x = 100;
    }
    for (var i = 0; i < clues.children.length; i++) {
        var distx = Math.abs(main.x - clues.children[i].x);
        var disty = Math.abs(main.y - clues.children[i].y);
        if (distx < 50 && disty < 50) {
            clues.children[i].input.useHandCursor = true;
            clues.children[i].visible = true;
        } else {
            clues.children[i].input.useHandCursor = false;
            clues.children[i].visible = false;
        }
    }

};
Game.prototype.destroy = function () {
    this.game.destroy();
};
Game.prototype.popClueProb = function () {
    document.getElementById('popClue').style.visibility = 'visible';

};


var control = new Controller();
control.chargeMaps();
document.getElementById('loadMaps').addEventListener('change', control.mapOnChange.bind(control), false);
document.getElementById('close').addEventListener('click', control.closeWin.bind(control), false);
var divpopclue = document.getElementById('popClue');
//divpopclue.addEventListener('mousedown', mouseDown, false);
//divpopclue.addEventListener('mouseup', mouseUp, false);