const express = require('express');
const path = require("path");
const app = express();
const port = 8888;
const mysql = require('mysql');

app.use(express.static(path.join(__dirname, "public")));

app.get('/*', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/updatedb', async (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        await createDatabase(con);
    });

    con.end(function (err) {
        if (err) {
            throw err;
        }
        console.log("Database created and connection closed");
    });

    let questionScript = require('./questions')
    questionScript.initAll();

    let con2 = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
    })

    con2.connect(function (err) {
        createTable(con2);
        for (let i = 0; i < 5; ++i) {
            addQuestion(con2, questionScript.myQuestions(i), questionScript.myOptions(i), questionScript.myAnswers(i));
        }
    })
});

app.listen(port, () => console.log('Server running on port 8888'));

async function createDatabase(con) {
    await con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
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