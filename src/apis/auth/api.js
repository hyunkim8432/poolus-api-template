/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/
/* Node Module */
const _ = require('lodash');

/* Local Module */
const funcAuth = require('./function');

/**
 *  Defines Auth logic
 */
class AuthApiRouter {

  /**
   *  @Description: Login API
   */
  async setLogin (req, res, next) {
    let conn;
    try {

      const sessionKey = req.body.sessionKey || '160hlsWSI9tcCgIXn4oIwM1aLgpaMaK24MVpdKTZo4_V0BYzj';

      conn = await global.mariadb.getMaster();
      const user = await funcAuth.getUserBySessionKey(conn, sessionKey);

      if (!user) {
        throw new global.errors.BadRequestError();
      }

      res.data = {
        user: user
      };
      next();
    } catch (e) {
      throw e;
    } finally {
      if (typeof conn !== 'undefined' && conn.release) {
        conn.release();
      }
    }
  }

  /**
   *  @Description: Show API for APP
   */
  async getShow (req, res, next) {
    let conn;
    try {
      res.data = {
        getShow: "OK"
      }
    } catch (e) {
      throw e;
    } finally {
      if (typeof conn !== 'undefined' && conn.release) {
        conn.release();
      }
    }
  }

  /**
   *  @Description: Logout API
   */
  async setLogout (req, res, next) {
    let conn;
    try {
      res.data = {
        setLogout: "OK"
      }
    } catch (e) {
      throw e;
    } finally {
      if (typeof conn !== 'undefined' && conn.release) {
        conn.release();
      }
    }
  }
}

module.exports = new AuthApiRouter;