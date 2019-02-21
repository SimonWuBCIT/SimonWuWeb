let score = 0;
let special_flipped = 0;
let special_total = 0;

let current_column = 0;
let current_row = 0;

function setUpInitialGameState() {
    current_column = 3;
    current_row = 3;
    special_total = 4;
}

async function updateScore() {
    let scoreElement = document.getElementsByClassName("score_board")[0];
    scoreElement.innerHTML = "Score: " + score;
    if (score < 0) {
        await displaySpecial();
    } else {
        determineProgress();
    }
}

function gameEnd() {
    localStorage.setItem("score", score);
    location.href = "./summary";
}

function terminate() {
    let confirmation = confirm("Are you sure you want to quit?");
    if (confirmation) {
        gameEnd();
    }
}

function determineProgress() {
    if (special_flipped >= special_total) {
        levelUpWait();
    }
}

function levelUp() {
    if (special_total < current_column * current_row * 0.3) {
        ++special_total;
        special_flipped = 0;
        return;
    }
    if (current_column < 7) {
        special_total = 4;
        ++current_column;
        ++current_row;
        special_flipped = 0;
    }
}

function restart() {
    score = 0;
    special_flipped = 0;
    next(current_column, current_row, special_total);
    
    let scoreElement = document.getElementsByClassName("score_board")[0];
    scoreElement.innerHTML = "Score: " + score;
}

async function next(x, y, specialCount) {
    resetContainer();
    tile_manager.resetTiles();
    populateTiles(x, y, specialCount);
    await start();
}

async function levelUpWait() {
    return new Promise(function () {
        setTimeout(function() {
            shrinkDiv();
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