/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Node Module */
const _ = require('lodash');
const express = require('express');
const path = require('path');

/* Local Module */
const { authenticate } = require('../middleware/authentication');
//const { authorize } = require('../middleware/authorize');

function createRouter(options = {}) {
  const router = express.Router(options);
  router.prefix = null;

  ['get', 'post', 'put', 'delete', 'all'].forEach((method) => {
    const _method = router[method];
    router[method] = (path, ...args) => {
      const last = args.length - 1;
      const fn = args[last];
      fn.prefix = router.prefix;
      args[last] = (req, res, next) => {
        try {
          authenticate(req, res, (e) => {
            if (!_.isEmpty(e)) {
              next(e);
            } else {
              next();
            }
          })
        } catch (e) {
          next(e);
        }
      };
      const wrappingFunction = async(req, res, next) => {
        try {
          if (res._processed) return next();
          res._processed = true;

          await fn(req, res, next);
        } catch (e) {
          next(e);
        }
      };
      Object.defineProperty(wrappingFunction, 'name', {value: fn.name});

      wrappingFunction.roles = fn.roles;
      wrappingFunction.description = fn.description;

      args.push(wrappingFunction);
      return _method.call(router, path, ...args);
    };
  });
  return router;
}

module.exports = createRouter;