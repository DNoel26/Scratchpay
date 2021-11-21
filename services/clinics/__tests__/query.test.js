/** @format */

import {
    MOCK_DENTAL_CLINICS,
    MOCK_VET_CLINICS,
} from '../../../mockdata/clinics.js';
import nodeFetchHandler from '../../../utils/fetch-handler.js';
import {
    DATA_URL_DENTAL_CLINICS,
    DATA_URL_VET_CLINICS,
} from '../../../utils/urls.js';
import getDataFromUrls from '../query.js';

jest.mock('../../../utils/fetch-handler.js');

describe('Get clinics', () => {
    afterEach(() => jest.restoreAllMocks());

    test('should reject promise and throw an error', async () => {
        expect.assertions(2);
        const data = await getDataFromUrls([], nodeFetchHandler).catch((err) =>
            expect(err.message).toBe(
                'Array required with at least one absolute URL for fetcher',
            ),
        );
        expect(data).toBe(undefined);
    });
    test('should concatenate multiple arrays into a single array of data objects', async () => {
        const data = await getDataFromUrls(
            [DATA_URL_DENTAL_CLINICS, DATA_URL_VET_CLINICS],
            nodeFetchHandler,
        );
        expect(data).toHaveLength(15);
        expect(data).toEqual(expect.arrayContaining(MOCK_DENTAL_CLINICS));
        expect(data).toEqual(expect.arrayContaining(MOCK_VET_CLINICS));
    });
});
