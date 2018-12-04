import {GeoDocRecord} from '../model/records/gdoc-record';
import {GeoDocSearchForm} from '../model/forms/gdoc-searchform';
import {GeoDocSearchResult} from '../model/container/gdoc-searchresult';
import {GenericSearchHttpAdapter} from '@dps/mycms-commons/dist/search-commons/services/generic-search-http.adapter';
import {Mapper, Record} from 'js-data';
import {GeoDocAdapterResponseMapper} from './gdoc-adapter-response.mapper';

export class GeoDocHttpAdapter extends GenericSearchHttpAdapter<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult> {
    private responseMapper: GeoDocAdapterResponseMapper;

    constructor(config: any) {
        super(config);
        this.responseMapper = new GeoDocAdapterResponseMapper(config);
    }

    create(mapper: Mapper, record: any, opts?: any): Promise<GeoDocRecord> {
        opts = opts || {};
        opts.endpoint = this.getHttpEndpoint('create');
        if (opts.realSource) {
            record = opts.realSource;
        }

        const props = this.mapRecordToAdapterValues(mapper, record);

        return super.create(mapper, props, opts);
    }

    update(mapper: Mapper, id: string | number, record: any, opts?: any): Promise<GeoDocRecord> {
        opts = opts || {};
        opts.endpoint = this.getHttpEndpoint('update');
        if (opts.realSource) {
            record = opts.realSource;
        }
        const props = this.mapRecordToAdapterValues(mapper, record);

        return super.update(mapper, id, props, opts);
    }

    getHttpEndpoint(method: string, format?: string): string {
        const findMethods = ['find', 'findAll'];
        const updateMethods = ['create', 'destroy', 'update'];
        if (findMethods.indexOf(method.toLowerCase()) >= 0) {
            return 'gdoc';
        }
        if (updateMethods.indexOf(method.toLowerCase()) >= 0) {
            return 'gdocwrite';
        }
        if (method.toLowerCase() === 'doactiontag') {
            return 'gdocaction';
        }
        if (method.toLowerCase() === 'export') {
            return 'gdocexport/' + format;
        }

        return 'gdocsearch';
    }

    private mapRecordToAdapterValues(mapper: Mapper, values: any): {} {
        let record = values;
        if (!(record instanceof GeoDocRecord)) {
            record = this.responseMapper.mapValuesToRecord(mapper, values);
        }

        return this.responseMapper.mapToAdapterDocument({}, record);
    }
}

