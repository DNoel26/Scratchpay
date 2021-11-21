/** @format */

import states from 'us-state-codes';

export const USStatesHandler = (req, res, next) => {
    const {
        sanitizeStateCode,
        sanitizeStateName,
        getStateNameByStateCode,
        getStateCodeByStateName,
    } = states;
    const { stateCode, stateName } = req.query;

    // initially checks if state code is entered instead of name
    // changes to state name if true
    const sanitizedStateName =
        getStateNameByStateCode(sanitizeStateCode(stateName)) ||
        sanitizeStateName(stateName);

    // initially checks if state name is entered instead of code
    // changes to state code if true
    const sanitizedStateCode =
        getStateCodeByStateName(sanitizeStateName(stateCode)) ||
        sanitizeStateCode(stateCode);
    
    if (sanitizedStateName) {
        req.query.stateName = sanitizedStateName;
        req.stateCode = getStateCodeByStateName(sanitizedStateName);
    }
    if (sanitizedStateCode) {
        req.query.stateCode = sanitizedStateCode;
        req.stateName = getStateNameByStateCode(sanitizedStateCode);
    }
    next();
};
