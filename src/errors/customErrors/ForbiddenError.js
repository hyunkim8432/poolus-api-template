/*******************************************************************************
 * Copyright (C) ssanjun.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by JunHee, Han <ssanjun.dev@gmail.com>
 ******************************************************************************/

const CommonError = require('../CommonError');

/**
 * ForbiddenError
 * ForbiddenError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class ForbiddenError extends CommonError {
    constructor(props) {
        super(props);

        this.name = ForbiddenError.name;
        this.code = 403;
    }
}

module.exports.ForbiddenError = ForbiddenError;