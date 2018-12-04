import {GeoDocSearchForm} from './gdoc-searchform';

describe('GeoDocSearchForm', () => {
    it('should create an instance', () => {
        expect(new GeoDocSearchForm({})).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const gdoc = new GeoDocSearchForm({
            fulltext: 'hello'
        });
        expect(gdoc.fulltext).toEqual('hello');
    });
});
