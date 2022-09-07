// create application with express
const express = require("express");
const mysql = require("mysql");
const app = express();
// using port for application with default: 5000
const PORT = process.env.PORT || 5000;
// config to connect to mysql database, change it pls
const configDB = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "node_js_demo",
    multipleStatements: true
};
// connecting database
const conn = mysql.createConnection(configDB);
// running application,
app.listen(PORT,function () {
    console.log(`Server is running.... Please open link: http://localhost:${PORT}`);
});
// API list class
app.get("/api/get-class",function (req,res) {
    const sql = "select * from classes";
    conn.query(sql,function (err,data) {
        if(err) res.status(403).send("Error");
        else res.send(data);
    });
});
// API list student
app.get("/api/get-student",function (req,res) {
    const sql = "select * from students";
    conn.query(sql,function (err,data) {
        if(err) res.status(403).send("Error");
        else res.send(data);
    });
});
// API list student by class id
// using link: /api/get-student-by-class?class_id=<id_of_class>
app.get("/api/get-student-by-class",function (req,res) {
    const class_id = req.query.class_id;
    const sql = `select * from students where cid = ${class_id}`;
    conn.query(sql,function (err,data) {
        if(err) res.status(403).send("Error");
        else res.send(data);
    });
});
// API search student by name
// using link: /api/search?q=<search_value>
app.get("/api/search",function (req,res) {
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}'`;
    conn.query(sql,function (err,data) {
        if(err) res.status(403).send("Error");
        else res.send(data);
    });
});