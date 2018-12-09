import {StarDocDataTechRecord} from './sdocdatatech-record';

describe('StarDocDataTechRecord', () => {
    it('should create an instance', () => {
        expect(new StarDocDataTechRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocDataTechRecord({
            dist: 5.0
        });
        expect(sdoc.dist).toEqual(5.0);
    });
});
