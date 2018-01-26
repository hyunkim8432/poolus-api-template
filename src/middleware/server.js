/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const _ = require('lodash');
const express = require('express');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');


function serverMiddleware (server) {
  try {
    server.disable('x-powered-by');
    server.use(bodyParser.json({limit: '10mb'}));
    server.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
    server.use(bodyParser.raw());
    server.use(hpp());


    server.use(cookieParser());
    server.use(compression());
  } catch (e) {
    throw e;
  }
}

module.exports = serverMiddleware;