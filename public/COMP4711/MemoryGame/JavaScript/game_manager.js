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

function updateScore() {
    let scoreElement = document.getElementsByClassName("score_board")[0];
    scoreElement.innerHTML = "Score: " + score;
    if (score < 0) {
        gameEnd();
    } else {
        determineProgress();
    }
}

function gameEnd() {
    localStorage.setItem("score", score);
    location.href = "./summary.html";
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
    next(current_column, current_row, special_total);
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
            levelUp();
            next(current_column, current_row, special_total);
        }, 1000);
    });
}