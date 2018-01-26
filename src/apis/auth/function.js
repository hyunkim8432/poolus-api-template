/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */

module.exports.getUserBySessionKey = async function(conn, sessionKey) {
  try {
    if (!conn || !session_key) {
      throw new global.errors.InvalidDatabaseParameterError('Invalid Parameters');
    }

    //TODO mariaDB에서 params bind 가 제대로 안됨.
    const sql = `
     SELECT 
      * 
     FROM 
      driver_app_session_info
     WHERE 1=1 
      AND session_key = "${sessionKey}"
     ;`;

    const params = {
      "session_key": sessionKey
    };

    let result = await conn.q(sql, params);

    if (result && result[0]) {
      return result[0];
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}



function queryFormatForMariaDB(query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    console.log('@@@', txt, key);
    if (values.hasOwnProperty(key)) {
      return this.escape('"'+values[key]+'"');
    }
    return txt;
  }.bind(this));
}


