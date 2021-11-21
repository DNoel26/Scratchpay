/** @format */

export const asyncHandler = (asyncFunc) => {
    const data = { error: null, result: null };
    return asyncFunc
        .then((result) => ({ ...data, result }))
        .catch((error) => Promise.resolve({ ...data, error }));
};
