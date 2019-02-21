const express = require('express');
const path = require("path");
const parser = require("body-parser");
const app = express();
const port = 3000;

let database = require('./public/COMP4711/MemoryGame/JavaScript/database');

app.use(express.static(path.join(__dirname, "public")));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.get('/*', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/hello', (req, res) => {
    let d = new Date();
    res.send(`${d.toDateString()} : ${d.toTimeString()}`);
});

app.get('/COMP4711/MemoryGame/summary', async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "COMP4711", "MemoryGame", "summary.html"));
    console.log("Setup Database");
    database.setUpDatabase();
    console.log("Finished");
});

app.get('/COMP4711/MemoryGame/leaderboard', async (req, res) => {

});

app.post('/COMP4711/MemoryGame/summary/result', function(req, res) {
    let player = req.body.player;
    let finalScore = req.body.finalScore;

    database.addEntry(player, finalScore);
    res.end("yes");
});

app.listen(port, () => console.log('Server running on port 3000'));

