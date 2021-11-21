/** @format */

export const asyncMiddlewareHandler = (asyncFunc) => (req, res, next) =>
    Promise.resolve(asyncFunc(req, res, next)).catch(next);
