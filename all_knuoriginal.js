class All_knuoriginal{

    execute = async (dict, oracledb, dbConfig, res) =>{
        try {
          let sql, binds, options, result, connection;

          connection = await oracledb.getConnection(dbConfig);
          options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
            // extendedMetaData: true,               // get extra metadata
            // prefetchRows:     100,                // internal buffer allocation size for tuning
            // fetchArraySize:   100                 // internal buffer allocation size for tuning
          };
          sql =`select video.video_name, knu_original.view_count, video.mean_rating, video.runtime from knu_original, video, refer_knu_original where refer_knu_original.video_id = video.video_id and refer_knu_original.knu_original_id = knu_original.knu_original_id order by video.video_id asc`;
          binds = [];
          result = await connection.execute(sql, binds, options);

          res.json(result.rows);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = All_knuoriginal;
