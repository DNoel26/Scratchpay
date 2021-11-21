/** @format */

import {
    MOCK_DENTAL_CLINICS,
    MOCK_VET_CLINICS,
} from '../../mockdata/clinics.js';
import { DATA_URL_DENTAL_CLINICS, DATA_URL_VET_CLINICS } from '../urls.js';

const nodeFetchHandler = jest.fn((url) => {
    if (!url) {
        throw new Error('Only absolute URLs are supported');
    }
    let response;
    if (url === DATA_URL_DENTAL_CLINICS) {
        response = MOCK_DENTAL_CLINICS;
    } else if (url === DATA_URL_VET_CLINICS) {
        response = MOCK_VET_CLINICS;
    }

    // testing implementation only
    if (!response) {
        throw new Error('Invalid test URL');
    }
    return Promise.resolve(response);
});

export default nodeFetchHandler;
