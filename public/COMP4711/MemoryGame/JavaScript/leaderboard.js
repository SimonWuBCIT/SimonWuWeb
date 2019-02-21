let req = new XMLHttpRequest();

window.onload = function() {
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

    let top_container = document.getElementsByClassName("topFiveContainer")[0];
    console.log(parse_response);
}