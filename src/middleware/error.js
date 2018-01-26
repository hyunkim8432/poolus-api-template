/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const _ =  require('lodash');

function errorMiddleware(server) {
  try {
    server.use(errorHandler)
  } catch (e) {
    throw e;
  }
}

function errorHandler (err, req, res, next) {
  if (err) {
    console.error('[ERROR]', 'errorHandler', err);

    const status = Number(err.code) > 599 ? 500 : Number(err.code) || 500;
    return res.status(status).json({
      code: status,
      type: 'FAIL',
      message: err.message || err.name,
      error: err.data || err.toJSON ? err.toJSON(process.env.NODE_ENV === 'development') : err
    });
  }

  return res.status(200).json({
    code: 200,
    type: 'OK',
    message: 'OK',
    data: res.data || null
  });
}

module.exports = errorMiddleware;