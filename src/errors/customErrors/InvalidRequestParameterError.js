/*******************************************************************************
 * Copyright (C) ssanjun.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by JunHee, Han <ssanjun.dev@gmail.com>
 ******************************************************************************/

const CommonError = require('../CommonError');

/**
 * InvalidRequestParameterError
 * InvalidRequestParameterError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class InvalidRequestParameterError extends CommonError {
    constructor(props) {
        super(props);
        this.name = InvalidRequestParameterError.name;
        this.code = 400;
    }
}

module.exports.InvalidRequestParameterError = InvalidRequestParameterError;