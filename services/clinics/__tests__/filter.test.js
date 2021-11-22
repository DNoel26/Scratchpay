/** @format */

import getFilteredAndUnfilteredQueryData, {
    checkIsValidSubString,
    getAliasKey,
} from '../filter.js';
import {
    MOCK_DENTAL_CLINICS,
    MOCK_VET_CLINICS,
} from '../../../mockdata/clinics.js';

describe('Check strings', () => {
    test('which should return true', () => {
        const result = checkIsValidSubString(
            'Scratchpay',
            'Scratchpay Test Pet Medical Center',
        );
        expect(result).toBe(true);
    });
});
describe('Get alias key', () => {
    test('should return the other key which matches', () => {
        const aliasKey = getAliasKey('original', [
            ['fakeKey', 'altKey'],
            ['original', 'alias'],
            ['otherKey','anotherKey']
        ]);
        expect(aliasKey).toBe('alias');
    });
});
describe('Filter clinics', () => {
    const clinics = [...MOCK_DENTAL_CLINICS, ...MOCK_VET_CLINICS];
    const aliasKeySets = [
        ['name', 'clinicName'],
        ['stateName', 'stateCode'],
        ['availability', 'opening'],
    ];
    test('should return empty arrays', () => {
        const query1 = {
            name: 'Non Existent Clinic',
        };
        const query2 = {
            name: 'Scratchpay Test Pet Medical Center',
            stateName: 'Non Existent State',
            availability: { from: '00:00', to: '24:00' },
        };
        const query3 = {
            name: 'Scratchpay Test Pet Medical Center',
            stateName: 'California',
            availability: {
                from: 'Non Existent Time',
                to: 'Non Existent Time',
            },
        };
        const queriedClinics1 = getFilteredAndUnfilteredQueryData(
            query1,
            clinics,
        );
        const queriedClinics2 = getFilteredAndUnfilteredQueryData(
            query2,
            clinics,
        );
        const queriedClinics3 = getFilteredAndUnfilteredQueryData(
            query3,
            clinics,
        );
        expect(queriedClinics1.filteredData).toHaveLength(0);
        expect(queriedClinics2.filteredData).toHaveLength(0);
        expect(queriedClinics3.filteredData).toHaveLength(0);
    });
    test('should not contain items that do not match query', () => {
        const query = {
            name: 'Scratchpay',
        };
        const queriedClinics = getFilteredAndUnfilteredQueryData(
            query,
            clinics,
        );
        expect(queriedClinics).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Cleveland Clinic',
                    stateName: 'New York',
                    availability: {
                        from: '11:00',
                        to: '22:00',
                    },
                }),
                expect.objectContaining({
                    clinicName: 'Good Health Home',
                    stateCode: 'FL',
                    opening: {
                        from: '15:00',
                        to: '20:00',
                    },
                }),
            ]),
        );
    });
    test('should return items from an array of clinics based on a single query (tested with and without aliases)', () => {
        const query1 = {
            name: 'Scratchpay',
        };
        const query2 = {
            stateCode: 'ks',
        };
        const query3 = {
            opening: {
                from: '00:00',
                to: '24:00',
            },
        };
        const queriedClinics1 = getFilteredAndUnfilteredQueryData(
            query1,
            clinics,
        );
        const queriedClinics2 = getFilteredAndUnfilteredQueryData(
            query2,
            clinics,
        );
        const queriedClinics3 = getFilteredAndUnfilteredQueryData(
            query3,
            clinics,
        );
        const queriedClinicsWithAliases1 = getFilteredAndUnfilteredQueryData(
            query1,
            clinics,
            { aliasKeySets },
        );
        const queriedClinicsWithAliases2 = getFilteredAndUnfilteredQueryData(
            query2,
            clinics,
            { aliasKeySets },
        );
        const queriedClinicsWithAliases3 = getFilteredAndUnfilteredQueryData(
            query3,
            clinics,
            { aliasKeySets },
        );
        expect(queriedClinics1.filteredData).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Scratchpay Test Pet Medical Center',
                    stateName: 'California',
                    availability: { from: '00:00', to: '24:00' },
                }),
            ]),
        );
        expect(queriedClinics1.filteredData).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Scratchpay Official practice',
                    stateName: 'Tennessee',
                    availability: { from: '00:00', to: '24:00' },
                }),
            ]),
        );
        expect(queriedClinics1.filteredData).toHaveLength(2);
        expect(queriedClinics2.filteredData).toHaveLength(1);
        expect(queriedClinics3.filteredData).toHaveLength(1);
        expect(queriedClinicsWithAliases1.filteredData).toHaveLength(3);
        expect(queriedClinicsWithAliases2.filteredData).toHaveLength(1);
        expect(queriedClinicsWithAliases3.filteredData).toHaveLength(3);
    });
    test('should return items from an array of clinics based on multiple queries', () => {
        const query = {
            clinicName: 'Good Health Home',
            stateCode: 'FL',
            opening: {
                from: '15',
                to: '20',
            },
        };
        const queriedClinics = getFilteredAndUnfilteredQueryData(
            query,
            clinics,
        );
        expect(queriedClinics.filteredData).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    clinicName: 'Good Health Home',
                    stateCode: 'FL',
                    opening: {
                        from: '15:00',
                        to: '20:00',
                    },
                }),
            ]),
        );
        expect(queriedClinics.filteredData).toHaveLength(1);
    });
});
