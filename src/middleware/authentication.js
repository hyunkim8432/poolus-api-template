/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const connectRedis = require('connect-redis');

/* Local Module */
const { Config, Settings } = require('../constant/consts');

function authenticationMiddleware (server) {
  try {
    const RedisStore = connectRedis(session);
    global.sessionMiddleware = session({
      store: new RedisStore(server.config.redis.session),
      secret: Config.SECRET,
      ttl: Config.SESSION_EXPIRES_UNCLE_SEC,
      saveUninitialized: false,
      resave: false,
    });
    server.use(global.sessionMiddleware);

    return true;
  } catch (e) {
    throw e;
  }
}


function authenticate(req, res, next) {

  next();
  //TODO JWT 인증 로직 추후에 수정 후 적용
  // const token = req.headers[Settings.TOKEN_KEY] || (req.session ? req.session.token : null);
  //
  // if (token !== undefined && !!token ) {
  //   jwt.verify(token, Config.SECRET, function (err, result) {
  //     if (err) {
  //       return next(new global.errors.UnauthorizedError(err));
  //     } else {
  //       if (!result.exp) {
  //         return next(new global.errors.ExpiredTokenError());
  //       }
  //
  //       result.exp = result.exp * 1000;
  //
  //       if ( (new Date()).getTime() > result.exp ) {
  //         return next(new global.errors.ExpiredTokenError());
  //       }
  //
  //       if (result && result.password) {
  //         delete result.password;
  //       }
  //
  //       if (!req.session) {
  //         return next(new global.errors.BadRequestError('세션이 만료되었습니다.\n새로고침 해주시기 바랍니다.'));
  //       }
  //       req.session.token = token;
  //       req.session.branch = new Branch(result.id, result.email);
  //
  //       next();
  //     }
  //   });
  // } else if (req.url === '/auth/login'){
  //   next();
  // } else {
  //   next(new global.errors.custom.UnauthorizedError());
  // }
}


class Branch {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }
  async isAuthenticate(permissionProperty, operator, value) {
    try {

      return true;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = authenticationMiddleware;

module.exports.authenticate = authenticate;
module.exports.Branch = Branch;