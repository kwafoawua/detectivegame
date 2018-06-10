'use strict';
/**
 *Represents the map of the game.
 *@constructor
 *@param {mapOps=}
 *@param {string} name - Nombre con el que voy a hacer referencia al mapa creado.
 */
function Map(mapOps) {
    if (mapOps === null) {
        mapOps = {};
    }
    this.name = mapOps.name || null;
    this.spriteArray = [];
    this.width = 1020;
    this.height = 640;
    this.tileX = 51;
    this.tileY = 32;

}
Object.defineProperties(Map.prototype, {
    TileX: {
        get: function () {
            return this.tileX;
        },
        set: function (value) {
            this.tileX = value;
        }
    },
    TileY: {
        get: function () {
            return this.tileY;
        },
        set: function (value) {
            this.tileY = value;
        }
    },
    Name: {
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        }
    }
});
Map.prototype.addSprite = function (sprite) {
    this.spriteArray.push(sprite);
};
Map.prototype.getSprite = function (id) {
    for (var i = 0; i < this.spriteArray.length; i++) {
        if (this.spriteArray[i].Id === id) {
            return this.spriteArray[i];
        }
    }
};
Map.prototype.setSprite = function (sprite) {
    for (var i = 0; i < this.spriteArray.length; i++) {
        if (this.spriteArray[i].Id === sprite.Id) {
            this.spriteArray[i] = sprite;
            return;
        }
    }
};
Map.prototype.deleteSprite = function (id) {
    for (var i = 0; i < this.spriteArray.length; i++) {
        if (id === this.spriteArray[i].Id) {
            this.spriteArray.splice(i, 1);
        }
    }
};
Map.prototype.isInArray = function (id) {
    var inarray = false;
    for (var i = 0; i < this.spriteArray.length; i++) {
        if (this.spriteArray[i].Id === id) {
            inarray = true;
        }
    }
    return inarray;
};
Map.prototype.isOccupied = function (xx, yy, ww, hh, id) {
    var x = xx;
    var y = yy;
    var w = Math.floor(ww / 20);
    var h = Math.floor(hh / 20);
    var isoccupied = false;
    for (var i = 0; i < this.spriteArray.length; i++) {
        if (id !== this.spriteArray[i].Id) {
            var sprite = this.spriteArray[i];
            var sx = sprite.PosX; // x pos of the sprite
            var sy = sprite.PosY; // y pos of the sprite
            var sw = Math.floor(sprite.Width / 20); //dx pos of the sprite
            var sh = Math.floor(sprite.Height / 20); //dy pos of the sprite
            if (sx < x + w && sx + sw > x && sy < y + h && sy + sh > y) {
                isoccupied = true;
            }
        }

    }
    return isoccupied;
};
Map.prototype.toJson = function () {
    var mapName = document.getElementById('mapName').value;
    if (mapName !== '') {
        this.name = mapName;
    }
    var json = {
        map: {
            width: this.width,
            height: this.height,
            tileX: this.tileX,
            tileY: this.tileY,
            name: this.name
        },
        sprites: []
    };
    for (var i = 0; i < this.spriteArray.length; i++) {
        var sprite = this.spriteArray[i];
        json.sprites.push({
            id: sprite.Id,
            url: sprite.Url,
            width: sprite.Width,
            height: sprite.Height,
            posX: sprite.PosX,
            posY: sprite.PosY,
            spriteType: sprite.Type,
            rotation: sprite.Rotation,
            rotationCont: sprite.RotCont,
            isRotated: sprite.isRotated,
            dialog: sprite.dialog
        });
    }
    var requestData = {
        'rawMap': json,
        'title': mapName
    };
    return requestData;
};
Map.prototype.existCharacter = function (type) {
    var exist = false;
    for (var i = 0; i < this.spriteArray.length; i++) {
        if (type === this.spriteArray[i].Type) {
            exist = true;
        }
    }
    return exist;
};

/**
 *Represent a sprite which will be added to the map.
 *@constructor
 *@param {spriteOps=}
 *@param {string} id - The ID of the sprite.
 *@param {string} url - The local location of the sprite.
 *@param {int} width - Width of the sprite in pixels.
 *@param {int} height - Height of the sprite in pixels.
 *@param {int} posX - Position in the x axis of the map.
 *@param {int} posY - Position in the y axis of the map.
 *@param {tobedefined} type - 
 */
