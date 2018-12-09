import {StarDocRecord} from '../model/records/sdoc-record';
import {StarDocSearchResult} from '../model/container/sdoc-searchresult';
import {StarDocSearchForm, StarDocSearchFormFactory} from '../model/forms/sdoc-searchform';
import {StarDocDataStore} from './sdoc-data.store';
import {CommonDocSearchService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-search.service';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';

export class StarDocSearchService extends CommonDocSearchService<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {
    constructor(dataStore: StarDocDataStore) {
        super(dataStore, 'sdoc');
    }

    createDefaultSearchForm(): StarDocSearchForm {
        return new StarDocSearchForm({ pageNum: 1, perPage: 10});
    }

    public getBaseMapperName(): string {
        return 'sdoc';
    }

    public isRecordInstanceOf(record: any): boolean {
        return record instanceof StarDocRecord;
    }

    public createRecord(props, opts): StarDocRecord {
        return <StarDocRecord>this.dataStore.createRecord(this.getBaseMapperName(), props, opts);
    }

    public newRecord(values: {}): StarDocRecord {
        return new StarDocRecord(values);
    }

    public newSearchForm(values: {}): StarDocSearchForm {
        return new StarDocSearchForm(values);
    }

    public newSearchResult(sdocSearchForm: StarDocSearchForm, recordCount: number,
                           currentRecords: StarDocRecord[], facets: Facets): StarDocSearchResult {
        return new StarDocSearchResult(sdocSearchForm, recordCount, currentRecords, facets);
    }

    public cloneSanitizedSearchForm(src: StarDocSearchForm): StarDocSearchForm {
        return StarDocSearchFormFactory.cloneSanitized(src);
    }

    public createSanitizedSearchForm(values: {}): StarDocSearchForm {
        return StarDocSearchFormFactory.createSanitized(values);
    }
}
