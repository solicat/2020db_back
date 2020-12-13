class All_episode{

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
          sql =`select video.video_name, Episode.view_count, video.mean_rating, video.runtime from episode, video, refer_episode where refer_episode.video_id = video.video_id and refer_episode.episode_id = episode.episode_id order by video.video_id asc`;
          binds = [];
          result = await connection.execute(sql, binds, options);

          res.json(result.rows);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = All_episode;
