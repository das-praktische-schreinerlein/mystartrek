import {GeoDocSearchResult} from './gdoc-searchresult';

describe('GeoDocSearchResult', () => {
    it('should create an instance', () => {
        expect(new GeoDocSearchResult(undefined, undefined, undefined, undefined)).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const gdocSearchResult = new GeoDocSearchResult(undefined, 1, undefined, undefined);
        expect(gdocSearchResult.recordCount).toEqual(1);
    });
});
