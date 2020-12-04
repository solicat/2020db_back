class Average_rating{

    execute = async (video_id, oracledb, dbConfig, res) =>{
        try {
          let sql, binds, options, result, connection;

          connection = await oracledb.getConnection(dbConfig);

          sql =`select avg(score) as avg_score from rate, rating where rate.rating_id = rating.rating_id and rate.video_id = :id group by video_id`;

          binds = [video_id];

          options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
          };

          result = await connection.execute(sql, binds, options);

          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("Query results: ");
          console.dir(result.rows, { depth: null });

          res.status(400).json(result.rows);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = Average_rating;
