window.onload = function() {
    updateScoreField();
}

function updateScoreField() {
    let player_score = window.localStorage.score;
    let scoreDisplay = document.getElementsByClassName("scoreDisplay")[0];
    scoreDisplay.innerHTML = "Score: " + player_score;
}

function updateDatabase() {
    let player = document.getElementsByClassName("nameField")[0].value;
    let finalScore = window.localStorage.score;
    $.post("https://story.simonwu.work:3000/COMP4711/MemoryGame/summary/result", {player: player, finalScore: finalScore});
}

function returnToGame() {
    location.href="./index.html";
}