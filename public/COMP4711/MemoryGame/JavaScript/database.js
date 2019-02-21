const mysql = require('mysql');
let con;

exports.setUpDatabase = async function() {
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
            await closeConnection(con);
        });
    });
}

exports.addEntry = async function(playerName, scoreValue) {
    await connectDatabase();
    await insertRow(playerName, scoreValue);
}

exports.getTopFive = async function() {
    await connectDatabase();

    let sql = `SELECT * FROM userScore ORDER BY result DESC LIMIT 5`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        return new Promise(function() { 
            return result;
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

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //createTable();
        return new Promise(function() { 
            //do nothing;
        });
    });
}

function createTable() {
    let sql = `CREATE TABLE userScore (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), result INT)`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("userScore table already exists");
        } else {
            console.log("userScore table created");
        }
        return new Promise(function() { 
            //do nothing;
        });
    });
}

function insertRow(playerName, scoreValue) {
    let sql = `INSERT INTO userScore (name, result) VALUES ("${playerName}", ${scoreValue})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted user and score into database");
        return new Promise(function() { 
            //do nothing;
        });
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