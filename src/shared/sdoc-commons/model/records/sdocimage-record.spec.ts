import {StarDocImageRecord} from './sdocimage-record';

describe('StarDocImageRecord', () => {
    it('should create an instance', () => {
        expect(new StarDocImageRecord()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const sdoc = new StarDocImageRecord({
            name: 'hello',
            fileName: 'img1.jpg'
        });
        expect(sdoc.name).toEqual('hello');
        expect(sdoc.fileName).toEqual('img1.jpg');
    });
});
