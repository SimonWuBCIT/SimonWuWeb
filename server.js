const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

const database = require('./public/COMP4711/MemoryGame/JavaScript/database');

app.use(express.static(path.join(__dirname, "public")));

app.get('/*', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/hello', (req, res) => {
    let d = new Date();
    res.send(`${d.toDateString()} : ${d.toTimeString()}`);
});

app.get('/COMP4711/MemoryGame/summary', async (req, res) => {
    console.log("Setup Database");
    await database.setUpDatabase();
    await database.createTable();
});

app.get('/COMP4711/MemoryGame/leaderboard.html', async (req, res) => {

});

app.listen(port, () => console.log('Server running on port 3000'));

