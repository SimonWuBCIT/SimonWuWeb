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
    let questionScript = require('./questions');
    questionScript.initAll();

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //createDatabase(con);
        con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
            if (err) throw err;
            console.log("Database created");

            let con2 = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "mydb"
            });

            con2.connect(function (err) {
                createTable(con2);
                for (let i = 0; i < 5; ++i) {
                    addQuestion(con2, questionScript.myQuestions(i), questionScript.myOptions(i), questionScript.myAnswers(i));
                }
            });
        });
    });

    // con.end(function (err) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Database created and connection closed");
    // });
});

app.listen(port, () => console.log('Server running on port 8888'));

function createDatabase(con) {
    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}

function createTable(con) {
    let sql  = "DROP TABLE IF EXISTS question";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Question table dropped");
    });

    sql = "DROP TABLE IF EXISTS option";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Option table dropped");
    });

    sql = `CREATE TABLE question (id INT AUTO_INCREMENT PRIMARY KEY, topic VARCHAR(255), correctAnswer INT)`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Question table created");
    });

    sql = `CREATE TABLE answerOption (topic VARCHAR(255), selection VARCHAR(255))`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Option table created");
    });
}

function addQuestion(con, my_question, my_options, answer) {
    let sql = `INSERT INTO question (topic, correctAnswer) VALUES ("${my_question}", ${answer})`;
    let option_text;
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted quesiton into database");
    });

    for (let i = 0; i < my_options.length; ++i) {
        option_text = `INSERT INTO answerOption (topic, selection) VALUES ("${my_question}", "${my_options[i]}")`;
        console.log(option_text);
        con.query(option_text, function (err, result) {
            if (err) throw err;
            console.log("Inserted option into database");
        });
    }
}