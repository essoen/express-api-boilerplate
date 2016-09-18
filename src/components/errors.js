import raven from 'raven';
import config from '../config';

/**
* All error handeling and errors used trouought the application.
* @module components/errors
*/

/**
* errorMiddleware - Catches all upstream errors and returns them to the requester.
*
* @param  {Object} err - The error to be handled
* @param  {Object} req - Express request object
* @param  {Object} res - Express response object
* @param  {Function} next - Express next middleware function
* @return {Undefined}  - The handled error response
*/
// eslint-disable-next-line no-unused-vars
export function errorMiddleware(err, req, res, next) {
    if (config.nodeEnv === 'development') {
        console.log(err.stack); // eslint-disable-line
    }

    const status = err.status || 500;
    return res
    .status(status)
    .json(err.payload || {
        name: err.name,
        message: err.message
    });
}

/**
 * The sentry client used trought the application
 * @type {sentryClient}
 */
export const sentryClient = new raven.Client(config.sentry, {
    release: require('../../package.json').version,
    tags: {
        environment: config.nodeEnv
    }
});

/**
* handleError - sends the error to sentry to further analysis.
*
* @param  {Object} error - Validation error from  Sequelize
*/
export function handleError(error) {
    if (config.env === 'production' || config.env === 'staging') sentryClient.captureError(error);
}

/**
* pageNotFoundMiddleware - Returns a 404 Page not Found error it the route requested
* is not matched with any corresponding route.
*
* @param  {Object} req - Express request object
* @param  {Object} res - Express response object
* @return {Undefined}  - A 404 not found error
*/
export function pageNotFoundMiddleware(req, res) {
    return res
    .status(404)
    .json({
        message: 'Page Not Found'
    });
}

/**
* DatabaseError - Returns an Error message for Sequelize Database error.
* This is thrown in cases where validation in the DBMS is what stops the
* databse action, not Sequelize validation.
*
* @param  {Object} error - Database Error from Sequelize
* @return {Object}  - A DatabaseError object
*/
export class DatabaseError extends Error {
    name = 'ValidationError';
    status = 400;
    constructor(error) {
        super(error.message);
    }
}

/**
* ValidationError - Returns an Error message for Sequelize validation with
* information about what's wrong
*
* @param  {Object} error - Validation error from  Sequelize
* @return {Object}  - A ValidationError object
*/
export class ValidationError extends Error {
    name = 'ValidationError';
    status = 400;
    constructor(error) {
        super(error.errors[0].message);
    }
}

/**
* ValidationError - Returns an Error message for general validation with
* message about what's wrong
*
* @param  {Object} error - Validation error from  Sequelize
* @return {Object}  - A ValidationError object
*/
export class CustomValidationError extends Error {
    name = 'ValidationError';
    status = 400;
    constructor(message = 'Bad request.') {
        super(message);
        this.message = message;
    }
}

/**
* ResourceNotFoundError - Returns a 404 Entity not found error for when
* a client request an entity that isn't there
*
* @param  {String} entityType - The type of entity that isn't found
* @return {Object}  - Error object
*/
export class ResourceNotFoundError extends Error {
    name = 'ResourceNotFoundError';
    status = 404;
    constructor(entityType = 'entity') {
        super(`Could not find resource of type ${entityType}`);
    }
}

/**
* AuthenticationError - Returns a 401 You need to authenicate to access this resource,
* implying that the user does not have enough premissions to complete this request.
*
* @param  {String} message - A message sent to the user why he/she is not authenticated
* @return {Object}  - Error object
*/
export class AuthenticationError extends Error {
    name = 'AuthenticationError';
    status = 401;
    constructor(message = 'You need to authenicate to access this resource') {
        super(message);
        this.message = message;
    }
}

/**
* AuthorizationError - Returns a 401 You are not authorized to access this resource,
* implying that the user does not have enough premissions to complete this request.
*
* @param  {String} message - A message sent to the user why he/she is not authenticated
* @return {Object}  - Error object
*/
export class AuthorizationError extends Error {
    name = 'AuthorizationError';
    status = 403;
    constructor(message = 'You are not authorized to access this resource') {
        super(message);
        this.message = message;
    }
}

/**
 * UriValidationError - Returns a 400 Invalid URI.
 * indicating that the URI the user gave was invalid.
 *
 * @return {Object}  - Error object
 */
export class UriValidationError extends Error {
    name = 'UriValidationError';
    status = 400;
    constructor(message = 'Invalid URI.') {
        super(message);
        this.message = message;
    }
}
