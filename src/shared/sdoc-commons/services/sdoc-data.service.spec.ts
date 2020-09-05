/* tslint:disable:no-unused-variable */
import {forkJoin, from} from 'rxjs';
import {StarDocRecord} from '../model/records/sdoc-record';
import {StarDocDataService} from './sdoc-data.service';
import {StarDocDataStore, StarDocTeamFilterConfig} from './sdoc-data.store';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';

describe('StarDocDataService', () => {
    let sdoc1: StarDocRecord = undefined;
    let sdoc2: StarDocRecord = undefined;
    let service: StarDocDataService;

    beforeEach(() => {
        const datastore = new StarDocDataStore(new SearchParameterUtils(), new StarDocTeamFilterConfig());
        service = new StarDocDataService(datastore);
        service.setWritable(true);
        sdoc1 = new StarDocRecord({desc: '', name: 'Testsdoc1', persons: '', id: '1', type: 'image', subtype: '5'});
        sdoc2 = new StarDocRecord({desc: '', name: 'Testsdoc2', persons: '', id: '2', type: 'image', subtype: '5'});
    });

    it('should ...', done => {
        // WHEN/THEN
        expect(service).toBeTruthy();
        done();
    });

    describe('#getAll()', () => {
        it('should return an empty array by default', done => {
            // WHEN
            from(service.getAll()).subscribe(
                sdocs => {
                    // THEN
                    expect(sdocs).toEqual([]);
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should return all sdocs', done => {
            // GIVEN
            forkJoin(
                service.addMany([sdoc1, sdoc2]),
                service.getAll()
            ).subscribe(
                results => {
                    // THEN: add StarDocs
                    expect(results[0].toString()).toEqual([sdoc1, sdoc2].toString());
                    // THEN: get StarDocs
                    expect(results[1].toString()).toEqual([sdoc1, sdoc2].toString());
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });
    });
    describe('#save(record)', () => {

        it('should automatically assign an incrementing id', done => {
            // GIVEN
            forkJoin(
                service.addMany([sdoc1, sdoc2]),
                service.getById('1'),
                service.getById('2')
            ).subscribe(
                results => {
                    // THEN: add StarDocs
                    expect(results[0].toString()).toEqual([sdoc1, sdoc2].toString());
                    // THEN: get StarDocs
                    expect(results[1].toString()).toEqual(sdoc1.toString());
                    expect(results[2].toString()).toEqual(sdoc2.toString());
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });

    });

    describe('#deleteById(id)', () => {

        it('should remove record with the corresponding id', done => {
            forkJoin(
                service.addMany([sdoc1, sdoc2]),
                service.getAll(),
                service.deleteById('1'),
                service.getAll(),
                service.deleteById('2'),
                service.getAll()
            ).subscribe(
                results => {
                    // THEN: add StarDocs
                    expect(results[0].toString()).toEqual([sdoc1, sdoc2].toString());
                    expect(results[1].toString()).toEqual([sdoc1, sdoc2].toString());
                    // THEN: get StarDocs
                    expect(results[2]).toEqual(sdoc1);
                    expect(results[3].toString()).toEqual([sdoc2].toString());
                    expect(results[4]).toEqual(sdoc2);
                    expect(results[5].toString()).toEqual([].toString());
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should not removing anything if record with corresponding id is not found', done => {
            forkJoin(
                service.addMany([sdoc1, sdoc2]),
                service.getAll(),
                service.deleteById('3'),
                service.getAll()
            ).subscribe(
                results => {
                    // THEN: add StarDocs
                    expect(results[0].toString()).toEqual([sdoc1, sdoc2].toString());
                    expect(results[1].toString()).toEqual([sdoc1, sdoc2].toString());
                    // THEN: get StarDocs
                    expect(results[2]).toEqual(undefined);
                    expect(results[3].toString()).toEqual([sdoc1, sdoc2].toString());
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });

    });
    describe('#updateById(id, values)', () => {

        it('should return record with the corresponding id and updated data', done => {
            forkJoin(
                service.addMany([sdoc1, sdoc2]),
                service.getAll(),
                service.updateById('1', {
                    id: '1', name: 'new name', type: 'image', subtype: '5'
                }),
                service.getById('1')
            ).subscribe(
                results => {
                    // THEN: add StarDocs
                    expect(results[0].toString()).toEqual([sdoc1, sdoc2].toString());
                    expect(results[1].toString()).toEqual([sdoc1, sdoc2].toString());
                    // THEN: get StarDocs
                    expect(results[2].name).toEqual('new name');
                    expect(results[3].name).toEqual('new name');
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });

        it('should return null if record is not found', done => {
            forkJoin(
                service.addMany([sdoc1, sdoc2]),
                service.getAll(),
                service.updateById('26', {
                    id: '26', name: 'new name', type: 'image', subtype: '5'
                }),
                service.getById('26')
            ).subscribe(
                results => {
                    // THEN: add StarDocs
                    expect(results[0].toString()).toEqual([sdoc1, sdoc2].toString());
                    expect(results[1].toString()).toEqual([sdoc1, sdoc2].toString());
                    // THEN: get StarDocs
                    expect(results[2]).toEqual(null);
                    expect(results[3]).toEqual(undefined);
                    done();
                },
                error => {
                    expect(error).toBeUndefined();
                    done();
                },
                () => {
                    done();
                }
            );
        });
    });
});
