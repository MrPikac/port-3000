const express = require('express');
const app = express();

var mysql = require('mysql');

app.get("/", (req, res) => {
    res.send("Hello there!");
})

app.listen(3000, function() {
    console.log('Server runing on port 3000');
})

var connection = mysql.createConnection({
   host     :   "localhost",
   port     :   3306,
   user     :   "root",
   password : "",
   database :   "mysql0918"
})

connection.connect();

connection.query('SELECT * FROM users', function(err, data) {
    if (err) throw err

    app.get('/users/', function(req, res) {
        var users = "";
        for (let i = 0; i < data.length; i++) {
            users += data[i].name + ' ';
        }
        res.send(users)
    })
})

connection.query('SELECT * FROM users', function(err, data) {
    if (err) throw err

    for (let i = 0; i < data.length; i++) {
        app.get('/users/' + data[i].id, function(req, res) {
            res.send(data[i].name);
        })
    }
})


connection.end();