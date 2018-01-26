/*******************************************************************************
 * Copyright (C) ssanjun.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by JunHee, Han <ssanjun.dev@gmail.com>
 ******************************************************************************/

const CommonError = require('../CommonError');

/**
 * NotFoundError
 * NotFoundError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class NotFoundError extends CommonError {
  constructor(props) {
      super(props);

      this.name = NotFoundError.name;
      this.code = 404;
  }
}
module.exports.NotFoundError = NotFoundError;

