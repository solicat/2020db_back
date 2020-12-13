class All_movie{

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
          sql =`select video.video_name, movie.view_count, video.mean_rating, video.runtime from movie, video, refer_movie where refer_movie.video_id = video.video_id and refer_movie.movie_id = movie.movie_id order by video.video_id asc`;
          binds = [];
          result = await connection.execute(sql, binds, options);

          res.json(result.rows);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = All_movie;
