var express = require("express");
const oracledb = require('oracledb');
const dbConfig = require('./db_config.json');
var bodyParser = require('body-parser');

var test = require("./test");
var rating = require("./rating");
var average_rating = require("./average_rating");
var insert_video = require("./insert_video");
var update_video = require("./update_video");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const rating_instance = new rating();
const average_rating_instance = new average_rating();
const insert_video_instance = new insert_video();
const update_video_instance = new update_video();
oracledb.autoCommit = true;
/*
    //
    // Insert three rows
    //

    sql = `INSERT INTO no_example VALUES (:1, :2)`;

    binds = [
      [101, "Alpha" ],
      [102, "Beta" ],
      [103, "Gamma" ]
    ];

    // For a complete list of options see the documentation.
    options = {
      autoCommit: true,
      // batchErrors: true,  // continue processing even if there are data errors
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING, maxSize: 20 }
      ]
    };

    result = await connection.executeMany(sql, binds, options);

    console.log("Number of rows inserted:", result.rowsAffected);
*/
app.get("/", async (req,res)=>{
  let sql, binds, options, result, connection;

  connection = await oracledb.getConnection(dbConfig);

  sql = `insert into actor(actor_name, description) values (:1, :2)`//`SELECT (1+1) AS result from employee`;

  binds = ["psc","jocker"];

  // For a complete list of options see the documentation.
  options = {
    //outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
    // extendedMetaData: true,               // get extra metadata
    // prefetchRows:     100,                // internal buffer allocation size for tuning
    // fetchArraySize:   100                 // internal buffer allocation size for tuning
  };

  result = await connection.execute(sql, binds, options);

  console.log("Metadata: ");
  console.dir(result.metaData, { depth: null });
  console.log("Query results: ");
  console.dir(result.rows, { depth: null });
   //test_instance.execute(pool, res);

   res.json(result);
});

app.get("/rating", (req, res)=>{
  rating_instance.execute(req.query.account_id, oracledb, dbConfig, res);
});

app.get("/average_rating", (req, res)=>{
  average_rating_instance.execute(req.query.video_id, oracledb, dbConfig, res);
});

app.get("/insert_video", (req, res) =>{
  insert_video_instance.execute(req.query, oracledb, dbConfig, res);
})

app.get("/update_video", (req, res) => {
  update_video_instance.execute(req.query, oracledb, dbConfig, res);
})

app.listen(5000, "0.0.0.0", function(){
    console.log("server is running.. in 5000");
});

//media server
