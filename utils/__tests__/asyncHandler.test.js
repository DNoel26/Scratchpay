/** @format */

import { asyncHandler } from '../async-handler.js';

describe('Async Handler', () => {
    test('should return an object with error as null and result as expected value', async () => {
        const resolved = Promise.resolve('resolved');
        const { error, result } = await asyncHandler(resolved);
        expect(error).toBe(null);
        expect(result).toBe('resolved');
    });
    test('should return an object with error as expected value and result as null', async () => {
        const rejected = Promise.reject('rejected');
        const { error, result } = await asyncHandler(rejected);
        expect(error).toBe('rejected');
        expect(result).toBe(null);
    });
});
