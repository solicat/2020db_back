class Insert_video{

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
          sql =`SELECT permission FROM v_account WHERE account_id = :id`;
          binds = [dict.account_id];
          result = await connection.execute(sql, binds, options);

          if(result.rows[0]["PERMISSION"] == 'admin'){
            console.log("admin");
          }else{
            throw new ERROR("not allowed action");
          }


          if(dict.type == "movie"){
            sql = `select count(*) as id from movie`;
            binds = [];
            result = await connection.execute(sql, binds, options);
            const movie_id_next = result.rows[0]["ID"] + 1;
            console.log(result.rows);

            sql = `select count(*) as id from video`;
            binds = [];
            result = await connection.execute(sql, binds, options);
            const video_id_next = result.rows[0]["ID"] + 1;
//http://localhost:5000/insert_video?type=movie&video_name=myvideo&published_date=99/12/28&uploaded_date=99/12/28&runtime=30&description=hi

            const video_type = dict.type;
            const video_name =   dict.video_name;
            const published_date = dict.published_date;//(YY/MM/DD)
            const uploaded_date = dict.uploaded_date;
            const runtime = dict.runtime;
            const description = dict.description;

            sql = `
              insert into movie(movie_id, description)
              values (:movie_id, :description)
            `;
            binds = [movie_id_next, description];
            result = await connection.execute(sql, binds, options);
            console.log(result);

            sql = `
              insert into video(video_id, video_name, video_type, published_date, uploaded_date, runtime)
              values (:video_id, :video_name, :video_type, :published_date, :uploaded_date, :runtime)
            `;
            binds = [video_id_next, video_name, video_type, published_date, uploaded_date, runtime];
            result = await connection.execute(sql, binds, options);
            console.log(result);

            console.log("hi fd");
            sql = `
              insert into refer_movie(movie_id, video_id)
              values (:movie_id, :video_id)
            `;
            binds = [movie_id_next, video_id_next];
            result = await connection.execute(sql, binds, options);
            console.log(result);
          }else if(dict.type == "episode"){
            sql = `select count(*) as id from episode`;
            binds = [];
            result = await connection.execute(sql, binds, options);
            const episode_id_next = result.rows[0]["ID"] + 1;
            console.log(result.rows);

            sql = `select count(*) as id from video`;
            binds = [];
            result = await connection.execute(sql, binds, options);
            const video_id_next = result.rows[0]["ID"] + 1;
            //http://localhost:5000/insert_video?type=movie&video_name=myvideo&published_date=99/12/28&uploaded_date=99/12/28&runtime=30&description=hi

            const video_type = dict.type;
            const video_name =   dict.video_name;
            const published_date = dict.published_date;//(YY/MM/DD)
            const uploaded_date = dict.uploaded_date;
            const runtime = dict.runtime;
            const description = dict.description;
            const season =dict.season;
            const round = dict. round;

            sql = `
              insert into episode(episode_id, description, season, round)
              values (:episode_id, :description, :season, :round)
            `;
            binds = [episode_id_next, description, season, round];
            result = await connection.execute(sql, binds, options);
            console.log(result);

            sql = `
              insert into video(video_id, video_name, video_type, published_date, uploaded_date, runtime)
              values (:video_id, :video_name, :video_type, :published_date, :uploaded_date, :runtime)
            `;
            binds = [video_id_next, video_name, video_type, published_date, uploaded_date, runtime];
            result = await connection.execute(sql, binds, options);
            console.log(result);

            console.log("hi fd");
            sql = `
              insert into refer_episode(episode_id, video_id)
              values (:episode_id, :video_id)
            `;
            binds = [episode_id_next, video_id_next];
            result = await connection.execute(sql, binds, options);
            console.log(result);
          }else if(dict.type == "knu_original"){
            sql = `select count(*) as id from knu_original`;
            binds = [];
            result = await connection.execute(sql, binds, options);
            const knu_original_id_next = result.rows[0]["ID"] + 1;
            console.log(result.rows);

            sql = `select count(*) as id from video`;
            binds = [];
            result = await connection.execute(sql, binds, options);
            const video_id_next = result.rows[0]["ID"] + 1;
            //http://localhost:5000/insert_video?type=movie&video_name=myvideo&published_date=99/12/28&uploaded_date=99/12/28&runtime=30&description=hi

            const video_type = dict.type;
            const video_name =   dict.video_name;
            const published_date = dict.published_date;//(YY/MM/DD)
            const uploaded_date = dict.uploaded_date;
            const runtime = dict.runtime;
            const description = dict.description;
            sql = `
              insert into knu_original(knu_original_id, description)
              values (:episode_id, :description)
            `;
            binds = [knu_original_id_next, description];
            result = await connection.execute(sql, binds, options);
            console.log(result);

            sql = `
              insert into video(video_id, video_name, video_type, published_date, uploaded_date, runtime)
              values (:video_id, :video_name, :video_type, :published_date, :uploaded_date, :runtime)
            `;
            binds = [video_id_next, video_name, video_type, published_date, uploaded_date, runtime];
            result = await connection.execute(sql, binds, options);
            console.log(result);

            console.log("hi fd");
            sql = `
              insert into refer_knu_original(knu_original_id, video_id)
              values (:knu_original_id_next, :video_id)
            `;
            binds = [knu_original_id_next, video_id_next];
            result = await connection.execute(sql, binds, options);
            console.log(result);
          }else{
            throw new ERROR("such type not exist, " + dict.type);
          }
          res.status(400).json(result);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = Insert_video;
