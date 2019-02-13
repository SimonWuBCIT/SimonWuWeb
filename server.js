const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/*', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/hello', (req, res) => {
    let d = new Date();
    res.send(`${d.toDateString()} : ${d.toTimeString()}`);
});

// app.get('/testdatabase', (req, res) => {
//     let mysql = require('mysql');

//     let con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//     });

//     let databaseScript = require('./database');

//     con.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//         databaseScript.createDatabase();
//         databaseScript.createTable();
//     });
// });

app.listen(port, () => console.log('Server running on port 3000'));

