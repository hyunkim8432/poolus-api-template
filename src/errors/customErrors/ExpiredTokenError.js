/*******************************************************************************
 * Copyright (C) ssanjun.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by JunHee, Han <ssanjun.dev@gmail.com>
 ******************************************************************************/

const CommonError = require('../CommonError');

/**
 * ExpiredTokenError
 * ExpiredTokenError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class ExpiredTokenError extends CommonError {
    constructor(props) {
        super(props);

        this.name = ExpiredTokenError.name;
        this.code = 401;
    }
}

module.exports.ExpiredTokenError = ExpiredTokenError;