class Rating{

    execute = async (account_id, oracledb, dbConfig, res) =>{
        try {
          let sql, binds, options, result, connection;

          connection = await oracledb.getConnection(dbConfig);

          sql =`SELECT permission FROM v_account WHERE account_id = :id`;

          binds = [account_id];

          options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
          };

          result = await connection.execute(sql, binds, options);

          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("Query results: ");
          console.dir(result.rows, { depth: null });

          console.log(result.rows[0]["PERMISSION"]);
          if(result.rows[0]["PERMISSION"] == 'admin'){
            sql = `select video_id, score, description, account_id from v_write, rate, rating where rating.rating_id = rate.rating_id and v_write.rating_id = rate.rating_id`;

            binds = [];
            result = await connection.execute(sql, binds, options);
          }else{
            sql = `select video_id, score, description, account_id from v_write, rate, rating where rating.rating_id = rate.rating_id and v_write.rating_id = rate.rating_id and account_id = :id`;

            binds = [account_id];
            result = await connection.execute(sql, binds, options);
          }
          res.json(result.rows);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = Rating;
