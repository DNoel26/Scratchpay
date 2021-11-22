/** @format */

import { validateQueryParams } from '../validate-query.js';

describe('Validate query middleware', () => {
    const req = {
        query: {
            name: 'Scratchpay',
            location: 'CA',
            availability: {
                to: '00:00',
                from: '24:00',
                isClosed: true,
            },
        },
    };
    const res = {};
    const next = jest.fn();
    test('should mutate the request query object to only have valid keys and then call next', async () => {
        validateQueryParams(req, res, next);
        expect(req).toEqual(
            expect.objectContaining({
                query: {
                    name: 'Scratchpay',
                    availability: {
                        to: '00:00',
                        from: '24:00',
                    },
                },
            }),
        );
        expect(next).toHaveBeenCalledTimes(1);
    });
});
