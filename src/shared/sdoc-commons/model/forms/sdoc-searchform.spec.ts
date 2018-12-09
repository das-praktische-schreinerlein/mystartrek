import {StarDocSearchForm} from './sdoc-searchform';

describe('StarDocSearchForm', () => {
    it('should create an instance', () => {
        expect(new StarDocSearchForm({})).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocSearchForm({
            fulltext: 'hello'
        });
        expect(sdoc.fulltext).toEqual('hello');
    });
});
