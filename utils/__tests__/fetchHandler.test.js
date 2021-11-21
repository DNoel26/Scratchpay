/** @format */

import nodeFetchHandler from '../fetch-handler.js';
import { DATA_URL_DENTAL_CLINICS, DATA_URL_VET_CLINICS } from '../urls.js';

jest.mock('../fetch-handler.js');

describe('Node fetch handler', () => {
    afterEach(() => jest.restoreAllMocks());

    test('should not call actual endpoint and should return an empty array', async () => {
        nodeFetchHandler.mockImplementationOnce(() => Promise.resolve([]));
        const data = await nodeFetchHandler(DATA_URL_DENTAL_CLINICS);
        expect(data).toHaveLength(0);
    });
    test('should return an array of dental clinics', async () => {
        const data = await nodeFetchHandler(DATA_URL_DENTAL_CLINICS);
        expect(data).toHaveLength(10);
    });
    test('should return an array of vet clinics', async () => {
        const data = await nodeFetchHandler(DATA_URL_VET_CLINICS);
        expect(data).toHaveLength(5);
    });
});
