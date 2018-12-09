import {StarDocRecord} from '../model/records/sdoc-record';
import {StarDocSearchForm} from '../model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../model/container/sdoc-searchresult';
import {GenericSearchHttpAdapter} from '@dps/mycms-commons/dist/search-commons/services/generic-search-http.adapter';
import {Mapper, Record} from 'js-data';
import {StarDocAdapterResponseMapper} from './sdoc-adapter-response.mapper';

export class StarDocHttpAdapter extends GenericSearchHttpAdapter<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {
    private responseMapper: StarDocAdapterResponseMapper;

    constructor(config: any) {
        super(config);
        this.responseMapper = new StarDocAdapterResponseMapper(config);
    }

    create(mapper: Mapper, record: any, opts?: any): Promise<StarDocRecord> {
        opts = opts || {};
        opts.endpoint = this.getHttpEndpoint('create');
        if (opts.realSource) {
            record = opts.realSource;
        }

        const props = this.mapRecordToAdapterValues(mapper, record);

        return super.create(mapper, props, opts);
    }

    update(mapper: Mapper, id: string | number, record: any, opts?: any): Promise<StarDocRecord> {
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
            return 'sdoc';
        }
        if (updateMethods.indexOf(method.toLowerCase()) >= 0) {
            return 'sdocwrite';
        }
        if (method.toLowerCase() === 'doactiontag') {
            return 'sdocaction';
        }
        if (method.toLowerCase() === 'export') {
            return 'sdocexport/' + format;
        }

        return 'sdocsearch';
    }

    private mapRecordToAdapterValues(mapper: Mapper, values: any): {} {
        let record = values;
        if (!(record instanceof StarDocRecord)) {
            record = this.responseMapper.mapValuesToRecord(mapper, values);
        }

        return this.responseMapper.mapToAdapterDocument({}, record);
    }
}

