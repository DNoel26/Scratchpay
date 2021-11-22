/** @format */

import nodeFetchHandler from '../utils/fetch-handler.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
    DATA_URL_DENTAL_CLINICS,
    DATA_URL_VET_CLINICS,
} from '../utils/urls.js';
import getDataFromUrls from '../services/clinics/query.js';
import { asyncHandler } from '../utils/async-handler.js';
import getFilteredAndUnfilteredQueryData, {
    getAliasKey,
} from '../services/clinics/filter.js';

export const getAllClinics = async (req, res) => {
    const { query } = req;
    const urls = [DATA_URL_DENTAL_CLINICS, DATA_URL_VET_CLINICS];
    const { error: errorGettingClinics, result: allClinics } =
        await asyncHandler(getDataFromUrls(urls, nodeFetchHandler));
    if (errorGettingClinics) {
        console.error('Error: ', errorGettingClinics);
        return res.status(ApiResponse.internalServerError_500.code).json({
            ...ApiResponse.internalServerError_500,
            message: 'Failed to retrieve clinics from URLs',
            error: errorGettingClinics.message,
        });
    }
    if (!allClinics) {
        return res.status(ApiResponse.ok_200.code).json({
            ...ApiResponse.ok_200,
            message: 'No clinics found',
            clinics: allClinics,
        });
    }

    const aliasKeySets = [
        ['name', 'clinicName'],
        ['stateName', 'stateCode'],
        ['availability', 'opening'],
    ];

    // create alias query obj
    const aliasQuery = {};
    Object.keys(query).forEach((key) => {
        const aliasKey = getAliasKey(key, aliasKeySets);
        aliasQuery[aliasKey] = query[key];
    });

    // allows for searching stateName with stateCode
    // and vice versa
    if (query.stateName) {
        aliasQuery.stateCode = req.stateCode;
    }
    if (query.stateCode) {
        aliasQuery.stateName = req.stateName;
    }

    let queriedClinics;
    if (Object.keys(query).length) {
        const results = getFilteredAndUnfilteredQueryData(query, allClinics, {
            aliasKeySets,
        });

        // search remaining unfiltered array for possible matches with alias
        // query; useful when both alias keys and alias values are different but
        // still valid e.g. stateCode='KS' and stateName='Kansas'
        const aliasResults = getFilteredAndUnfilteredQueryData(
            aliasQuery,
            results.unfilteredData,
        );
        queriedClinics = [
            ...results.filteredData,
            ...aliasResults.filteredData,
        ];
    }
    res.status(ApiResponse.ok_200.code).json({
        ...ApiResponse.ok_200,
        query: { ...req.query },
        clinics: queriedClinics || allClinics,
    });
};
