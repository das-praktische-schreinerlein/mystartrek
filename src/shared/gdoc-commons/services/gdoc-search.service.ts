import {GeoDocRecord} from '../model/records/gdoc-record';
import {GeoDocSearchResult} from '../model/container/gdoc-searchresult';
import {GeoDocSearchForm, GeoDocSearchFormFactory} from '../model/forms/gdoc-searchform';
import {GeoDocDataStore} from './gdoc-data.store';
import {CommonDocSearchService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-search.service';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';

export class GeoDocSearchService extends CommonDocSearchService<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult> {
    constructor(dataStore: GeoDocDataStore) {
        super(dataStore, 'gdoc');
    }

    createDefaultSearchForm(): GeoDocSearchForm {
        return new GeoDocSearchForm({ pageNum: 1, perPage: 10});
    }

    public getBaseMapperName(): string {
        return 'gdoc';
    }

    public isRecordInstanceOf(record: any): boolean {
        return record instanceof GeoDocRecord;
    }

    public createRecord(props, opts): GeoDocRecord {
        return <GeoDocRecord>this.dataStore.createRecord(this.getBaseMapperName(), props, opts);
    }

    public newRecord(values: {}): GeoDocRecord {
        return new GeoDocRecord(values);
    }

    public newSearchForm(values: {}): GeoDocSearchForm {
        return new GeoDocSearchForm(values);
    }

    public newSearchResult(gdocSearchForm: GeoDocSearchForm, recordCount: number,
                           currentRecords: GeoDocRecord[], facets: Facets): GeoDocSearchResult {
        return new GeoDocSearchResult(gdocSearchForm, recordCount, currentRecords, facets);
    }

    public cloneSanitizedSearchForm(src: GeoDocSearchForm): GeoDocSearchForm {
        return GeoDocSearchFormFactory.cloneSanitized(src);
    }

    public createSanitizedSearchForm(values: {}): GeoDocSearchForm {
        return GeoDocSearchFormFactory.createSanitized(values);
    }
}
