/*******************************************************************************
 * Copyright (C) ssanjun.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by JunHee, Han <ssanjun.dev@gmail.com>
 ******************************************************************************/

const CommonError = require('../CommonError');

/**
 * UnauthorizedError
 * UnauthorizedError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class InvalidAuthorizedTokenError extends CommonError {
    constructor(props) {
        super(props);

        this.name = InvalidAuthorizedTokenError.name;
        this.code = 401;
    }
}

module.exports.InvalidAuthorizedTokenError = InvalidAuthorizedTokenError;