function Sprite(spriteOps) {
    if (spriteOps === null) {
        spriteOps = {};
    }
    this.id = spriteOps.id || null;
    this.url = spriteOps.url || null;
    this.width = spriteOps.width || null;
    this.height = spriteOps.height || null;
    this.posX = spriteOps.posX || 0;
    this.posY = spriteOps.posY || 0;
    this.type = spriteOps.spriteType || null;
    this.rotationCont = spriteOps.rotationCont || 0;
    this.rotation = [90, 180, 270, 360];
    this.isRotated = spriteOps.isRotated || false; //no esta en defineProperties
    this.dialog = spriteOps.dialog || [];
}
Object.defineProperties(Sprite.prototype, {
    Id: {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        }
    },
    Url: {
        get: function () {
            return this.url;
        },
        set: function (value) {
            this.url = value;
        }
    },
    Width: {
        get: function () {
            return this.width;
        },
        set: function (value) {
            this.width = value;
        }
    },
    Height: {
        get: function () {
            return this.height;
        },
        set: function (value) {
            this.height = value;
        }
    },
    PosX: {
        get: function () {
            return this.posX;
        },
        set: function (value) {
            this.posX = value;
        }
    },
    PosY: {
        get: function () {
            return this.posY;
        },
        set: function (value) {
            this.posY = value;
        }
    },
    Type: {
        get: function () {
            return this.type;
        },
        set: function (value) {
            this.type = value;
        }
    },
    Rotation: {
        get: function () {
            return this.rotation;
        },
        set: function (value) {
            this.rotation = value;
        }
    },
    RotCont: {
        get: function () {
            return this.rotationCont;
        },
        set: function (value) {
            this.rotationCont = value;
        }
    },
    Dialog: {
        get: function () {
            return this.dialog;
        },
        set: function (value, pos) {
            this.dialog[pos] = value;
        }
    }
});

function Character(charOps) {
    Sprite.call(this, spriteOps);
    this.firstName;
    this.lastName;
    this.age;
    this.rol;
}
Character.prototype = Object.create(Sprite.prototype);

function Clue(clueOps) {
    Sprite.call(this, spriteOps);
}
Clue.prototype = Object.create(Sprite.prototype);
/**
 *@constructor
 */
function spriteType() {

}

/**
 *Controller of the game.
 *@constructor
 */
