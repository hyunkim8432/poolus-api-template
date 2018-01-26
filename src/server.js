/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const express = require('express');
const _ = require('lodash');
const path = require('path');

/* Local Module */
const errors = require('./errors');
const middleware = require('./middleware');

const mode = process.env.NODE_ENV || 'development';

let server = global.server = express();
global.errors = errors;

try {
  if ( mode === 'production' ) {
    server.config = global.config =require('../config.js');
  } else if ( mode === 'development') {
    server.config = global.config = require('../config.development.js');
  }
} catch (e) {
    console.log('[E] Not Found co')
}

/**
 * @HealthCheck
 */
server.get('/health', (req, res) => {
  console.log('[access health]@@@',req);
  res.json({health: 'OK'});
});

middleware(server).then(() => {
  const port = 5501;
  console.log(`Server Listen ${port}`);
  server.listen(port);
}).catch((e)=> {
  console.log('@@@e',e);
  process.exit(-1);
});
