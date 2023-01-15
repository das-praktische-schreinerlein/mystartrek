import {Injectable} from '@angular/core';
import {StarDocSearchForm} from '../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../shared/sdoc-commons/model/container/sdoc-searchresult';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {StarDocRecord} from '../shared/sdoc-commons/model/records/sdoc-record';

@Injectable()
export class StarDocDataServiceStub {
    static defaultSearchResult(): StarDocSearchResult {
        return new StarDocSearchResult(
            new StarDocSearchForm({}), 1, [ new StarDocRecord({id: '1', name: 'Test'})], new Facets());
    }

    static defaultRecord(): StarDocRecord {
        return new StarDocRecord({id: '1', name: 'Test'});
    }

    cloneSanitizedSearchForm(values: StarDocSearchForm): StarDocSearchForm {
        return new StarDocSearchForm(values);
    }

    newSearchForm(values: {}): StarDocSearchForm {
        return new StarDocSearchForm(values);
    }

    search(searchForm: StarDocSearchForm): Promise<StarDocSearchResult> {
        return Promise.resolve(new StarDocSearchResult(searchForm, 0, [], new Facets()));
    };

    newSearchResult(sdocSearchForm: StarDocSearchForm, recordCount: number,
                    currentRecords: StarDocRecord[], facets: Facets): StarDocSearchResult {
        return new StarDocSearchResult(sdocSearchForm, recordCount, currentRecords, facets);
    }
}
