const mysql = require('mysql');
let con;

exports.setUpDatabase = async function () {
    let connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    connect.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        connect.query("CREATE DATABASE IF NOT EXISTS scoredb", async function (err, result) {
            if (err) throw err;
            console.log("Database created");
            closeConnection(connect);
            await connectDatabase();
            await createTable();
            closeConnection(con);
        });
    });
}

exports.addEntry = async function (playerName, scoreValue) {
    await connectDatabase();
    await insertRow(playerName, scoreValue);
}

exports.getTopFive = async function () {
    await connectDatabase();

    let sql = `SELECT * FROM userScore ORDER BY result DESC LIMIT 5`;

    return new Promise(function (resolve, reject) {
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

    return new Promise(function () {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            resolve();
            // return new Promise(function () {
            // });
        });
    });
}

function createTable() {
    let sql = `CREATE TABLE userScore (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), result INT)`;

    return new Promise(function () {
        con.query(sql, function (err, result) {
            if (err) {
                console.log("userScore table already exists");
            } else {
                console.log("userScore table created");
            }
            // return new Promise(function () {
            //     //do nothing;
            // });
            resolve();
        });
    });
}

function insertRow(playerName, scoreValue) {
    let sql = `INSERT INTO userScore (name, result) VALUES ("${playerName}", ${scoreValue})`;

    return new Promise(function () {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted user and score into database");
            // return new Promise(function () {
            //     //do nothing;
            // });
        });
        resolve();
    });
}

function closeConnection(target_connection) {
    target_connection.end(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connection closed");
    });
}