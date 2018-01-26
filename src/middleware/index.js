/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */

/* Local Module */
const serverMiddleware = require('./server');
const connectionsMiddleware = require('./connections');
const authenticationMiddleware = require('./authentication');
const errorMiddleware = require('./error');
const responseMiddleware = require('./response');
const routes = require('../routes');

async function middleware (server) {
  await serverMiddleware(server);
  await connectionsMiddleware(server);
  await authenticationMiddleware(server);
  await routes(server);
  await responseMiddleware(server);
  await errorMiddleware(server);

  return server;
}

module.exports = middleware;