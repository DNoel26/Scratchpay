/** @format */

export const validateQueryParams = (req, res, next) => {
    const validQueryKeys = [
        'name',
        'stateName',
        'availability',
        'clinicName',
        'stateCode',
        'opening',
    ];
    const validAvailabilityKeys = ['from', 'to'];
    const removeInvalidKeys = (obj, validKeys) => {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (!validKeys.includes(key)) {
                    delete obj[key];
                }
            }
        }
    };
    for (const key in req.query) {
        if (
            typeof req.query[key] === 'object' &&
            validQueryKeys.includes(key)
        ) {
            removeInvalidKeys(req.query[key], validAvailabilityKeys);
        }
    }
    removeInvalidKeys(req.query, validQueryKeys);
    next();
};
