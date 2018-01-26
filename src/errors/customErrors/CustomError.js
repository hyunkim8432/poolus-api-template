/*******************************************************************************
 * Copyright (C) ssanjun.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by JunHee, Han <ssanjun.dev@gmail.com>
 ******************************************************************************/

const CommonError = require('../CommonError');

/**
 * CustomError
 * CustomError
 *
 * @module errors
 * @see https://docs.mojitohq.com
 * @desc error common modules
 */
class CustomError extends CommonError {
    constructor(props) {
        super(props);

        this.name = CustomError.name;
        this.code = 500;
    }
}

module.exports.CustomError = CustomError;
