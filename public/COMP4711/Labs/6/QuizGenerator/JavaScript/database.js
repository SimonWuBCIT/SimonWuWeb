const mysql = require('mysql');
let con;

exports.setUpDatabase = async function () {
    let connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    return new Promise(function (resolve) {
        connect.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");

            connect.query("CREATE DATABASE IF NOT EXISTS quizdb", async function (err, result) {
                if (err) throw err;
                console.log("Database created");
                closeConnection(connect);
                await connectDatabase();
                await createTable();
                await closeConnection(con);
                resolve();
            });
        });
    });
}

exports.addEntry = async function (question_list) {
    await connectDatabase();

    for (let i = 0; i < question_list.length; ++i) {
        let options = JSON.stringify(question_list[i].options);
        console.log(options);
        await insertRow(question_list[i].topic, options, question_list[i].correct_answer);
    }
}

exports.getTopFive = async function () {
    await connectDatabase();

    let sql = `SELECT * FROM userScore ORDER BY result DESC LIMIT 5`;

    return new Promise(function (resolve) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

function connectDatabase() {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "scoredb",
    });

    return new Promise(function (resolve) {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            resolve();
        });
    });
}

function createTable() {
    let sql = `CREATE TABLE questions (id INT AUTO_INCREMENT PRIMARY KEY, topic VARCHAR(255), options VARCHAR(1024), correctAnswer VARCHAR(10))`;

    return new Promise(function (resolve) {
        con.query(sql, function (err, result) {
            if (err) {
                console.log("questions table already exists");
            } else {
                console.log("questions table created");
            }
            resolve();
        });
    });
}

function insertRow(topic, options, correctAnswer) {
    let sql = `INSERT INTO questions (topic, options, correctAnswer) VALUES ("${topic}", "${options}", "${correctAnswer}")`;

    return new Promise(function (resolve) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted user and score into database");
        });
        resolve();
    });
}

function closeConnection(target_connection) {
    return new Promise(function (resolve) {
        target_connection.end(function (err) {
            if (err) {
                throw err;
            }
            console.log("Connection closed");
            resolve();
        });
    });
}