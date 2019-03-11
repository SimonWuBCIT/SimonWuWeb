const mysql = require('mysql');
let con;

exports.setUpDatabase = async function (tableName) {
    let connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    return new Promise(function (resolve) {
        connect.connect(async function (err) {
            if (err) throw err;
            console.log("Connected!");

            connect.query("CREATE DATABASE IF NOT EXISTS quizdb", async function (err, result) {
                if (err) throw err;
                console.log("Database created");
                closeConnection(connect);
                await connectDatabase(tableName);
                await dropTable(tableName);
                await createTable(tableName);
                await closeConnection(con);
                resolve();
            });
        });
    });
}

exports.addEntry = async function (question_list, tableName) {
    await connectDatabase(tableName);

    for (let i = 0; i < question_list.length; ++i) {
        let raw_options = JSON.stringify(question_list[i].options);
        //let options = sanitize(raw_options);
        let options = con.escape(raw_options);
        console.log(options);
        await insertRow(con.escape(question_list[i].topic), options, question_list[i].correct_answer, tableName);
    }
}

exports.getRecords = async function (tableName) {
    await connectDatabase(tableName);

    let sql = `SELECT * FROM quizQuestions`;

    return new Promise(function (resolve) {
        con.query(sql, async function (err, result) {
            if (err) {
                await createTable(tableName);
                resolve();
            }
            let refined_result = result;
            for (let i = 0; i < result.length; ++i) {
                console.log(refined_result[i].selection);
                //refined_result[i].selection = JSON.parse(unsanitize(result[i].selection));
                //refined_result[i].selection = JSON.parse(result[i].selection);
            }
            resolve(refined_result);
        });
    });
}

function connectDatabase(tableName) {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "quizdb",
    });

    return new Promise(function (resolve) {
        con.connect(async function (err) {
            if (err) {
                await exports.setUpDatabase();
                await dropTable(tableName);
                await createTable(tableName);
            }
            console.log("Connected!");
            resolve();
        });
    });
}

function createTable(tableName) {
    if (tableName == "" || tableName == undefined || tableName == 0) {
        tableName = "quizQuestions";
    }
    let sql = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, topic VARCHAR(255), selection VARCHAR(1024), correctAnswer VARCHAR(255))`;

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

function dropTable(tableName) {
    if (tableName == "" || tableName == undefined || tableName == 0) {
        tableName = "quizQuestions";
    }

    let sql = `DROP TABLE IF EXISTS ${tableName}`;

    return new Promise(function (resolve) {
        con.query(sql, function (err, result) {
            if (err) {
                console.log("no such table");
            };
            console.log(`${tableName} table dropped`);
            resolve();
        });
    })
}

function insertRow(topic, options, correctAnswer, tableName) {
    if (tableName == "" || tableName == undefined || tableName == 0) {
        tableName = "quizQuestions";
    }

    let sql = `INSERT INTO ${tableName} (topic, selection, correctAnswer) VALUES ("${topic}", "${options}", "${correctAnswer}")`;

    return new Promise(function (resolve) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted topic, selection, and answer into database");
        });
        resolve();
    });
}

function sanitize(old_string) {
    let json_string = "";
    for (let i = 0; i < old_string.length; ++i) {
        if (old_string[i] === "\"") {
            json_string += "\\\"";
        } else {
            json_string += old_string[i];
        }
    }
    console.log(json_string);
    return json_string;
}

function unsanitize(old_string) {
    let json_string = "";
    for (let i = 0; i < old_string.length; ++i) {
        if (old_string[i] === "\\") {
            continue;
        } else {
            json_string += old_string[i];
        }
    }
    console.log(json_string);
    return json_string;
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