/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by <frodo@poolus.kr>
 ******************************************************************************/

const CommonError = require('../CommonError');
/**
 * BadRequestError
 * BadRequestError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class BadRequestError extends CommonError {
  constructor(props) {
    super(props);

    this.name = BadRequestError.name;
    this.code = 400;
  }
}

module.exports.BadRequestError = BadRequestError;