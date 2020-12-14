class Login{

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

          sql =`select account_id from v_account
          where account_name=:account_name and
          account_pw=:account_pw
          `;
          binds = [dict.account_name, dict.account_pw];
          result = await connection.execute(sql, binds, options);

          res.json(result.rows[0]["ACCOUNT_ID"]);

        } catch(err) {
          console.log(err.toString())
          res.json(err.toString())
        }
    }

}

module.exports  = Login;
