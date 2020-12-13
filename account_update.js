class Account_update{

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

          sql =`update v_account
          set account_pw=:account_pw, account_name=:account_name, phone=:phone, sex=:sex, birth_date=:birth_date, address=:address, job=:job, permission=:permission
          where account_id=:account_id`;
          binds = [dict.account_pw, dict.account_name, dict.phone, dict.sex, dict.birth_date,dict.address,dict.job,dict.permission,dict.account_id];
          result = await connection.execute(sql, binds, options);

          res.json([dict.account_id, result.rows]);

        } catch(err) {
          console.log(err.toString())
          res.status(404).json(err.toString())
        }
    }

}

module.exports  = Account_update;
