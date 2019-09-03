import {StarDocDataTechRecord} from './sdocdatatech-record';

describe('StarDocDataTechRecord', () => {
    it('should create an instance', () => {
        expect(new StarDocDataTechRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocDataTechRecord({
            dur: 5.0
        });
        expect(sdoc.dur).toEqual(5.0);
    });
});
