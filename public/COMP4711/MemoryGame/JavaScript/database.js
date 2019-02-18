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
        });
    });
}

exports.connectDatabase = function() {
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

exports.createTable = function() {
    let sql = `CREATE TABLE userScore (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), result INT)`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("userScore table already exists");
        }
        console.log("userScore table created");
        return new Promise(function() { 
            //do nothing;
        });
    });
}

exports.closeConnection = function(target_connection) {
    target_connnection.end(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connection closed");
    });
}