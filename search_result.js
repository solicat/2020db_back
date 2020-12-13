class Search_result{

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

          const account_id = dict.account_id;
          const video_type = dict.video_type;
          const genre = dict.genre;
          const version = dict.version;
          binds = [];

          sql = `select video.video_name, video.video_type, genre.genre_name, v_version.country from video, v_version, vv_relate, genre, belong_to, v_account, v_write, rate, rating where belong_to.genre_id = genre.genre_id and belong_to.video_id = video.video_id and vv_relate.version_id = v_version.version_id and vv_relate.video_id = video.video_id and v_account.account_id = v_write.account_id and rating.rating_id = v_write.rating_id and rating.rating_id = rate.rating_id and rate.video_id = video.video_id`;
          if(video_type.length != 0){
            sql += ` and video.video_type = :video_type`;
            binds.push(video_type);
          }
          if(genre.length != 0){
            sql += ` and genre.genre_name = :genre`;
            binds.push(genre);
          }
          if(version.length != 0){
            sql += ` and v_version.country = :version`;
            binds.push(version);
          }
          sql += ` and not exists (select v.video_id from video v, rate r, rating rat, v_write vw, v_account va where v.video_id = video.video_id and v.video_id = r.video_id and r.rating_id = rat.rating_id and rat.rating_id = vw.rating_id and vw.account_id = va.account_id and va.account_id = :account_id) order by video.video_id asc`;
          binds.push(account_id);
          console.log(sql);
          result = await connection.execute(sql, binds, options);
          console.log(result.rows);

          res.json(result.rows);
        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports = Search_result;
