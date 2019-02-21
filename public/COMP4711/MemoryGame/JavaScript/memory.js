const max_tile = 49;
const tile_manager = new Manager;
Object.freeze(tile_manager);

window.onload = function() {
    initGame();
}

function initGame() {
    tile_manager.setUpTiles(max_tile);
    setUpInitialGameState();
    populateTiles(current_column, current_row, special_total);

    start();
}

async function start() {
    let tile_container = document.getElementsByClassName("memory_tiles")[0];
    tile_container.style.height = "0px";
    await initialShow();
}

function populateTiles(x, y, specialCount) {
    let tile_container = document.getElementsByClassName("memory_tiles")[0];
    while (tile_container.firstChild) {
        tile_container.removeChild(tile_container.firstChild);
    }

    tile_manager.setSize(x, y);
    tile_manager.setUpSpecialTiles(specialCount, x*y);

    for (let j = 0; j < y; ++j) {
        for (let i = 0; i < x; ++i) {
            tile_container.appendChild(tile_manager.get(i+j*x).get());
        }
        tile_container.appendChild(document.createElement("br"));
    }
}

function resetContainer() {
    let tile_container = document.getElementsByClassName("memory_tiles")[0];
    tile_container.classList.remove("rotateZ90");
}

function shrinkDiv() {
    let tiles_area = $('.memory_tiles');
    tiles_area.animate({ height: '0' }, "fast");
}

function expandDiv() {
    let tiles_area = $('.memory_tiles');
    tiles_area.animate({ height: '100%' }, "fast");
}

async function initialShow() {
    return new Promise(function() { 
        setTimeout(function() {
            expandDiv();
        }, 500);
        setTimeout(function() {
            tile_manager.flipSpecial();
        }, 2000);
        setTimeout(function() {
            tile_manager.unflipSpecial();
        }, 3000);
        setTimeout(function() {
            let tile_container = document.getElementsByClassName("memory_tiles")[0];
            tile_container.classList.add("rotateZ90");
        }, 4000);
    });
}

async function levelUpWait() {
    return new Promise(function () {
        setTimeout(function() {
            shrinkDiv();
            let audio = new Audio('./Assets/Sounds/spray.mp3');
            audio.play();
        }, 1000);
        setTimeout(function() {
            levelUp();
            next(current_column, current_row, special_total);
        }, 2000);
    });
}

async function displaySpecial() {
    return new Promise(function () {
        setTimeout(function () {
            tile_manager.flipSpecial();
        }, 1000);
        setTimeout(function () {
            gameEnd();
        }, 2000);
    });
}