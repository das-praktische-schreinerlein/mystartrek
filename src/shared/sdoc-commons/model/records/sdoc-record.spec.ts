import {StarDocRecord} from './sdoc-record';

describe('StarDocRecord', () => {
    it('should create an instance', () => {
        expect(new StarDocRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocRecord({
            name: 'hello',
            type: 'TRACK'
        });
        expect(sdoc.name).toEqual('hello');
        expect(sdoc.type).toEqual('TRACK');
    });
});
