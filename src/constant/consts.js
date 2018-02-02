/** @namespace */
const Config = {
  /**
   * Config SECRET
   * @type {string}
   */
  SECRET: 'poolus_odms',

  /**
   * Config SESSION_EXPIRES_SEC
   * @type {number}
   */
  SESSION_EXPIRES_SEC: 60 * 60 * 24 * 7, // 7 day

  /**
   * Config SESSION_EXPIRES_POOL_US_SEC
   * @type {number}
   */
  SESSION_EXPIRES_POOL_US_SEC: 60 * 60 * 24 * 356, // 356 day
};

/** @namespace */
const Settings = {
  /**
   * Settings TOKEN_KEY
   * @type {string}
   */
  TOKEN_KEY: '',
};

module.exports = {
  Config: Config,
  Settings: Settings
};