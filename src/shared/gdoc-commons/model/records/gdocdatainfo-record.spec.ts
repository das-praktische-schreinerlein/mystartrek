import {GeoDocDataInfoRecord} from './gdocdatainfo-record';

describe('GeoDocDataInfoRecord', () => {
    it('should create an instance', () => {
        expect(new GeoDocDataInfoRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const gdoc = new GeoDocDataInfoRecord({
            region: 'Dolomiten'
        });
        expect(gdoc.region).toEqual('Dolomiten');
    });
});
