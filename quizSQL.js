const express = require('express');
const path = require("path");
const app = express();
const port = 8888;

app.use(express.static(path.join(__dirname, "public")));

app.get('/*', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/updatedb', (req, res) => {
    let mysql = require('mysql');

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        createDatabase(con);
    });

    let questionScript = require('./questions')
    questionScript.initAll();

    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    })

    con.connect(function (err) {
        createTable(con);
        for (let i = 0; i < 5; ++i) {
            addQuestion(con, questionScript.myQuestions(i), questionScript.myOptions(i), questionScript.myAnswers(i));
        }
    })
});

app.listen(port, () => console.log('Server running on port 8888'));

function createDatabase(con) {
    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}

function createTable(con) {
    let sql  = "DROP TABLE IF EXISTS question, option";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Question and Option table dropped");
    });

    sql = "CREATE TABLE IF NOT EXISTS question (id INT AUTO_INCREMENT PRIMARY KEY," +
        "topic VARCHAR(255), correctAnswer INT)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Question table created");
    });

    sql = "CREATE TABLE IF NOT EXISTS option (topic VARCHAR(255), selection VARCHAR(1024))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Option table created");
    });
}

function addQuestion(con, question, options, answer) {
    let sql = "INSERT INTO question (topic, correctAnswer) VALUES (" + `"${question}"` + ", " + answer + ")";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted quesiton into database");
    });

    for (let i = 0; i < options.length; ++i) {
        sql = "INSERT INTO option (topic, selection) VALUES (" + `"${question}"` + ", " + 
        `"${options[i]}"` + ")";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted option into database");
        });
    }
}