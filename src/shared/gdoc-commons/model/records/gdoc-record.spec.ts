import {GeoDocRecord} from './gdoc-record';

describe('GeoDocRecord', () => {
    it('should create an instance', () => {
        expect(new GeoDocRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const gdoc = new GeoDocRecord({
            name: 'hello',
            type: 'TRACK'
        });
        expect(gdoc.name).toEqual('hello');
        expect(gdoc.type).toEqual('TRACK');
    });
});
