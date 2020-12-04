var express = require("express");
const oracledb = require('oracledb');
const dbConfig = require('./db_config.json');
var bodyParser = require('body-parser');

var test = require("./test");
var rating = require("./rating");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const rating_instance = new rating();
/*
const test_instance = new test();
async function run() {
  let connection;

  try {

    let sql, binds, options, result;

    connection = await oracledb.getConnection(dbConfig);

    //
    // Create a table
    //

    const stmts = [
      `DROP TABLE no_example`,

      `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`
    ];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch(e) {
        if (e.errorNum != 942)
          console.error(e);
      }
    }

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

    //
    // Query the data
    //

    sql = `SELECT * FROM no_example`;

    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };

    result = await connection.execute(sql, binds, options);

    console.log("Metadata: ");
    console.dir(result.metaData, { depth: null });
    console.log("Query results: ");
    console.dir(result.rows, { depth: null });

    //
    // Show the date.  The value of ORA_SDTZ affects the output
    //

    sql = `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI') AS CD FROM DUAL`;
    result = await connection.execute(sql, binds, options);
    console.log("Current date query results: ");
    console.log(result.rows[0]['CD']);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}


//test
*/
app.get("/", async (req,res)=>{
  let sql, binds, options, result, connection;

  connection = await oracledb.getConnection(dbConfig);

  sql = `SELECT (1+1) AS result from employee`;

  binds = {};

  // For a complete list of options see the documentation.
  options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
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

   res.json(result.rows);
});

app.get("/rating", (req, res)=>{
  rating_instance.execute(req.query.id, oracledb, dbConfig, res);
})

app.listen(5000, "0.0.0.0", function(){
    console.log("server is running.. in 5000");
});

//media server
