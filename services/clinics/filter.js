/** @format */

export const checkHasQueriedData = (query, data) => {
    return Object.keys(query).every((key) => {
        if (typeof query[key] === 'object' && typeof data[key] === 'object') {
            return checkHasQueriedData(
                query[key],
                data[key],
            );
        }
        if (checkIsValidSubString(query[key], data[key])) {
            return true;
        }

        // no key or alias key matches found
        // skip this data obj
        return false;
    });
};
export const checkIsValidSubString = (subStrVal, strVal) => {
    return (
        typeof subStrVal === 'string' &&
        typeof strVal === 'string' &&
        strVal.toLowerCase().trim().includes(subStrVal.toLowerCase().trim())
    );
};
const getFilteredAndUnfilteredQueryData = (query, data) => {
    const queriedData = data.reduce(
        (acc, item) => {
            if (checkHasQueriedData(query, item)) {
                return (acc = {
                    ...acc,
                    filteredData: [...acc.filteredData, item],
                });
            } else {
                return (acc = {
                    ...acc,
                    unfilteredData: [...acc.unfilteredData, item],
                });
            }
        },
        { filteredData: [], unfilteredData: [] },
    );
    return queriedData;
};

export default getFilteredAndUnfilteredQueryData;
