/** @format */

const getDataFromUrls = async (urls, fetcher) => {
    if (!urls.length) {
        throw new Error(
            'Array required with at least one absolute URL for fetcher',
        );
    }
    const mergedData = [];
    for (let i = 0; i < urls.length; i++) {
        const data = await fetcher(urls[i]);
        mergedData.push(...data);
    }
    return mergedData;
};

export default getDataFromUrls;
