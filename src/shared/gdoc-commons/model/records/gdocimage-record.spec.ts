import {GeoDocImageRecord} from './gdocimage-record';

describe('GeoDocImageRecord', () => {
    it('should create an instance', () => {
        expect(new GeoDocImageRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const gdoc = new GeoDocImageRecord({
            name: 'hello',
            fileName: 'img1.jpg'
        });
        expect(gdoc.name).toEqual('hello');
        expect(gdoc.fileName).toEqual('img1.jpg');
    });
});
