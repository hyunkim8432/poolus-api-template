const CommonError = require('../CommonError');


class NotExistBranchError extends CommonError {
  constructor(props) {
    super(props);

    this.name = NotExistBranchError.name;
    this.code = 400;
    return this;
  }
}

module.exports.NotExistBranchError = NotExistBranchError;

