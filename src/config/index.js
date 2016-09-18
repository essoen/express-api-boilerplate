/**
 * Main config file used throughout the application
 * @module config
 * @type {object}
 * @property {integer} port - The port to expose to application to.
 * @property {string} pgUrl - The url used by sequlize to connect to postgres.
 * @property {string} nodeEnv - The environment to run the server in
 * @property {string} sentry - Sentry DSN

 */
const config = {
    port: process.env.PORT || 9000,
    pgUrl: process.env.PG_URL || 'postgres://localhost/postgres',
    nodeEnv: process.env.NODE_ENV || 'development',
    sentry: process.env.SENTRY_DSN || ''
};
export default config;
