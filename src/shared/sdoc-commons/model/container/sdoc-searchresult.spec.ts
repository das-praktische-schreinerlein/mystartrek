import {StarDocSearchResult} from './sdoc-searchresult';

describe('StarDocSearchResult', () => {
    it('should create an instance', () => {
        expect(new StarDocSearchResult(undefined, undefined, undefined, undefined)).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdocSearchResult = new StarDocSearchResult(undefined, 1, undefined, undefined);
        expect(sdocSearchResult.recordCount).toEqual(1);
    });
});
