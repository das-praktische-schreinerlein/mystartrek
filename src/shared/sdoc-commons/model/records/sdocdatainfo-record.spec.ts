import {StarDocDataInfoRecord} from './sdocdatainfo-record';

describe('StarDocDataInfoRecord', () => {
    it('should create an instance', () => {
        expect(new StarDocDataInfoRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocDataInfoRecord({
            guides: 'Dolomiten'
        });
        expect(sdoc.guides).toEqual('Dolomiten');
    });
});
