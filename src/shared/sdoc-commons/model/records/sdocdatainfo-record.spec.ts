import {StarDocDataInfoRecord} from './sdocdatainfo-record';

describe('StarDocDataInfoRecord', () => {
    it('should create an instance', () => {
        expect(new StarDocDataInfoRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocDataInfoRecord({
            region: 'Dolomiten'
        });
        expect(sdoc.region).toEqual('Dolomiten');
    });
});
