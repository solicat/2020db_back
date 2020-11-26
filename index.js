var mysql      = require('mysql2/promise');
var express = require("express");
var bodyParser = require('body-parser');
var db_config = require("./db_config.json");
var test = require("./test");


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var pool = mysql.createPool({
    host : db_config.host,
    user : db_config.user,
    password : db_config.password,
    database: db_config.database
});

const test_instance = new test();


//test

app.get("/", (req,res)=>{
   test_instance.execute(pool, res);
});

app.listen(5000, "0.0.0.0", function(){
    console.log("server is running.. in 5000");
});

//media server