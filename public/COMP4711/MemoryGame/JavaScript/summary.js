window.onload = function() {
    updateScoreField();
}

function updateScoreField() {
    let player_score = window.localStorage.score;
    let scoreDisplay = document.getElementsByClassName("scoreDisplay")[0];
    scoreDisplay.innerHTML = "Score: " + player_score;
}

function updateDatabase() {
    let playerName = document.getElementsByClassName("nameField")[0].value;
    let playerScore = window.localStorage.score;
    $.post("https://story.simonwu.work:3000/result", {player: playerName, finalScore: playerScore});
}

function returnToGame() {
    location.href="./index.html";
}