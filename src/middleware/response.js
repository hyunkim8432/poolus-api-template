/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const _ = require('lodash');

function responseMiddleware (server) {
  try {
    server.use(responseWrapper);
    return true;
  } catch (e) {
    throw e;
  }
}

function responseWrapper(req, res, next) {
  if (res._processed) {
    return res.status(200).json({
      code: 200,
      type: 'OK',
      message: res.message || 'OK',
      data: res.data === undefined ? null : res.data
    });
  }
  const code = res.statusCode !== 200 ? res.statusCode : 404;
  return res.status(code).json({
    code: code,
    type: 'FAIL',
    message: res.message || 'FAIL',
    data: res.data === undefined ? null : res.data
  });
}

module.exports = responseMiddleware;