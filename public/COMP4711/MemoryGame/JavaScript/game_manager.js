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

async function updateScore(downgrade) {
    let scoreElement = document.getElementsByClassName("score_board")[0];
    scoreElement.innerHTML = "Score: " + score;

    if (score < 0) {
        disableClick();
        await displaySpecial().then(() => {
            gameEnd();
        });
    } else if (downgrade) {
        disableClick();
        await displaySpecial();
        levelWait(false)
        return;
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
        levelWait(true);
    }
}

function levelUp() {
    if (special_total < current_column * current_row * 0.3) {
        ++special_total;
    } else if (current_column < 7) {
        special_total = 4;
        ++current_column;
        ++current_row;
    }
    special_flipped = 0;
}

function levelDown() {
    if (special_total >= 4) {
        --special_total;
    } else if (current_column > 3) {
        --current_column;
        --current_row;
        special_total = Math.floor(current_column * current_row * 0.3);
    }
    special_flipped = 0;
}

function restart() {
    score = 0;
    special_flipped = 0;
    setUpInitialGameState();
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