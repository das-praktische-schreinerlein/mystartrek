import {GeoDocDataTechRecord} from './gdocdatatech-record';

describe('GeoDocDataTechRecord', () => {
    it('should create an instance', () => {
        expect(new GeoDocDataTechRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const gdoc = new GeoDocDataTechRecord({
            dist: 5.0
        });
        expect(gdoc.dist).toEqual(5.0);
    });
});
