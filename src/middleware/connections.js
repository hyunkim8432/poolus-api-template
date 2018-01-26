/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const _ = require('lodash');
const mariadb = require('mysql');
const redis = require('redis');
const bluebird = require('bluebird');
const pg = require('pg');
const named = require('node-postgres-named');
const elasticsearch = require('elasticsearch');
const httpawses = require('http-aws-es');


function queryFormat(query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

function wrapper(connection) {
  var query = (sql, options) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, options, (err, result) => {
        if (err) {
          return reject(err);
        }

        if (result === undefined) {
          result = [];
        }

        if (result.command === 'INSERT' || result.command === 'UPDATE' || result.command === 'DELETE') {
          if (result.rowCount > 0 && result.rows.length > 0) {
            return resolve(result.rows[0]);
          } else {
            return resolve(false);
          }
        }

        if (result && result.rows) {
          resolve(result.rows);
        } else if (result){
          resolve(result);
        } else {
          resolve([]);
        }

      });
    });
  };

  const startTransaction = () => {
    return new Promise((resolve, reject) => {
      connection.query('BEGIN', (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      })
    });
  };

  const commit = () => {
    return new Promise((resolve, reject) => {
      connection.query('COMMIT', (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      })
    });
  };

  const rollback = () => {
    return new Promise((resolve, reject) => {
      connection.query('ROLLBACK', (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      })
    });
  };

  connection.q = query;
  connection.startTransaction = startTransaction;
  connection.commit = commit;
  connection.rollback = rollback;

  return connection;
}



function connectionsMiddleware (server) {
  try {
    const pool = getPool(server.config.database);

    global.mariadb = pool['mariadb'];

    if(server.config.elasticsearch && server.config.elasticsearch.accessKey && server.config.elasticsearch.secretKey){
      console.log('ES Using IAM');
      global.elasticsearch = new elasticsearch.Client({
        host: server.config.elasticsearch.host,
        connectionClass: httpawses,
        amazonES: {
          region: 'ap-northeast-2',
          accessKey: server.config.elasticsearch.accessKey,
          secretKey: server.config.elasticsearch.secretKey
        },
        log: server.config.elasticsearch.log
      });
    }else{
      console.log('ES Not Using IAM');
    }
    return true;
  } catch(e) {
    throw e;
  }
}

function getPool(config) {
  const pool = {};

  _.each(config, (v, key) => {
    if (key === 'mariadb') {
      const poolCluster = mariadb.createPoolCluster();
      _.each(v, (c, name) => {
        c.queryFormat = queryFormat();
        poolCluster.add(_.upperFirst(name), c);
        poolCluster[`get${_.upperFirst(name)}`] = () => {
          return new Promise((resolve, reject) => {
            return poolCluster.getConnection(_.upperFirst(name), (err, conn) => {
              if (err) {
                return reject(err);
              }
              conn = bluebird.promisifyAll(conn);
              conn = wrapper(conn);
              conn.config.namedPlaceholders = true;

              resolve(conn);
            });
          });
        };
      });

      pool[key] = poolCluster;
    } else if (key ==='postgresql') {
      const poolCluster = wrapper(new pg.Pool(v));
      named.patch(poolCluster);

      poolCluster.getMaster = () => {
        return new Promise((resolve, reject) => {
          poolCluster.connect((err, client, done) => {
            if (err) {
              reject(err);
            } else {
              client.release = done;
              resolve(named.patch(wrapper(client)));
            }
          });
        });
      };
      poolCluster.getSlave = () => {
        return new Promise((resolve, reject) => {
          poolCluster.connect((err, client, done) => {
            if (err) {
              reject(err);
            } else {
              client.release = done;
              resolve(named.patch(wrapper(client)));
            }
          });
        });
      };

      pool[key] = poolCluster;
    }
  });

  return pool;
}

module.exports = connectionsMiddleware;