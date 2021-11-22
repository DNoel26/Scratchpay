/** @format */

export const checkHasQueriedData = (query, data, { aliasKeySets } = {}) => {
    return Object.keys(query).every((key) => {
        const aliasKey = aliasKeySets ? getAliasKey(key, aliasKeySets) : null;
        if (typeof query[key] === 'object' && typeof data[key] === 'object') {
            return checkHasQueriedData(query[key], data[key]);
        }
        if (typeof query[key] === 'object' && typeof data[aliasKey] === 'object') {
            return checkHasQueriedData(query[key], data[aliasKey]);
        }
        if (
            checkIsValidSubString(query[key], data[key]) ||
            checkIsValidSubString(query[key], data[aliasKey])
        ) {
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
/**
 *
 * @param {{}} query
 * @param {[[string]]} aliasKeySets array of string arrays with original name
 * and a single alias
 * @returns
 */
export const getAliasKey = (key, aliasKeySets) => {
    let aliasKey;

    // searches alias key arrays for original key names
    // if found, returns the alias for that key
    aliasKeySets.forEach((aliases) => {
        if (aliases.includes(key)) {
            aliases.forEach((alias) => {
                if (key !== alias) {
                    aliasKey = alias;
                }
            });
        }
    });
    return aliasKey;
};
const getFilteredAndUnfilteredQueryData = (
    query,
    data,
    { aliasKeySets } = {},
) => {
    const queriedData = data.reduce(
        (acc, item) => {
            if (checkHasQueriedData(query, item, { aliasKeySets })) {
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
