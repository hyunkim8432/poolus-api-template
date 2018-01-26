/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const express = require('express');
const path = require('path');

/* Local Module */
const root = require('./root');
const api = require('./api');
const createRouter = require('./createRouter');
const { authenticate } = require('../middleware/authentication');

async function router(server) {
  server.useRoute = (route) => {
    if (route.prefix) {
      server.use(route.prefix, route);
    } else {
      server.use(route);
    }
  };
  server.useRoute(root);
  server.useRoute(api);
  return true;
}

module.exports = router;