function LevelEditor() {
    this.div = document.getElementById('gridDiv');
    this.divHeight = this.div.offsetHeight;
    this.divWidth = this.div.offsetWidth;
    this.divTop = this.div.getBoundingClientRect().top;
    this.divLeft = this.div.getBoundingClientRect().left;
    this.isin = false; //esta o no esta adentro del div
    this.imgOffsetX, this.imgOffsetY, this.dragElement;
    this.cont = 0;
    this.dropDiv = document.getElementById('droppedImgs');
    this.isAclone = false; //es o no un clon de la imagen original
    this.map = new Map(null);
    this.sprite = null;
    this.posX = null;
    this.posY = null;
    this.isMoving = false;
    this.mup = this.mouseUp.bind(this);
    this.mmove = this.mouseMove.bind(this);
    this.delimg = this.deleteImg.bind(this);
    this.selectedImage = null;
    this.dialogCont = 2;
    this.datapos = 1;
    this.introTab = document.getElementById('introTab');

}
//DRAG AND DROP EVENTS
LevelEditor.prototype.mouseDown = function (e) {
    if (e === null) {
        e = window.event;
    }
    //Si el id del target esta en el array de imagenes que ya fueron dropeadas al div, pone isAclone en true para que no se cree un clon de la imagen                 seleccionada.
    if (this.map.isInArray(e.target.id)) {
        this.isAclone = true;
    }

    if (this.isAclone) {
        //si isAclone===true dragelement toma el target como elemento para mover, si no se crea una copa del target la cual sera droppeada luego en el div
        this.dragElement = e.target;
        this.sprite = this.map.getSprite(e.target.id);
        this.isSelected(e.target.id);
        this.isin = true;
    } else {
        var target = e.target.cloneNode(true);
        target.id = 'copy' + this.cont + e.target.id;
        target.style.position = 'absolute';
        target.style.top = e.target.getBoundingClientRect().top + 'px';
        target.style.left = e.target.getBoundingClientRect().left + 'px';
        target.addEventListener('mousedown', this.mouseDown.bind(this), false);
        this.dropDiv.appendChild(target);
        this.dragElement = target;
        this.cont++;
        this.sprite = new Sprite({
            id: target.id,
            url: e.target.getAttribute('src'),
            width: e.target.offsetWidth,
            height: e.target.offsetHeight,
            spriteType: e.target.getAttribute('data-sprite-type')
        });
    }
    this.imgOffsetX = e.offsetX;
    this.imgOffsetY = e.offsetY;
    /* if(this.sprite.isRotated){
         switch(this.sprite.RotCont) {
             case 0:
                 break;
             case 1:
                 break;
             case 2:
                 break;
             case 3:
                 break;
             case 4:
                 break;
         }
     }*/
    document.addEventListener('mousemove', this.mmove, false);
    document.addEventListener('mouseup', this.mup, false);

};
LevelEditor.prototype.mouseMove = function (e) {
    if (e === null) {
        e = window.event;
    }
    var left, top = null;
    if (e.pageX > this.divLeft && e.pageY > this.divTop) {
        this.isin = true;
    }
    if (this.isin === true) {

        if (e.pageX - this.imgOffsetX > this.divLeft && e.pageX + (this.sprite.Width - this.imgOffsetX) < this.divWidth + this.divLeft) {
            //posicion de la imagen en pixeles
            left = Math.floor((e.pageX - this.imgOffsetX - this.divLeft) / 20) * 20 + this.divLeft;
            //posicion de la imagen en casillero para el sprite
            this.posX = Math.floor((e.pageX - this.imgOffsetX - this.divLeft) / 20);
        } else if (e.pageX - this.imgOffsetX <= this.divLeft) {
            left = this.divLeft;
            this.posX = 0;
        } else if (e.pageX + (this.sprite.Width - this.imgOffsetX) >= this.divWidth + this.divLeft) {
            left = this.divWidth + this.divLeft - this.sprite.Width;
            this.posX = Math.floor((this.divWidth - this.sprite.Width) / 20);
        }
        if (e.pageY - this.imgOffsetY > this.divTop && e.pageY + (this.sprite.Height - this.imgOffsetY) < this.divHeight + this.divTop) {
            top = Math.floor((e.pageY - this.imgOffsetY - this.divTop) / 20) * 20 + this.divTop;
            this.posY = Math.floor((e.pageY - this.imgOffsetY - this.divTop) / 20);
        } else if (e.pageY - this.imgOffsetY <= this.divTop) {
            top = this.divTop;
            this.posY = 0;
        } else if (e.pageY + (this.sprite.Height - this.imgOffsetY) >= this.divHeight + this.divTop) {
            top = this.divHeight + this.divTop - this.sprite.Height;
            this.posY = Math.floor((this.divTop - this.sprite.Height) / 20);
        }
        this.dragElement.style.top = top + 'px';
        this.dragElement.style.left = left + 'px';
        this.dragElement.style.position = 'absolute';
    } else {
        this.dragElement.style.top = (e.pageY - this.imgOffsetY) + 'px';
        this.dragElement.style.left = (e.pageX - this.imgOffsetX) + 'px';
        this.dragElement.style.position = 'absolute';

    }
};
LevelEditor.prototype.mouseUp = function (e) {
    var isoccupied = this.map.isOccupied(this.posX, this.posY, this.sprite.Width, this.sprite.Height, this.sprite.Id);
    if (this.isin === false) {
        this.dropDiv.removeChild(this.dragElement);
        this.cont--;
        this.sprite = null;
    } else if (this.isAclone) {
        if (isoccupied && this.sprite.Type !== 'clue') {
            this.dragElement.style.left = (this.sprite.PosX * 20 + this.divLeft) + 'px';
            this.dragElement.style.top = (this.sprite.PosY * 20 + this.divTop) + 'px';
        } else {
            this.sprite.PosX = this.posX;
            this.sprite.PosY = this.posY;
            this.map.setSprite(this.sprite);
        }
    } else if (isoccupied) {
        this.dropDiv.removeChild(this.dragElement);
        this.cont--;
        this.sprite = null;
    } else {
        this.sprite.PosX = this.posX;
        this.sprite.PosY = this.posY;
        this.map.addSprite(this.sprite);
    }
    document.removeEventListener('mousemove', this.mmove, false);
    document.removeEventListener('mouseup', this.mup, false);
    this.dragElement = null; //elemento que se mueve
    this.isin = false; //esta o no esta dentro del div
    this.sprite = null;
    this.isAclone = false; //es o no un clon de la imagen original
};
//FEATURES
LevelEditor.prototype.rotateImage = function () {
    if (this.selectedImage !== null) {
        var data = document.getElementById(this.selectedImage);
        data.className = 'fix';
        var done = false;
        this.sprite = this.map.getSprite(this.selectedImage);
        var width = this.sprite.Width;
        var height = this.sprite.Height;

        var degree = this.sprite.Rotation[this.sprite.RotCont];
        switch (this.sprite.RotCont) {
        case 0:
            if (this.sprite.Width + this.sprite.PosY * 20 <= this.divHeight) {
                data.style.transform = 'rotate(' + degree + 'deg) translateY(-' + height + 'px)';
                this.sprite.RotCont++;
                done = true;
            }
            break;
        case 1:
            if (this.sprite.PosX * 20 - this.sprite.Height >= 0) {
                data.style.transform = 'rotate(' + degree + 'deg) translate(-' + height + 'px, -' + width + 'px)';
                this.sprite.RotCont++;
                done = true;
            }
            break;
        case 2:
            if (this.sprite.PosY * 20 - this.sprite.Width >= 0) {
                data.style.transform = 'rotate(' + degree + 'deg) translateX(-' + width + 'px)';
                this.sprite.RotCont++;
                done = true;
            }
            break;
        case 3:
            if (this.sprite.PosX * 20 + this.sprite.Height <= this.divWidth) {
                data.style.transform = 'rotate(' + degree + 'deg)';
                this.sprite.RotCont++;
                done = true;
            }
            break;
        }

        if (this.sprite.RotCont == 4) {
            this.sprite.RotCont = 0;
        }
        if (done) {
            data.style.left = (this.sprite.PosX * 20 + this.divLeft) + 'px';
            data.style.top = (this.sprite.PosY * 20 + this.divTop) + 'px';
            this.sprite.Height = width;
            this.sprite.Width = height;
            this.sprite.isRotated = true;
            this.map.setSprite(this.sprite);
            this.selectedImage = null;
        }
    } else {
        //console.log('No target selected');
    }
};
LevelEditor.prototype.createTableGrid = function () {
    var cont = 0;
    var tbody = document.getElementById('gridTbody');
    for (var i = 0; i < 32; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 51; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('class', 'cuadricula');
            cont++;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
};
LevelEditor.prototype.deleteImg = function (e) {
    if (e.keyCode === 46 && this.selectedImage !== null) {
        var data = document.getElementById(this.selectedImage);
        this.dropDiv.removeChild(data);
        this.map.deleteSprite(this.selectedImage);
        this.selectedImage = null;
    }
};
LevelEditor.prototype.setSpriteType = function () {
    if (this.selectedImage) {
        var exist;
        var st = document.getElementById('spriteType');
        var op = st.getElementsByTagName('option');
        var value = st.value;
        var img = document.getElementById(this.selectedImage);
        img.setAttribute('data-sprite-type', value);
        var lastType = this.map.getSprite(this.selectedImage).Type;
        this.map.getSprite(this.selectedImage).Type = value;
        img.className = 'fix';
        this.selectedImage = null;

        if (value !== 'wall' && value !== 'clue') {
            exist = this.map.existCharacter(value);
            if (exist) {
                st.options[st.selectedIndex].disabled = true;
            }
        }
        for (var i = 0; i < op.length; i++) {
            if (op[i].value === lastType) {
                op[i].disabled = false;
            }
        }

    }
    document.getElementById('spriteType').selectedIndex = 0;
};
LevelEditor.prototype.newLayer = function () {
    this.dropDiv.innerHTML = '';
    document.getElementById('mapName').value = '';
    this.map.spriteArray = [];
    this.sprite = null;
    this.selectedImage = null;
    this.imgOffsetX = null;
    this.imgOffsetY = null;
    this.posX = null;
    this.posY = null;
    this.isMoving = false;
    this.cont = 0;
    //document.getElementById('spriteType').selectedIndex = 0;
    document.getElementById('loadMaps').selectedIndex = 0;

};
LevelEditor.prototype.addDialog = function (e) {
    if (e === null) {
        e = window.event;
    }
    var div = document.createElement('div');
    var textarea = document.createElement('textarea');
    var text = document.createElement('label');
    text.innerHTML = 'Dialog #' + this.dialogCont + ': ';
    textarea.id = 'dialog' + this.dialogCont;
    div.id = 'divDialog' + this.dialogCont;
    textarea.setAttribute('maxlength', '200');
    textarea.setAttribute('data-pos', this.datapos);
    textarea.addEventListener('change', controller.saveDialog.bind(controller), false);
    div.appendChild(text);
    div.appendChild(textarea);
    this.introTab.appendChild(div);
    this.dialogCont++;
    this.datapos++;

};
LevelEditor.prototype.delDialog = function (e) {
    if (e === null) {
        e = window.event;
    }
    var name = document.getElementById('charName').innerHTML;
    var num = this.dialogCont - 1;
    var div = document.getElementById('divDialog' + num);
    if (this.selectedImage !== null) {
        var sprite = this.map.getSprite(name);
        sprite.dialog.pop();
        this.map.setSprite(sprite); //aca me quede me parece

    }
    this.introTab.removeChild(div);
    this.dialogCont--;
    this.datapos--;
};
LevelEditor.prototype.saveDialog = function (e) {
    if (e === null) {
        e = window.event;
    }
    var id = document.getElementById('charName').textContent;
    var sprite = this.map.getSprite(id);
    var textarea = e.target;
    var pos = textarea.getAttribute('data-pos');
    var text = textarea.value;
    sprite.dialog[pos] = text;
    this.map.setSprite(sprite);
};
//AJAX
LevelEditor.prototype.loadImages = function () {
    var xhr = new XMLHttpRequest();
    var array = {};
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            array = JSON.parse(xhr.responseText);
            //console.log(array);
            that.updateHouseImages(array.house);
            that.updateCharImages(array.char);
            that.updateClueImages(array.clue);
        }
    };
    xhr.open('GET', 'http://localhost:3800/assets', true);
    xhr.send();
};
LevelEditor.prototype.loadMaps = function () {
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
LevelEditor.prototype.saveOnServer = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3800/save', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(JSON.stringify(this.map.toJson()));
    //console.log(JSON.stringify(this.map.toJson(), null, 2));
    alert('Saved');
};
LevelEditor.prototype.mapOnChange = function () {
    var optionValue = document.getElementById('loadMaps').value;
    var xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            that.updateMap(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('POST', 'http://localhost:3800/renderMap', true);
    var data = {
        'optionValue': optionValue
    };
    xhr.send(JSON.stringify(data));
};
//MAP UPDATES
LevelEditor.prototype.updateHouseImages = function (array) {
    var houseDiv = document.getElementById('houseImages');
    var len = Math.ceil(array.length / 3);
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var cont = 0;
    for (var i = 0; i < len; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            if (cont < array.length) {
                var img = new Image();
                var id = array[cont].split('/')[2].split('.')[0];
                img.setAttribute('id', id);
                img.setAttribute('draggable', false);
                img.setAttribute('class', 'fix');
                img.setAttribute('data-sprite-type', 'wall');
                img.addEventListener('mousedown', controller.mouseDown.bind(controller), false);
                cell.appendChild(img);
                img.src = array[cont].split('www/')[1]; //TODO Encontrar una mejor manera de darle la direccion
            }
            row.appendChild(cell);
            cont++;
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    houseDiv.appendChild(table);
};
LevelEditor.prototype.updateCharImages = function (array) {
    var charDiv = document.getElementById('charImages');
    var len = Math.ceil(array.length / 3);
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var cont = 0;
    for (var i = 0; i < len; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            if (cont < array.length) {
                var img = new Image();
                var id = array[cont].split('/')[2].split('.')[0];
                img.setAttribute('id', id);
                img.setAttribute('draggable', false);
                img.setAttribute('class', 'fix');
                if (id === 'mainchar') {
                    img.setAttribute('data-sprite-type', 'mainchar');
                } else {
                    img.setAttribute('data-sprite-type', 'detective');
                }

                img.addEventListener('mousedown', controller.mouseDown.bind(controller), false);
                cell.appendChild(img);
                img.src = array[cont].split('www/')[1]; //TODO Encontrar una mejor manera de darle la direccion
            }

            row.appendChild(cell);
            cont++;
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    charDiv.appendChild(table);
};
LevelEditor.prototype.updateClueImages = function (array) {
    var charDiv = document.getElementById('clueImages');
    var len = Math.ceil(array.length / 3);
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var cont = 0;
    for (var i = 0; i < len; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            if (cont < array.length) {
                var img = new Image();
                var id = array[cont].split('/')[2].split('.')[0];
                img.setAttribute('id', id);
                img.setAttribute('draggable', false);
                img.setAttribute('class', 'fix');
                img.setAttribute('data-sprite-type', 'clue');
                img.addEventListener('mousedown', controller.mouseDown.bind(controller), false);
                cell.appendChild(img);
                img.src = array[cont].split('www/')[1]; //TODO Encontrar una mejor manera de darle la direccion
            }

            row.appendChild(cell);
            cont++;
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    charDiv.appendChild(table);
};
LevelEditor.prototype.loadMapSelector = function (array) {
    var select = document.getElementById('loadMaps');
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.value = array[i].split('.')[0];
        option.text = array[i].split('.')[0];
        select.appendChild(option);
    }
};
LevelEditor.prototype.updateMap = function (json) {
    if (json.map.name) {
        this.map.Name = json.map.name;
    } else {
        this.map.Name = document.getElementById('loadMaps').value;
    }
    var arr = [];
    this.map.spriteArray = [];
    var state = false;
    for (var i = 0; i < json.sprites.length; i++) {
        var sprite = new Sprite({
            id: json.sprites[i].id,
            url: json.sprites[i].url,
            width: json.sprites[i].width,
            height: json.sprites[i].height,
            posX: (json.sprites[i].posX === null) ? 0 : json.sprites[i].posX,
            posY: (json.sprites[i].posY === null) ? 0 : json.sprites[i].posY,
            spriteType: json.sprites[i].spriteType,
            rotationCont: json.sprites[i].rotationCont,
            isRotated: json.sprites[i].isRotated,
            dialog: (!json.sprites[i].dialog) ? [] : json.sprites[i].dialog
        });
        arr.push(parseInt(json.sprites[i].id.replace(/\D+/g, ""), 10));
        this.map.addSprite(sprite);
        if (i === json.sprites.length - 1) {
            state = true;
        }
    }
    this.renderMap(state);
    this.cont = Math.max.apply(Math, arr) + 1;
    this.selectedImage = null;

};
LevelEditor.prototype.renderMap = function (state) {
    if (state) {
        this.dropDiv.innerHTML = '';
        document.getElementById('mapName').value = this.map.Name;
        for (var i = 0; i < this.map.spriteArray.length; i++) {
            var sprite = this.map.spriteArray[i];
            var top = this.divTop + sprite.PosY * 20;
            var left = this.divLeft + sprite.PosX * 20;
            var img = new Image();
            img.setAttribute('id', sprite.Id);
            img.setAttribute('data-sprite-type', sprite.Type);
            img.setAttribute('draggable', false);
            img.setAttribute('class', 'fix');
            img.style.top = top + 'px';
            img.style.left = left + 'px';
            img.style.position = 'absolute';
            if (sprite.isRotated) {
                img.style.transform = this.rotateHelper(sprite);
            }
            img.addEventListener('mousedown', controller.mouseDown.bind(controller), false);
            this.dropDiv.appendChild(img);
            img.src = sprite.Url;
        }
    }
};
//HELPERS
LevelEditor.prototype.rotateHelper = function (sprite) {
    var string;
    var cont = sprite.RotCont - 1;
    switch (cont) {
    case 0:
        string = 'rotate(' + sprite.Rotation[cont] + 'deg) translateY(-' + sprite.Width + 'px)';
        break;
    case 1:
        string = 'rotate(' + sprite.Rotation[cont] + 'deg) translate(-' + sprite.Width + 'px, -' + sprite.Height + 'px)';
        break;
    case 2:
        string = 'rotate(' + sprite.Rotation[cont] + 'deg) translateX(-' + sprite.Height + 'px)';
        break;
    case 3:
        string = 'rotate(' + sprite.Rotation[cont] + 'deg)';
        break;
    }
    return string;
};
LevelEditor.prototype.isSelected = function (id) {
    var selected;
    if (this.dragElement.className === 'isSelected') {
        this.dragElement.className = 'fix';
        this.selectedImage = null;
        this.resetDialog();
    } else {
        if (this.selectedImage !== null) {
            selected = document.getElementById(this.selectedImage);
            selected.className = 'fix';
            document.removeEventListener('keydown', this.delimg, false);
        }
        this.dragElement.className = 'isSelected';
        this.selectedImage = id;
        this.loadDialog(this.dragElement.getAttribute('data-sprite-type'), id);
        document.addEventListener('keydown', this.deleteImg.bind(this), false);
    }
};
LevelEditor.prototype.loadDialog = function (type, id) {
    if (type !== 'wall') {
        var name = document.getElementById('charName');
        name.innerHTML = id;
        var sprite = this.map.getSprite(id);
        if (sprite.dialog.length !== 0) {
            this.introTab.innerHTML = '';
            this.datapos = 0;
            this.dialogCont = 1;
            for (var i = 0; i < sprite.dialog.length; i++) {
                var div = document.createElement('div');
                var textarea = document.createElement('textarea');
                var text = document.createElement('label');
                text.innerHTML = 'Dialog #' + this.dialogCont + ': ';
                textarea.id = 'dialog' + this.dialogCont;
                div.id = 'divDialog' + this.dialogCont;
                textarea.setAttribute('maxlength', '200');
                textarea.setAttribute('data-pos', this.datapos);
                textarea.value = sprite.dialog[i];
                textarea.addEventListener('change', controller.saveDialog.bind(controller), false);
                div.appendChild(text);
                div.appendChild(textarea);
                this.introTab.appendChild(div);
                this.datapos++;
                this.dialogCont++;
            }
        }
    }
};
LevelEditor.prototype.resetDialog = function () {
    var name = document.getElementById('charName');
    name.innerHTML = '';
    this.datapos = 0;
    this.dialogCont = 2;
    this.introTab.innerHTML = '';
    var div = document.createElement('div');
    var textarea = document.createElement('textarea');
    var text = document.createElement('label');
    text.innerHTML = 'Dialog #1: ';
    textarea.id = 'dialog1';
    div.id = 'divDialog1';
    textarea.setAttribute('maxlength', '200');
    textarea.setAttribute('data-pos', 0);
    textarea.addEventListener('change', controller.saveDialog.bind(controller), false);
    div.appendChild(text);
    div.appendChild(textarea);
    this.introTab.appendChild(div);
    this.datapos++;

};




//*****************Variables Globales*******************//

var controller = new LevelEditor();
controller.loadImages();
controller.createTableGrid();
controller.loadMaps();

document.getElementById('rotatebtn').addEventListener('click', controller.rotateImage.bind(controller), false);
document.getElementById('savebtn').addEventListener('click', controller.saveOnServer.bind(controller), false);
document.getElementById('loadMaps').addEventListener('change', controller.mapOnChange.bind(controller), false);
document.getElementById('newlayerbtn').addEventListener('click', controller.newLayer.bind(controller), false);
document.getElementById('addIntro').addEventListener('click', controller.addDialog.bind(controller), false);
document.getElementById('delIntro').addEventListener('click', controller.delDialog.bind(controller), false);
document.getElementById('dialog1').addEventListener('change', controller.saveDialog.bind(controller), false);