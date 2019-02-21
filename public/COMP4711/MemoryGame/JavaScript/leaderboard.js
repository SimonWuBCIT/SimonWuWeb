let req = new XMLHttpRequest();

window.onload = function() {
    populateCurrentUserScore();
    getTopFive();
}

function returnToGame() {
    location.href="./index.html";
}

function getTopFive() {
    let url = "https://story.simonwu.work:443/tally";

    req.open('GET', url, true);
    req.addEventListener('load', load);
    req.send();
}

function load() {
    let response = this.responseText;
    let parse_response = JSON.parse(response);

    updateLeaderboard(parse_response);
    console.log(parse_response);
}

function populateCurrentUserScore() {
    let current_container = document.getElementsByClassName("currentUserContainer")[0];
    let current_player = document.createElement("p");
    current_player.innerHTML = window.localStorage.player + ": " + window.localStorage.score;
    current_container.appendChild(current_player);
}

function updateLeaderboard(top_results) {
    let top_container = document.getElementsByClassName("topFiveContainer")[0];
    for (let i = 0; i < top_results.length; ++i) {
        let player_container = document.createElement("p");
        player_container.innerHTML = top_results[i].name + ": " + top_results[i].result;
        top_container.appendChild(player_container);
    }
}