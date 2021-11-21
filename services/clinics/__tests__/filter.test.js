/** @format */

import getFilteredAndUnfilteredQueryData from '../filter.js';
import {
    MOCK_DENTAL_CLINICS,
    MOCK_VET_CLINICS,
} from '../../../mockdata/clinics.js';

describe('Filter clinics', () => {
    const clinics = [...MOCK_DENTAL_CLINICS, ...MOCK_VET_CLINICS];
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
    test('should return items from an array of clinics based on a single query', () => {
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
