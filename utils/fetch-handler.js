/** @format */

import fetch from 'node-fetch';

const nodeFetchHandler = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `HTTP Error Response: ${response.status}, ${response.statusText}`,
        );
    }
    const data = await response.json();
    return data;
};

export default nodeFetchHandler;
